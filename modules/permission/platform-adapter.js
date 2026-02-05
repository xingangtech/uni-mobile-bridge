/**
 * 平台适配器
 * 封装不同平台的权限检查和申请逻辑
 */

import { isAndroid, isIOS, isHarmony, isAndroid12Plus, isAndroid13Plus } from './utils/platform.js'
import { PermissionStatus } from './permission-types.js'

/**
 * Android 平台适配器
 */
class AndroidAdapter {
  /**
   * 检查权限状态
   * @param {Object} permission - 权限配置对象
   * @returns {Promise<Object>}
   */
  async checkPermission(permission) {
    try {
      // 先使用 uni API 检查
      const appAuthSetting = uni.getAppAuthorizeSetting()
      const authKey = this._getAuthSettingKey(permission.code)
      
      if (authKey && appAuthSetting[authKey]) {
        const status = appAuthSetting[authKey]
        return this._parseAuthStatus(status)
      }
      
      // 使用 plus.android 检查原生权限
      // #ifdef APP-PLUS
      if (typeof plus !== 'undefined' && plus.android) {
        const hasPermission = plus.android.checkPermission(permission.android)
        if (hasPermission) {
          return {
            authorized: true,
            denied: false,
            deniedForever: false,
            status: PermissionStatus.AUTHORIZED
          }
        }
      }
      // #endif
      
      return {
        authorized: false,
        denied: false,
        deniedForever: false,
        status: PermissionStatus.NOT_DETERMINED
      }
    } catch (e) {
      console.error('Android 检查权限失败:', e)
      return {
        authorized: false,
        denied: false,
        deniedForever: false,
        status: PermissionStatus.NOT_DETERMINED
      }
    }
  }
  
  /**
   * 申请权限
   * @param {Object} permission - 权限配置对象
   * @returns {Promise<Object>}
   */
  async requestPermission(permission) {
    return new Promise((resolve) => {
      // 先尝试使用 uni.authorize
      uni.authorize({
        scope: permission.scope,
        success: () => {
          resolve({
            success: true,
            authorized: true,
            message: '授权成功'
          })
        },
        fail: (err) => {
          // uni.authorize 失败,尝试使用原生方法
          this._requestNativePermission(permission).then(resolve)
        }
      })
    })
  }
  
  /**
   * 使用原生方法申请权限
   * @param {Object} permission - 权限配置对象
   * @returns {Promise<Object>}
   */
  async _requestNativePermission(permission) {
    return new Promise((resolve) => {
      // #ifdef APP-PLUS
      if (typeof plus === 'undefined' || !plus.android) {
        resolve({
          success: false,
          authorized: false,
          message: 'plus.android 不可用'
        })
        return
      }
      
      try {
        const permissions = [permission.android]
        
        // Android 12+ 蓝牙权限特殊处理
        if (permission.code === 'bluetooth' && isAndroid12Plus()) {
          permissions.push(permission.android_connect || 'android.permission.BLUETOOTH_CONNECT')
        }
        
        // Android 13+ 通知权限特殊处理
        if (permission.code === 'notification' && !isAndroid13Plus()) {
          // Android 13 以下不需要申请通知权限
          resolve({
            success: true,
            authorized: true,
            message: '当前系统版本无需申请通知权限'
          })
          return
        }
        
        plus.android.requestPermissions(
          permissions,
          (e) => {
            if (e.granted && e.granted.length > 0) {
              resolve({
                success: true,
                authorized: true,
                message: '授权成功'
              })
            } else if (e.deniedAlways && e.deniedAlways.length > 0) {
              resolve({
                success: false,
                authorized: false,
                deniedForever: true,
                message: '权限被永久拒绝'
              })
            } else {
              resolve({
                success: false,
                authorized: false,
                message: '用户拒绝授权'
              })
            }
          },
          (err) => {
            console.error('申请权限失败:', err)
            resolve({
              success: false,
              authorized: false,
              message: '申请权限失败'
            })
          }
        )
      } catch (e) {
        console.error('申请原生权限异常:', e)
        resolve({
          success: false,
          authorized: false,
          message: '申请权限异常'
        })
      }
      // #endif
      
      // #ifndef APP-PLUS
      resolve({
        success: false,
        authorized: false,
        message: '当前环境不支持'
      })
      // #endif
    })
  }
  
  /**
   * 获取授权设置的键名
   * @param {String} code - 权限代码
   * @returns {String}
   */
  _getAuthSettingKey(code) {
    const keyMap = {
      'camera': 'cameraAuthorized',
      'location': 'locationAuthorized',
      'microphone': 'microphoneAuthorized',
      'photoAlbum': 'albumAuthorized',
      'notification': 'notificationAuthorized',
      'bluetooth': 'bluetoothAuthorized'
    }
    return keyMap[code] || null
  }
  
  /**
   * 解析授权状态
   * @param {String} status - 授权状态字符串
   * @returns {Object}
   */
  _parseAuthStatus(status) {
    if (status === 'authorized') {
      return {
        authorized: true,
        denied: false,
        deniedForever: false,
        status: PermissionStatus.AUTHORIZED
      }
    } else if (status === 'denied') {
      return {
        authorized: false,
        denied: true,
        deniedForever: true,
        status: PermissionStatus.DENIED
      }
    } else {
      return {
        authorized: false,
        denied: false,
        deniedForever: false,
        status: PermissionStatus.NOT_DETERMINED
      }
    }
  }
}

/**
 * iOS 平台适配器
 */
