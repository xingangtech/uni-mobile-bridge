/**
 * 健康数据管理器
 * 提供跨平台的健康数据读写功能
 */

import { HealthDataType, DataUnit, TimeRange, UnitConverter } from '../../types/data-types.js'
import { getTimeRangeTimestamps, formatTimestamp } from '../../utils/time-utils.js'
import { cacheManager } from '../../utils/cache-manager.js'
import { getCurrentPlatform } from '../../utils/platform.js'

class HealthManager {
  constructor() {
    this.platform = getCurrentPlatform()
    this.cacheEnabled = true
    this.cacheExpireTime = 5 * 60 * 1000 // 5分钟缓存
  }
  
  /**
   * 读取健康数据
   * @param {string} dataType - 数据类型代码
   * @param {Object} options - 查询选项
   * @returns {Promise<Array>} 数据记录数组
   */
  async read(dataType, options = {}) {
    try {
      // 参数验证
      const typeConfig = this._getDataTypeConfig(dataType)
      if (!typeConfig) {
        throw new Error(`未知的数据类型: ${dataType}`)
      }
      
      // 处理时间范围
      const timeRange = this._processTimeRange(options)
      
      // 检查缓存
      if (options.useCache !== false && this.cacheEnabled) {
        const cacheKey = `health_${dataType}_${timeRange.startTime}_${timeRange.endTime}`
        const cached = cacheManager.get(cacheKey)
        if (cached) {
          console.log(`[HealthManager] 使用缓存数据: ${dataType}`)
          return cached
        }
      }
      
      // 根据平台调用不同的实现
      let records = []
      
      // #ifdef APP-PLUS
      if (this.platform === 'ios') {
        records = await this._readFromHealthKit(typeConfig, timeRange, options)
      } else if (this.platform === 'android') {
        records = await this._readFromHealthConnect(typeConfig, timeRange, options)
      } else if (this.platform === 'harmony') {
        records = await this._readFromHealthService(typeConfig, timeRange, options)
      }
      // #endif
      
      // 数据处理
      records = this._processRecords(records, typeConfig, options)
      
      // 缓存数据
      if (options.useCache !== false && this.cacheEnabled) {
        const cacheKey = `health_${dataType}_${timeRange.startTime}_${timeRange.endTime}`
        cacheManager.set(cacheKey, records, this.cacheExpireTime)
      }
      
      return records
      
    } catch (error) {
      console.error(`[HealthManager] 读取健康数据失败:`, error)
      throw error
    }
  }
  
  /**
   * 写入健康数据
   * @param {string} dataType - 数据类型代码
   * @param {number|Object} value - 数据值
   * @param {Object} options - 写入选项
   * @returns {Promise<Object>} 操作结果
   */
  async write(dataType, value, options = {}) {
    try {
      // 参数验证
      const typeConfig = this._getDataTypeConfig(dataType)
      if (!typeConfig) {
        throw new Error(`未知的数据类型: ${dataType}`)
      }
      
      // 数据验证
      this._validateValue(value, typeConfig)
      
      // 处理时间戳
      const timestamp = options.timestamp || Date.now()
      
      // 根据平台调用不同的实现
      let result = {}
      
      // #ifdef APP-PLUS
      if (this.platform === 'ios') {
        result = await this._writeToHealthKit(typeConfig, value, timestamp, options)
      } else if (this.platform === 'android') {
        result = await this._writeToHealthConnect(typeConfig, value, timestamp, options)
      } else if (this.platform === 'harmony') {
        result = await this._writeToHealthService(typeConfig, value, timestamp, options)
      }
      // #endif
      
      // 清除相关缓存
      this._clearRelatedCache(dataType, timestamp)
      
      return {
        success: true,
        data: result,
        message: '写入成功'
      }
      
    } catch (error) {
      console.error(`[HealthManager] 写入健康数据失败:`, error)
      return {
        success: false,
        error: {
          code: error.code || 'WRITE_ERROR',
          message: error.message
        },
        message: '写入失败'
      }
    }
  }
  
