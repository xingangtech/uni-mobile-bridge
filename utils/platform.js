/**
 * 平台判断工具
 */

/**
 * 判断是否为 Android 平台
 * @returns {Boolean}
 */
export function isAndroid() {
  // #ifdef APP-PLUS
  return uni.getSystemInfoSync().platform === 'android'
  // #endif
  
  // #ifndef APP-PLUS
  return false
  // #endif
}

/**
 * 判断是否为 iOS 平台
 * @returns {Boolean}
 */
export function isIOS() {
  // #ifdef APP-PLUS
  return uni.getSystemInfoSync().platform === 'ios'
  // #endif
  
  // #ifndef APP-PLUS
  return false
  // #endif
}

/**
 * 判断是否为鸿蒙平台
 * @returns {Boolean}
 */
export function isHarmony() {
  // #ifdef APP-HARMONY
  return true
  // #endif
  
  // #ifndef APP-HARMONY
  return false
  // #endif
}

/**
 * 获取当前平台名称
 * @returns {String} 'android' | 'ios' | 'harmony' | 'unknown'
 */
export function getPlatform() {
  if (isAndroid()) return 'android'
  if (isIOS()) return 'ios'
  if (isHarmony()) return 'harmony'
  return 'unknown'
}

/**
 * 获取 Android SDK 版本
 * @returns {Number}
 */
export function getAndroidSDKVersion() {
  // #ifdef APP-PLUS
  if (isAndroid()) {
    try {
      const Build = plus.android.importClass('android.os.Build')
      return Build.VERSION.SDK_INT
    } catch (e) {
      console.error('获取 Android SDK 版本失败:', e)
      return 0
    }
  }
  // #endif
  return 0
}

/**
 * 判断是否为 Android 12 及以上版本
 * @returns {Boolean}
 */
export function isAndroid12Plus() {
  return isAndroid() && getAndroidSDKVersion() >= 31
}

/**
 * 判断是否为 Android 13 及以上版本
 * @returns {Boolean}
 */
export function isAndroid13Plus() {
  return isAndroid() && getAndroidSDKVersion() >= 33
}

/**
 * 获取系统版本信息
 * @returns {Object}
 */
export function getSystemInfo() {
  return uni.getSystemInfoSync()
}