class IOSAdapter {
  /**
   * 检查权限状态
   * @param {Object} permission - 权限配置对象
   * @returns {Promise<Object>}
   */
  async checkPermission(permission) {
    try {
      const appAuthSetting = uni.getAppAuthorizeSetting()
      const authKey = this._getAuthSettingKey(permission.code)
      
      if (authKey && appAuthSetting[authKey]) {
        const status = appAuthSetting[authKey]
        return this._parseAuthStatus(status)
      }
      
      return {
        authorized: false,
        denied: false,
        deniedForever: false,
        status: PermissionStatus.NOT_DETERMINED
      }
    } catch (e) {
      console.error('iOS 检查权限失败:', e)
      return {
        authorized: false,
        denied: false,
        deniedForever: false,
        status: PermissionStatus.NOT_DETERMINED
      }
    }
  }
  
  /**
   * 申请权限
   * @param {Object} permission - 权限配置对象
   * @returns {Promise<Object>}
   */
  async requestPermission(permission) {
    return new Promise((resolve) => {
      uni.authorize({
        scope: permission.scope,
        success: () => {
          resolve({
            success: true,
            authorized: true,
            message: '授权成功'
          })
        },
        fail: (err) => {
          console.error('iOS 申请权限失败:', err)
          resolve({
            success: false,
            authorized: false,
            message: err.errMsg || '用户拒绝授权'
          })
        }
      })
    })
  }
  
  /**
   * 获取授权设置的键名
   * @param {String} code - 权限代码
   * @returns {String}
   */
  _getAuthSettingKey(code) {
    const keyMap = {
      'camera': 'cameraAuthorized',
      'location': 'locationAuthorized',
      'microphone': 'microphoneAuthorized',
      'photoAlbum': 'albumAuthorized',
      'notification': 'notificationAuthorized',
      'bluetooth': 'bluetoothAuthorized'
    }
    return keyMap[code] || null
  }
  
  /**
   * 解析授权状态
   * @param {String} status - 授权状态字符串
   * @returns {Object}
   */
  _parseAuthStatus(status) {
    if (status === 'authorized') {
      return {
        authorized: true,
        denied: false,
        deniedForever: false,
        status: PermissionStatus.AUTHORIZED
      }
    } else if (status === 'denied') {
      return {
        authorized: false,
        denied: true,
        deniedForever: true,
        status: PermissionStatus.DENIED
      }
    } else if (status === 'restricted') {
      return {
        authorized: false,
        denied: true,
        deniedForever: true,
        status: PermissionStatus.RESTRICTED
      }
    } else {
      return {
        authorized: false,
        denied: false,
        deniedForever: false,
        status: PermissionStatus.NOT_DETERMINED
      }
    }
  }
}

/**
 * 鸿蒙平台适配器
 */
class HarmonyAdapter {
  /**
   * 检查权限状态
   * @param {Object} permission - 权限配置对象
   * @returns {Promise<Object>}
   */
  async checkPermission(permission) {
    try {
      const appAuthSetting = uni.getAppAuthorizeSetting()
      const authKey = this._getAuthSettingKey(permission.code)
      
      if (authKey && appAuthSetting[authKey]) {
        const status = appAuthSetting[authKey]
        return this._parseAuthStatus(status)
      }
      
      return {
        authorized: false,
        denied: false,
        deniedForever: false,
        status: PermissionStatus.NOT_DETERMINED
      }
    } catch (e) {
      console.error('鸿蒙检查权限失败:', e)
      return {
        authorized: false,
        denied: false,
        deniedForever: false,
        status: PermissionStatus.NOT_DETERMINED
      }
    }
  }
  
  /**
   * 申请权限
   * @param {Object} permission - 权限配置对象
   * @returns {Promise<Object>}
   */
  async requestPermission(permission) {
    return new Promise((resolve) => {
      uni.authorize({
        scope: permission.scope,
        success: () => {
          resolve({
            success: true,
            authorized: true,
            message: '授权成功'
          })
        },
        fail: (err) => {
          console.error('鸿蒙申请权限失败:', err)
          resolve({
            success: false,
            authorized: false,
            message: err.errMsg || '用户拒绝授权'
          })
        }
      })
    })
  }
  
  /**
   * 获取授权设置的键名
   * @param {String} code - 权限代码
   * @returns {String}
   */
  _getAuthSettingKey(code) {
    const keyMap = {
      'camera': 'cameraAuthorized',
      'location': 'locationAuthorized',
      'microphone': 'microphoneAuthorized',
      'photoAlbum': 'albumAuthorized',
      'notification': 'notificationAuthorized',
      'bluetooth': 'bluetoothAuthorized'
    }
    return keyMap[code] || null
  }
  
  /**
   * 解析授权状态
   * @param {String} status - 授权状态字符串
   * @returns {Object}
   */
  _parseAuthStatus(status) {
    if (status === 'authorized') {
      return {
        authorized: true,
        denied: false,
        deniedForever: false,
        status: PermissionStatus.AUTHORIZED
      }
    } else if (status === 'denied') {
      return {
        authorized: false,
        denied: true,
        deniedForever: true,
        status: PermissionStatus.DENIED
      }
    } else {
      return {
        authorized: false,
        denied: false,
        deniedForever: false,
        status: PermissionStatus.NOT_DETERMINED
      }
    }
  }
}

/**
 * 获取当前平台的适配器
 * @returns {Object}
 */
export function getPlatformAdapter() {
  if (isAndroid()) {
    return new AndroidAdapter()
  } else if (isIOS()) {
    return new IOSAdapter()
  } else if (isHarmony()) {
    return new HarmonyAdapter()
  } else {
    throw new Error('不支持的平台')
  }
}