  /**
   * 删除健康数据
   * @param {string} dataType - 数据类型代码
   * @param {string} recordId - 记录ID
   * @returns {Promise<Object>} 操作结果
   */
  async delete(dataType, recordId) {
    try {
      const typeConfig = this._getDataTypeConfig(dataType)
      if (!typeConfig) {
        throw new Error(`未知的数据类型: ${dataType}`)
      }
      
      // #ifdef APP-PLUS
      if (this.platform === 'ios') {
        await this._deleteFromHealthKit(recordId)
      } else if (this.platform === 'android') {
        await this._deleteFromHealthConnect(recordId)
      } else if (this.platform === 'harmony') {
        await this._deleteFromHealthService(recordId)
      }
      // #endif
      
      // 清除缓存
      this._clearAllCache(dataType)
      
      return {
        success: true,
        message: '删除成功'
      }
      
    } catch (error) {
      console.error(`[HealthManager] 删除健康数据失败:`, error)
      return {
        success: false,
        error: {
          code: error.code || 'DELETE_ERROR',
          message: error.message
        },
        message: '删除失败'
      }
    }
  }
  
  /**
   * 获取统计数据
   * @param {Object} options - 统计选项
   * @returns {Promise<Object>} 统计结果
   */
  async getStatistics(options = {}) {
    try {
      const { dataType, startTime, endTime, interval = 'day', aggregation = 'sum' } = options
      
      // 读取原始数据
      const records = await this.read(dataType, { startTime, endTime, useCache: false })
      
      // 计算统计数据
      const stats = this._calculateStatistics(records, interval, aggregation)
      
      return {
        dataType,
        startTime,
        endTime,
        interval,
        aggregation,
        ...stats
      }
      
    } catch (error) {
      console.error(`[HealthManager] 获取统计数据失败:`, error)
      throw error
    }
  }
  
  /**
   * 批量读取多种健康数据
   * @param {Array<string>} dataTypes - 数据类型数组
   * @param {Object} options - 查询选项
   * @returns {Promise<Object>} 数据对象
   */
  async readMultiple(dataTypes, options = {}) {
    try {
      const results = {}
      
      for (const dataType of dataTypes) {
        try {
          results[dataType] = await this.read(dataType, options)
        } catch (error) {
          console.error(`[HealthManager] 读取 ${dataType} 失败:`, error)
          results[dataType] = []
        }
      }
      
      return results
      
    } catch (error) {
      console.error(`[HealthManager] 批量读取失败:`, error)
      throw error
    }
  }
  
  // ==================== iOS HealthKit 实现 ====================
  
  /**
   * 从 HealthKit 读取数据
   */
  async _readFromHealthKit(typeConfig, timeRange, options) {
    // #ifdef APP-PLUS
    return new Promise((resolve, reject) => {
      // 使用 plus.ios 调用原生 API
      const HKHealthStore = plus.ios.importClass('HKHealthStore')
      const HKQuantityType = plus.ios.importClass('HKQuantityType')
      const HKUnit = plus.ios.importClass('HKUnit')
      const HKQuery = plus.ios.importClass('HKSampleQuery')
      const NSPredicate = plus.ios.importClass('NSPredicate')
      const NSDate = plus.ios.importClass('NSDate')
      
      const healthStore = new HKHealthStore()
      const quantityType = HKQuantityType.quantityTypeForIdentifier(typeConfig.ios)
      
      if (!quantityType) {
        reject(new Error('不支持的数据类型'))
        return
      }
      
      // 创建时间谓词
      const startDate = NSDate.dateWithTimeIntervalSince1970(timeRange.startTime / 1000)
      const endDate = NSDate.dateWithTimeIntervalSince1970(timeRange.endTime / 1000)
      const predicate = HKQuery.predicateForSamplesWithStartDateendDateoptions(startDate, endDate, 0)
      
      // 创建查询
      const query = HKQuery.alloc().initWithSampleTypepredicatelimitsortDescriptorsresultsHandler(
        quantityType,
        predicate,
        options.limit || 0,
        null,
        (query, results, error) => {
          if (error) {
            reject(new Error('查询失败'))
            return
          }
          
          const records = []
          if (results) {
            const count = results.count()
            for (let i = 0; i < count; i++) {
              const sample = results.objectAtIndex(i)
              const unit = this._getHealthKitUnit(typeConfig.unit)
              const value = sample.quantity().doubleValueForUnit(unit)
              const startTime = sample.startDate().timeIntervalSince1970() * 1000
              const endTime = sample.endDate().timeIntervalSince1970() * 1000
              
              records.push({
                id: sample.UUID().UUIDString(),
                dataType: typeConfig.code,
                value: value,
                unit: typeConfig.unit,
                startTime: startTime,
                endTime: endTime,
                source: sample.sourceRevision().source().name()
              })
            }
          }
          
          resolve(records)
        }
      )
      
      healthStore.executeQuery(query)
    })
    // #endif
    
    // 非 APP-PLUS 平台返回空数组
    return []
  }
  
