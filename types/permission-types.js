/**
 * 系统桥接组件 - 权限类型定义
 * 扩展版权限类型,包含健康、运动、日历等系统权限
 */

/**
 * 权限类型枚举
 */
export const PermissionType = {
  // ========== 基础权限 ==========
  CAMERA: {
    code: 'camera',
    name: '相机',
    scope: 'scope.camera',
    android: 'android.permission.CAMERA',
    ios: 'camera',
    harmony: 'ohos.permission.CAMERA',
    category: 'basic'
  },
  
  LOCATION: {
    code: 'location',
    name: '位置',
    scope: 'scope.userLocation',
    android: 'android.permission.ACCESS_FINE_LOCATION',
    ios: 'location',
    harmony: 'ohos.permission.LOCATION',
    category: 'basic'
  },
  
  MICROPHONE: {
    code: 'microphone',
    name: '麦克风',
    scope: 'scope.record',
    android: 'android.permission.RECORD_AUDIO',
    ios: 'microphone',
    harmony: 'ohos.permission.MICROPHONE',
    category: 'basic'
  },
  
  PHOTO_ALBUM: {
    code: 'photoAlbum',
    name: '相册',
    scope: 'scope.writePhotosAlbum',
    android: 'android.permission.READ_EXTERNAL_STORAGE',
    ios: 'photoLibrary',
    harmony: 'ohos.permission.READ_MEDIA',
    category: 'basic'
  },
  
  CONTACTS: {
    code: 'contacts',
    name: '通讯录',
    scope: 'scope.addPhoneContact',
    android: 'android.permission.READ_CONTACTS',
    ios: 'contacts',
    harmony: 'ohos.permission.READ_CONTACTS',
    category: 'basic'
  },
  
  BLUETOOTH: {
    code: 'bluetooth',
    name: '蓝牙',
    scope: 'scope.bluetooth',
    android: 'android.permission.BLUETOOTH_SCAN',
    ios: 'bluetooth',
    harmony: 'ohos.permission.ACCESS_BLUETOOTH',
    category: 'basic'
  },
  
  NOTIFICATION: {
    code: 'notification',
    name: '通知',
    scope: 'scope.notification',
    android: 'android.permission.POST_NOTIFICATIONS',
    ios: 'notification',
    harmony: 'ohos.permission.NOTIFICATION',
    category: 'basic'
  },
  
  // ========== 日历权限 ==========
  CALENDAR_READ: {
    code: 'calendarRead',
    name: '读取日历',
    scope: 'scope.readPhoneCalendar',
    android: 'android.permission.READ_CALENDAR',
    ios: 'calendar',
    harmony: 'ohos.permission.READ_CALENDAR',
    category: 'calendar'
  },
  
  CALENDAR_WRITE: {
    code: 'calendarWrite',
    name: '写入日历',
    scope: 'scope.addPhoneCalendar',
    android: 'android.permission.WRITE_CALENDAR',
    ios: 'calendar',
    harmony: 'ohos.permission.WRITE_CALENDAR',
    category: 'calendar'
  },
  
  // ========== 健康数据权限 ==========
  HEALTH_READ: {
    code: 'healthRead',
    name: '读取健康数据',
    scope: 'scope.healthRead',
    android: 'android.permission.health.READ_STEPS',
    ios: 'healthShare',
    harmony: 'ohos.permission.HEALTH_DATA',
    category: 'health'
  },
  
  HEALTH_WRITE: {
    code: 'healthWrite',
    name: '写入健康数据',
    scope: 'scope.healthWrite',
    android: 'android.permission.health.WRITE_STEPS',
    ios: 'healthUpdate',
    harmony: 'ohos.permission.HEALTH_DATA',
    category: 'health'
  },
  
  // ========== 运动数据权限 ==========
  ACTIVITY_RECOGNITION: {
    code: 'activityRecognition',
    name: '活动识别',
    scope: 'scope.activityRecognition',
    android: 'android.permission.ACTIVITY_RECOGNITION',
    ios: 'motion',
    harmony: 'ohos.permission.ACTIVITY_MOTION',
    category: 'fitness'
  },
  
  // ========== 传感器权限 ==========
  BODY_SENSORS: {
    code: 'bodySensors',
    name: '身体传感器',
    scope: 'scope.bodySensors',
    android: 'android.permission.BODY_SENSORS',
    ios: 'sensors',
    harmony: 'ohos.permission.READ_HEALTH_DATA',
    category: 'sensors'
  },
  
  // ========== 提醒和闹钟权限 ==========
  SET_ALARM: {
    code: 'setAlarm',
    name: '设置闹钟',
    scope: 'scope.setAlarm',
    android: 'android.permission.SET_ALARM',
    ios: 'notification',
    harmony: 'ohos.permission.PUBLISH_AGENT_REMINDER',
    category: 'reminder'
  },
  
  SCHEDULE_EXACT_ALARM: {
    code: 'scheduleExactAlarm',
    name: '精确闹钟',
    scope: 'scope.scheduleExactAlarm',
    android: 'android.permission.SCHEDULE_EXACT_ALARM',
    ios: 'notification',
    harmony: 'ohos.permission.PUBLISH_AGENT_REMINDER',
    category: 'reminder'
  }
}

