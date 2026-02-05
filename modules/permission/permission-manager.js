/**
 * 权限管理器核心类
 */

import { getPermissionByCode, PermissionError } from './permission-types.js'
import { getPlatformAdapter } from './platform-adapter.js'
import { 
  savePermissionStatus, 
  getPermissionStatus, 
  removePermissionStatus,
  clearAllPermissionStatus,
  savePermissionRecord
} from './utils/storage.js'

class PermissionManager {
  constructor() {
    this.adapter = null
    this.dialogComponent = null
    this._initAdapter()
  }
  
  /**
   * 初始化平台适配器
   */
  _initAdapter() {
    try {
      this.adapter = getPlatformAdapter()
    } catch (e) {
      console.error('初始化平台适配器失败:', e)
    }
  }
  
  /**
   * 检查权限状态
   * @param {String} permissionCode - 权限代码
   * @param {Boolean} useCache - 是否使用缓存 (默认 true)
   * @returns {Promise<Object>}
   */
  async checkPermission(permissionCode, useCache = true) {
    try {
      // 获取权限配置
      const permission = getPermissionByCode(permissionCode)
      if (!permission) {
        throw new Error(`未知的权限类型: ${permissionCode}`)
      }
      
      // 尝试从缓存获取
      if (useCache) {
        const cachedStatus = getPermissionStatus(permissionCode)
        if (cachedStatus) {
          return cachedStatus
        }
      }
      
      // 检查权限
      if (!this.adapter) {
        throw new Error('平台适配器未初始化')
      }
      
      const status = await this.adapter.checkPermission(permission)
      
      // 保存到缓存
      savePermissionStatus(permissionCode, status)
      
      return status
    } catch (e) {
      console.error('检查权限失败:', e)
      return {
        authorized: false,
        denied: false,
        deniedForever: false,
        status: 'not_determined',
        error: e.message
      }
    }
  }
  
  /**
   * 申请权限
   * @param {String} permissionCode - 权限代码
   * @param {Object} options - 配置选项
   * @returns {Promise<Object>}
   */
  async requestPermission(permissionCode, options = {}) {
    const defaultOptions = {
      showGuide: true,
      guideTitle: '',
      guideContent: '',
      autoOpenSetting: false
    }
    
    const opts = { ...defaultOptions, ...options }
    
    try {
      // 获取权限配置
      const permission = getPermissionByCode(permissionCode)
      if (!permission) {
        throw new Error(`未知的权限类型: ${permissionCode}`)
      }
      
      // 先检查权限状态
      const status = await this.checkPermission(permissionCode, false)
      
      // 如果已授权,直接返回
      if (status.authorized) {
        return {
          success: true,
          authorized: true,
          message: '权限已授权'
        }
      }
      
      // 如果被永久拒绝,显示引导或直接打开设置
      if (status.deniedForever) {
        if (opts.showGuide) {
          const confirmed = await this.showPermissionGuide(permissionCode, {
            title: opts.guideTitle || `需要${permission.name}权限`,
            content: opts.guideContent || `请在系统设置中开启${permission.name}权限`
          })
          
          if (confirmed) {
            await this.openSystemSetting()
          }
        } else if (opts.autoOpenSetting) {
          await this.openSystemSetting()
        }
        
        return {
          success: false,
          authorized: false,
          deniedForever: true,
          message: '权限被永久拒绝,需要在系统设置中开启'
        }
      }
      
      // 申请权限
      if (!this.adapter) {
        throw new Error('平台适配器未初始化')
      }
      
      const result = await this.adapter.requestPermission(permission)
      
      // 更新缓存
      if (result.authorized) {
        savePermissionStatus(permissionCode, {
          authorized: true,
          denied: false,
          deniedForever: false,
          status: 'authorized'
        })
      } else {
        removePermissionStatus(permissionCode)
      }
      
      // 保存申请记录
      savePermissionRecord(permissionCode, result.authorized)
      
      return result
    } catch (e) {
      console.error('申请权限失败:', e)
      return {
        success: false,
        authorized: false,
        message: e.message || '申请权限失败'
      }
    }
  }
  
  /**
   * 批量申请权限
   * @param {Array<String>} permissionCodes - 权限代码数组
   * @param {Object} options - 配置选项
   * @returns {Promise<Object>}
   */
  async requestPermissions(permissionCodes, options = {}) {
    try {
      const results = {}
      const granted = []
      const denied = []
      
      for (const code of permissionCodes) {
        const result = await this.requestPermission(code, options)
        results[code] = result
        
        if (result.authorized) {
          granted.push(code)
        } else {
          denied.push(code)
        }
      }
      
      return {
        allGranted: denied.length === 0,
        granted,
        denied,
        results
      }
    } catch (e) {
      console.error('批量申请权限失败:', e)
      return {
        allGranted: false,
        granted: [],
        denied: permissionCodes,
        results: {},
        error: e.message
      }
    }
  }
  
  /**
   * 打开系统设置页面
   * @returns {Promise<Boolean>}
   */
  async openSystemSetting() {
    return new Promise((resolve) => {
      uni.openSetting({
        success: () => {
          resolve(true)
        },
        fail: (err) => {
          console.error('打开系统设置失败:', err)
          resolve(false)
        }
      })
    })
  }
  
  /**
   * 显示权限引导弹窗
   * @param {String} permissionCode - 权限代码
   * @param {Object} options - 配置选项
   * @returns {Promise<Boolean>}
   */
  async showPermissionGuide(permissionCode, options = {}) {
    const permission = getPermissionByCode(permissionCode)
    if (!permission) {
      return false
    }
    
    const defaultOptions = {
      title: `需要${permission.name}权限`,
      content: permission.description || `请在系统设置中开启${permission.name}权限`,
      confirmText: '去设置',
      cancelText: '取消'
    }
    
    const opts = { ...defaultOptions, ...options }
    
    return new Promise((resolve) => {
      uni.showModal({
        title: opts.title,
        content: opts.content,
        confirmText: opts.confirmText,
        cancelText: opts.cancelText,
        success: (res) => {
          resolve(res.confirm)
        },
        fail: () => {
          resolve(false)
        }
      })
    })
  }
  
  /**
   * 获取所有权限状态
   * @returns {Promise<Object>}
   */
  async getAllPermissionStatus() {
    try {
      const appAuthSetting = uni.getAppAuthorizeSetting()
      return appAuthSetting
    } catch (e) {
      console.error('获取所有权限状态失败:', e)
      return {}
    }
  }
  
  /**
   * 清除权限缓存
   */
  clearCache() {
    clearAllPermissionStatus()
  }
  
  /**
   * 设置对话框组件实例
   * @param {Object} component - 对话框组件实例
   */
  setDialogComponent(component) {
    this.dialogComponent = component
  }
}

// 创建单例
const permissionManager = new PermissionManager()

export default permissionManager