  /**
   * 写入数据到 HealthKit
   */
  async _writeToHealthKit(typeConfig, value, timestamp, options) {
    // #ifdef APP-PLUS
    return new Promise((resolve, reject) => {
      const HKHealthStore = plus.ios.importClass('HKHealthStore')
      const HKQuantityType = plus.ios.importClass('HKQuantityType')
      const HKQuantity = plus.ios.importClass('HKQuantity')
      const HKQuantitySample = plus.ios.importClass('HKQuantitySample')
      const HKUnit = plus.ios.importClass('HKUnit')
      const NSDate = plus.ios.importClass('NSDate')
      
      const healthStore = new HKHealthStore()
      const quantityType = HKQuantityType.quantityTypeForIdentifier(typeConfig.ios)
      const unit = this._getHealthKitUnit(typeConfig.unit)
      const quantity = HKQuantity.quantityWithUnitdoubleValue(unit, value)
      const date = NSDate.dateWithTimeIntervalSince1970(timestamp / 1000)
      
      const sample = HKQuantitySample.quantitySampleWithTypequantitystartDateendDate(
        quantityType,
        quantity,
        date,
        date
      )
      
      healthStore.saveObjectwithCompletion(sample, (success, error) => {
        if (error) {
          reject(new Error('保存失败'))
        } else {
          resolve({ id: sample.UUID().UUIDString() })
        }
      })
    })
    // #endif
    
    return {}
  }
  
  /**
   * 从 HealthKit 删除数据
   */
  async _deleteFromHealthKit(recordId) {
    // #ifdef APP-PLUS
    return new Promise((resolve, reject) => {
      const HKHealthStore = plus.ios.importClass('HKHealthStore')
      const NSUUID = plus.ios.importClass('NSUUID')
      
      const healthStore = new HKHealthStore()
      const uuid = NSUUID.alloc().initWithUUIDString(recordId)
      
      // HealthKit 不支持直接通过 UUID 删除,需要先查询再删除
      // 这里简化处理
      resolve()
    })
    // #endif
  }
  
  /**
   * 获取 HealthKit 单位
   */
  _getHealthKitUnit(unitCode) {
    // #ifdef APP-PLUS
    const HKUnit = plus.ios.importClass('HKUnit')
    
    const unitMap = {
      'count': HKUnit.countUnit(),
      'meter': HKUnit.meterUnit(),
      'km': HKUnit.meterUnitWithMetricPrefix(6), // kilo
      'bpm': HKUnit.countUnit().unitDividedByUnit(HKUnit.minuteUnit()),
      'mmHg': HKUnit.millimeterOfMercuryUnit(),
      'percent': HKUnit.percentUnit(),
      'celsius': HKUnit.degreeCelsiusUnit(),
      'cm': HKUnit.meterUnitWithMetricPrefix(2), // centi
      'kg': HKUnit.gramUnitWithMetricPrefix(3), // kilo
      'kcal': HKUnit.kilocalorieUnit(),
      'minute': HKUnit.minuteUnit(),
      'ml': HKUnit.literUnitWithMetricPrefix(-3) // milli
    }
    
    return unitMap[unitCode] || HKUnit.countUnit()
    // #endif
    
    return null
  }
  
  // ==================== Android Health Connect 实现 ====================
  
  /**
   * 从 Health Connect 读取数据
   */
  async _readFromHealthConnect(typeConfig, timeRange, options) {
    // #ifdef APP-PLUS
    // 使用 plus.android 调用原生 API
    // 这里需要通过原生插件实现
    console.log('[HealthManager] Android Health Connect 读取')
    // #endif
    
    return []
  }
  
  /**
   * 写入数据到 Health Connect
   */
  async _writeToHealthConnect(typeConfig, value, timestamp, options) {
    // #ifdef APP-PLUS
    console.log('[HealthManager] Android Health Connect 写入')
    // #endif
    
    return {}
  }
  