/**
 * Android Health Connect 权限映射
 */
export const AndroidHealthPermissions = {
  steps: ['android.permission.health.READ_STEPS', 'android.permission.health.WRITE_STEPS'],
  distance: ['android.permission.health.READ_DISTANCE', 'android.permission.health.WRITE_DISTANCE'],
  heartRate: ['android.permission.health.READ_HEART_RATE', 'android.permission.health.WRITE_HEART_RATE'],
  bloodPressure: ['android.permission.health.READ_BLOOD_PRESSURE', 'android.permission.health.WRITE_BLOOD_PRESSURE'],
  oxygenSaturation: ['android.permission.health.READ_OXYGEN_SATURATION', 'android.permission.health.WRITE_OXYGEN_SATURATION'],
  bodyTemperature: ['android.permission.health.READ_BODY_TEMPERATURE', 'android.permission.health.WRITE_BODY_TEMPERATURE'],
  height: ['android.permission.health.READ_HEIGHT', 'android.permission.health.WRITE_HEIGHT'],
  weight: ['android.permission.health.READ_WEIGHT', 'android.permission.health.WRITE_WEIGHT'],
  bmi: ['android.permission.health.READ_BODY_MASS_INDEX', 'android.permission.health.WRITE_BODY_MASS_INDEX'],
  bodyFat: ['android.permission.health.READ_BODY_FAT', 'android.permission.health.WRITE_BODY_FAT'],
  calories: ['android.permission.health.READ_TOTAL_CALORIES_BURNED', 'android.permission.health.WRITE_TOTAL_CALORIES_BURNED'],
  sleep: ['android.permission.health.READ_SLEEP', 'android.permission.health.WRITE_SLEEP'],
  exercise: ['android.permission.health.READ_EXERCISE', 'android.permission.health.WRITE_EXERCISE'],
  water: ['android.permission.health.READ_HYDRATION', 'android.permission.health.WRITE_HYDRATION']
}

/**
 * iOS HealthKit 权限描述键
 */
export const IOSHealthPrivacyKeys = {
  read: 'NSHealthShareUsageDescription',
  write: 'NSHealthUpdateUsageDescription'
}

/**
 * 权限分组
 */
export const PermissionGroups = {
  basic: {
    name: '基础权限',
    permissions: ['camera', 'location', 'microphone', 'photoAlbum', 'contacts', 'bluetooth', 'notification']
  },
  calendar: {
    name: '日历权限',
    permissions: ['calendarRead', 'calendarWrite']
  },
  health: {
    name: '健康数据权限',
    permissions: ['healthRead', 'healthWrite']
  },
  fitness: {
    name: '运动数据权限',
    permissions: ['activityRecognition']
  },
  sensors: {
    name: '传感器权限',
    permissions: ['bodySensors']
  },
  reminder: {
    name: '提醒权限',
    permissions: ['setAlarm', 'scheduleExactAlarm']
  }
}

/**
 * 获取所有权限类型代码
 */
export function getAllPermissionTypes() {
  return Object.keys(PermissionType).map(key => PermissionType[key].code)
}

/**
 * 根据代码获取权限类型
 */
export function getPermissionType(code) {
  for (const key in PermissionType) {
    if (PermissionType[key].code === code) {
      return PermissionType[key]
    }
  }
  return null
}

/**
 * 根据分类获取权限类型
 */
export function getPermissionTypesByCategory(category) {
  const types = []
  for (const key in PermissionType) {
    if (PermissionType[key].category === category) {
      types.push(PermissionType[key])
    }
  }
  return types
}

/**
 * 获取健康数据类型对应的 Android 权限
 */
export function getAndroidHealthPermissions(dataType, operation = 'read') {
  const permissions = AndroidHealthPermissions[dataType]
  if (!permissions) return []
  
  if (operation === 'read') {
    return [permissions[0]]
  } else if (operation === 'write') {
    return permissions
  } else {
    return permissions
  }
}

export default {
  PermissionType,
  AndroidHealthPermissions,
  IOSHealthPrivacyKeys,
  PermissionGroups,
  getAllPermissionTypes,
  getPermissionType,
  getPermissionTypesByCategory,
  getAndroidHealthPermissions
}
