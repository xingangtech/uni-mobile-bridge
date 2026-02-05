/**
 * 缓存管理器
 * 提供数据缓存功能,支持过期时间
 */

class CacheManager {
  constructor() {
    this.cache = new Map()
    this.expireMap = new Map()
    this.storageKey = 'uni_system_bridge_cache'
    
    // 从本地存储加载缓存
    this._loadFromStorage()
    
    // 定时清理过期缓存
    this._startCleanupTimer()
  }
  
  /**
   * 设置缓存
   * @param {string} key - 缓存键
   * @param {*} value - 缓存值
   * @param {number} expireTime - 过期时间 (毫秒), 0 表示永不过期
   */
  set(key, value, expireTime = 0) {
    this.cache.set(key, value)
    
    if (expireTime > 0) {
      this.expireMap.set(key, Date.now() + expireTime)
    } else {
      this.expireMap.delete(key)
    }
    
    this._saveToStorage()
  }
  
  /**
   * 获取缓存
   * @param {string} key - 缓存键
   * @returns {*} 缓存值, 如果不存在或已过期返回 null
   */
  get(key) {
    // 检查是否过期
    if (this._isExpired(key)) {
      this.remove(key)
      return null
    }
    
    return this.cache.get(key) || null
  }
  
  /**
   * 删除缓存
   * @param {string} key - 缓存键
   */
  remove(key) {
    this.cache.delete(key)
    this.expireMap.delete(key)
    this._saveToStorage()
  }
  
  /**
   * 清空所有缓存
   */
  clear() {
    this.cache.clear()
    this.expireMap.clear()
    this._saveToStorage()
  }
  
  /**
   * 检查缓存是否存在
   * @param {string} key - 缓存键
   * @returns {boolean}
   */
  has(key) {
    if (this._isExpired(key)) {
      this.remove(key)
      return false
    }
    
    return this.cache.has(key)
  }
  
  /**
   * 获取所有缓存键
   * @returns {Array<string>}
   */
  getAllKeys() {
    // 清理过期缓存
    this._cleanExpired()
    
    return Array.from(this.cache.keys())
  }
  
  /**
   * 获取缓存大小
   * @returns {number}
   */
  size() {
    this._cleanExpired()
    return this.cache.size
  }
  
  /**
   * 批量设置缓存
   * @param {Object} data - 键值对对象
   * @param {number} expireTime - 过期时间
   */
  setMultiple(data, expireTime = 0) {
    for (const [key, value] of Object.entries(data)) {
      this.set(key, value, expireTime)
    }
  }
  
  /**
   * 批量获取缓存
   * @param {Array<string>} keys - 缓存键数组
   * @returns {Object} 键值对对象
   */
  getMultiple(keys) {
    const result = {}
    
    for (const key of keys) {
      const value = this.get(key)
      if (value !== null) {
        result[key] = value
      }
    }
    
    return result
  }
  
  /**
   * 批量删除缓存
   * @param {Array<string>} keys - 缓存键数组
   */
  removeMultiple(keys) {
    for (const key of keys) {
      this.remove(key)
    }
  }
  
  /**
   * 根据前缀删除缓存
   * @param {string} prefix - 前缀
   */
  removeByPrefix(prefix) {
    const keys = this.getAllKeys()
    const keysToRemove = keys.filter(key => key.startsWith(prefix))
    this.removeMultiple(keysToRemove)
  }
  
  /**
   * 获取缓存统计信息
   * @returns {Object}
   */
  getStats() {
    this._cleanExpired()
    
    const totalSize = this.cache.size
    const expiredCount = Array.from(this.expireMap.values()).filter(time => time < Date.now()).length
    
    return {
      totalSize,
      expiredCount,
      validSize: totalSize - expiredCount
    }
  }
  
  // ==================== 私有方法 ====================
  
  /**
   * 检查缓存是否过期
   * @param {string} key - 缓存键
   * @returns {boolean}
   */
  _isExpired(key) {
    const expireTime = this.expireMap.get(key)
    
    if (!expireTime) {
      return false
    }
    
    return Date.now() > expireTime
  }
  
  /**
   * 清理过期缓存
   */
  _cleanExpired() {
    const now = Date.now()
    const keysToRemove = []
    
    for (const [key, expireTime] of this.expireMap.entries()) {
      if (now > expireTime) {
        keysToRemove.push(key)
      }
    }
    
    for (const key of keysToRemove) {
      this.cache.delete(key)
      this.expireMap.delete(key)
    }
    
    if (keysToRemove.length > 0) {
      this._saveToStorage()
    }
  }
  
  /**
   * 启动清理定时器
   */
  _startCleanupTimer() {
    // 每5分钟清理一次过期缓存
    setInterval(() => {
      this._cleanExpired()
    }, 5 * 60 * 1000)
  }
  
  /**
   * 保存到本地存储
   */
  _saveToStorage() {
    try {
      const data = {
        cache: Array.from(this.cache.entries()),
        expireMap: Array.from(this.expireMap.entries())
      }
      
      uni.setStorageSync(this.storageKey, JSON.stringify(data))
    } catch (error) {
      console.error('[CacheManager] 保存到本地存储失败:', error)
    }
  }
  
  /**
   * 从本地存储加载
   */
  _loadFromStorage() {
    try {
      const dataStr = uni.getStorageSync(this.storageKey)
      
      if (dataStr) {
        const data = JSON.parse(dataStr)
        
        if (data.cache) {
          this.cache = new Map(data.cache)
        }
        
        if (data.expireMap) {
          this.expireMap = new Map(data.expireMap)
        }
        
        // 清理过期数据
        this._cleanExpired()
      }
    } catch (error) {
      console.error('[CacheManager] 从本地存储加载失败:', error)
    }
  }
}

// 导出单例
export const cacheManager = new CacheManager()

export default cacheManager