  /**
   * 从 Health Connect 删除数据
   */
  async _deleteFromHealthConnect(recordId) {
    // #ifdef APP-PLUS
    console.log('[HealthManager] Android Health Connect 删除')
    // #endif
  }
  
  // ==================== 鸿蒙 Health Service 实现 ====================
  
  /**
   * 从 Health Service 读取数据
   */
  async _readFromHealthService(typeConfig, timeRange, options) {
    // #ifdef APP-PLUS
    console.log('[HealthManager] 鸿蒙 Health Service 读取')
    // #endif
    
    return []
  }
  
  /**
   * 写入数据到 Health Service
   */
  async _writeToHealthService(typeConfig, value, timestamp, options) {
    // #ifdef APP-PLUS
    console.log('[HealthManager] 鸿蒙 Health Service 写入')
    // #endif
    
    return {}
  }
  
  /**
   * 从 Health Service 删除数据
   */
  async _deleteFromHealthService(recordId) {
    // #ifdef APP-PLUS
    console.log('[HealthManager] 鸿蒙 Health Service 删除')
    // #endif
  }
  
  // ==================== 辅助方法 ====================
  
  /**
   * 获取数据类型配置
   */
  _getDataTypeConfig(dataType) {
    for (const key in HealthDataType) {
      if (HealthDataType[key].code === dataType) {
        return HealthDataType[key]
      }
    }
    return null
  }
  
  /**
   * 处理时间范围
   */
  _processTimeRange(options) {
    if (options.timeRange) {
      return getTimeRangeTimestamps(options.timeRange)
    }
    
    return {
      startTime: options.startTime || Date.now() - 24 * 60 * 60 * 1000,
      endTime: options.endTime || Date.now()
    }
  }
  
  /**
   * 验证数据值
   */
  _validateValue(value, typeConfig) {
    if (typeof value !== 'number' && typeof value !== 'object') {
      throw new Error('数据值类型错误')
    }
    
    // 可以添加更多验证逻辑
    if (typeof value === 'number') {
      if (value < 0) {
        throw new Error('数据值不能为负数')
      }
    }
  }
  
  /**
   * 处理记录数据
   */
  _processRecords(records, typeConfig, options) {
    // 排序
    if (options.ascending) {
      records.sort((a, b) => a.startTime - b.startTime)
    } else {
      records.sort((a, b) => b.startTime - a.startTime)
    }
    
    // 限制数量
    if (options.limit && records.length > options.limit) {
      records = records.slice(0, options.limit)
    }
    
    // 单位转换
    if (options.unit && options.unit !== typeConfig.unit) {
      records = records.map(record => ({
        ...record,
        value: this._convertUnit(record.value, typeConfig.unit, options.unit),
        unit: options.unit
      }))
    }
    
    return records
  }
  
  /**
   * 单位转换
   */
  _convertUnit(value, fromUnit, toUnit) {
    const converterKey = `${fromUnit}To${toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}`
    const converter = UnitConverter[converterKey]
    
    if (converter) {
      return converter(value)
    }
    
    return value
  }
  
  /**
   * 计算统计数据
   */
  _calculateStatistics(records, interval, aggregation) {
    if (records.length === 0) {
      return {
        total: 0,
        average: 0,
        min: 0,
        max: 0,
        count: 0,
        data: []
      }
    }
    
    const values = records.map(r => r.value)
    const total = values.reduce((sum, val) => sum + val, 0)
    const average = total / values.length
    const min = Math.min(...values)
    const max = Math.max(...values)
    
    return {
      total,
      average,
      min,
      max,
      count: records.length,
      data: records
    }
  }
  
  /**
   * 清除相关缓存
   */
  _clearRelatedCache(dataType, timestamp) {
    const keys = cacheManager.getAllKeys()
    keys.forEach(key => {
      if (key.startsWith(`health_${dataType}_`)) {
        cacheManager.remove(key)
      }
    })
  }
  
  /**
   * 清除所有缓存
   */
  _clearAllCache(dataType) {
    const keys = cacheManager.getAllKeys()
    keys.forEach(key => {
      if (key.startsWith(`health_${dataType}_`)) {
        cacheManager.remove(key)
      }
    })
  }
}

// 导出单例
export default new HealthManager()
