/**
 * 系统桥接组件 - 数据类型定义
 * 统一定义跨平台的健康、运动、日历等数据类型
 */

/**
 * 健康数据类型枚举
 */
export const HealthDataType = {
  // 基础生理数据
  STEPS: {
    code: 'steps',
    name: '步数',
    unit: 'count',
    category: 'activity',
    ios: 'HKQuantityTypeIdentifierStepCount',
    android: 'StepsRecord',
    harmony: 'DT_CONTINUOUS_STEPS_DELTA'
  },
  
  DISTANCE: {
    code: 'distance',
    name: '距离',
    unit: 'meter',
    category: 'activity',
    ios: 'HKQuantityTypeIdentifierDistanceWalkingRunning',
    android: 'DistanceRecord',
    harmony: 'DT_CONTINUOUS_DISTANCE_DELTA'
  },
  
  HEART_RATE: {
    code: 'heartRate',
    name: '心率',
    unit: 'bpm',
    category: 'vitals',
    ios: 'HKQuantityTypeIdentifierHeartRate',
    android: 'HeartRateRecord',
    harmony: 'DT_INSTANTANEOUS_HEART_RATE'
  },
  
  BLOOD_PRESSURE_SYSTOLIC: {
    code: 'bloodPressureSystolic',
    name: '收缩压',
    unit: 'mmHg',
    category: 'vitals',
    ios: 'HKQuantityTypeIdentifierBloodPressureSystolic',
    android: 'BloodPressureRecord',
    harmony: 'DT_INSTANTANEOUS_BLOOD_PRESSURE'
  },
  
  BLOOD_PRESSURE_DIASTOLIC: {
    code: 'bloodPressureDiastolic',
    name: '舒张压',
    unit: 'mmHg',
    category: 'vitals',
    ios: 'HKQuantityTypeIdentifierBloodPressureDiastolic',
    android: 'BloodPressureRecord',
    harmony: 'DT_INSTANTANEOUS_BLOOD_PRESSURE'
  },
  
  OXYGEN_SATURATION: {
    code: 'oxygenSaturation',
    name: '血氧饱和度',
    unit: 'percent',
    category: 'vitals',
    ios: 'HKQuantityTypeIdentifierOxygenSaturation',
    android: 'OxygenSaturationRecord',
    harmony: 'DT_INSTANTANEOUS_SPO2'
  },
  
  BODY_TEMPERATURE: {
    code: 'bodyTemperature',
    name: '体温',
    unit: 'celsius',
    category: 'vitals',
    ios: 'HKQuantityTypeIdentifierBodyTemperature',
    android: 'BodyTemperatureRecord',
    harmony: 'DT_INSTANTANEOUS_BODY_TEMPERATURE'
  },
  
  // 身体测量数据
  HEIGHT: {
    code: 'height',
    name: '身高',
    unit: 'cm',
    category: 'body',
    ios: 'HKQuantityTypeIdentifierHeight',
    android: 'HeightRecord',
    harmony: 'DT_INSTANTANEOUS_HEIGHT'
  },
  
  WEIGHT: {
    code: 'weight',
    name: '体重',
    unit: 'kg',
    category: 'body',
    ios: 'HKQuantityTypeIdentifierBodyMass',
    android: 'WeightRecord',
    harmony: 'DT_INSTANTANEOUS_BODY_WEIGHT'
  },
  
  BMI: {
    code: 'bmi',
    name: 'BMI指数',
    unit: 'index',
    category: 'body',
    ios: 'HKQuantityTypeIdentifierBodyMassIndex',
    android: 'BodyMassIndexRecord',
    harmony: 'DT_INSTANTANEOUS_BMI'
  },
  
  BODY_FAT_PERCENTAGE: {
    code: 'bodyFatPercentage',
    name: '体脂率',
    unit: 'percent',
    category: 'body',
    ios: 'HKQuantityTypeIdentifierBodyFatPercentage',
    android: 'BodyFatRecord',
    harmony: 'DT_INSTANTANEOUS_BODY_FAT_RATE'
  },
  
  // 能量消耗数据
  ACTIVE_ENERGY: {
    code: 'activeEnergy',
    name: '活动能量',
    unit: 'kcal',
    category: 'energy',
    ios: 'HKQuantityTypeIdentifierActiveEnergyBurned',
    android: 'ActiveCaloriesBurnedRecord',
    harmony: 'DT_CONTINUOUS_CALORIES_BURNT'
  },
  
  BASAL_ENERGY: {
    code: 'basalEnergy',
    name: '基础代谢',
    unit: 'kcal',
    category: 'energy',
    ios: 'HKQuantityTypeIdentifierBasalEnergyBurned',
    android: 'BasalMetabolicRateRecord',
    harmony: 'DT_CONTINUOUS_BASAL_METABOLISM'
  },
  
  // 睡眠数据
  SLEEP: {
    code: 'sleep',
    name: '睡眠',
    unit: 'minute',
    category: 'sleep',
    ios: 'HKCategoryTypeIdentifierSleepAnalysis',
    android: 'SleepSessionRecord',
    harmony: 'DT_CONTINUOUS_SLEEP'
  },
  
  // 运动数据
  EXERCISE_TIME: {
    code: 'exerciseTime',
    name: '运动时间',
    unit: 'minute',
    category: 'exercise',
    ios: 'HKQuantityTypeIdentifierAppleExerciseTime',
    android: 'ExerciseSessionRecord',
    harmony: 'DT_CONTINUOUS_EXERCISE_TIME'
  },
  
  // 营养数据
  WATER: {
    code: 'water',
    name: '饮水量',
    unit: 'ml',
    category: 'nutrition',
    ios: 'HKQuantityTypeIdentifierDietaryWater',
    android: 'HydrationRecord',
    harmony: 'DT_CONTINUOUS_HYDRATE'
  },
  
  // 女性健康
  MENSTRUATION: {
    code: 'menstruation',
    name: '月经',
    unit: 'none',
    category: 'reproductive',
    ios: 'HKCategoryTypeIdentifierMenstrualFlow',
    android: 'MenstruationPeriodRecord',
    harmony: 'DT_CONTINUOUS_MENSTRUATION'
  }
}

/**
 * 运动类型枚举
 */
export const ExerciseType = {
  WALKING: { code: 'walking', name: '步行', ios: 'HKWorkoutActivityTypeWalking', android: 'EXERCISE_TYPE_WALKING' },
  RUNNING: { code: 'running', name: '跑步', ios: 'HKWorkoutActivityTypeRunning', android: 'EXERCISE_TYPE_RUNNING' },
  CYCLING: { code: 'cycling', name: '骑行', ios: 'HKWorkoutActivityTypeCycling', android: 'EXERCISE_TYPE_BIKING' },
  SWIMMING: { code: 'swimming', name: '游泳', ios: 'HKWorkoutActivityTypeSwimming', android: 'EXERCISE_TYPE_SWIMMING' },
  YOGA: { code: 'yoga', name: '瑜伽', ios: 'HKWorkoutActivityTypeYoga', android: 'EXERCISE_TYPE_YOGA' },
  STRENGTH_TRAINING: { code: 'strengthTraining', name: '力量训练', ios: 'HKWorkoutActivityTypeTraditionalStrengthTraining', android: 'EXERCISE_TYPE_STRENGTH_TRAINING' },
  BASKETBALL: { code: 'basketball', name: '篮球', ios: 'HKWorkoutActivityTypeBasketball', android: 'EXERCISE_TYPE_BASKETBALL' },
  FOOTBALL: { code: 'football', name: '足球', ios: 'HKWorkoutActivityTypeSoccer', android: 'EXERCISE_TYPE_FOOTBALL' },
  BADMINTON: { code: 'badminton', name: '羽毛球', ios: 'HKWorkoutActivityTypeBadminton', android: 'EXERCISE_TYPE_BADMINTON' },
  TABLE_TENNIS: { code: 'tableTennis', name: '乒乓球', ios: 'HKWorkoutActivityTypeTableTennis', android: 'EXERCISE_TYPE_TABLE_TENNIS' },
  HIKING: { code: 'hiking', name: '徒步', ios: 'HKWorkoutActivityTypeHiking', android: 'EXERCISE_TYPE_HIKING' },
  DANCING: { code: 'dancing', name: '跳舞', ios: 'HKWorkoutActivityTypeDance', android: 'EXERCISE_TYPE_DANCING' },
  JUMP_ROPE: { code: 'jumpRope', name: '跳绳', ios: 'HKWorkoutActivityTypeJumpRope', android: 'EXERCISE_TYPE_JUMP_ROPE' },
  OTHER: { code: 'other', name: '其他', ios: 'HKWorkoutActivityTypeOther', android: 'EXERCISE_TYPE_OTHER' }
}

/**
 * 数据单位枚举
 */
export const DataUnit = {
  COUNT: { code: 'count', name: '次', symbol: '' },
  METER: { code: 'meter', name: '米', symbol: 'm' },
  KILOMETER: { code: 'kilometer', name: '千米', symbol: 'km' },
  BPM: { code: 'bpm', name: '次/分钟', symbol: 'bpm' },
  MMHG: { code: 'mmHg', name: '毫米汞柱', symbol: 'mmHg' },
  PERCENT: { code: 'percent', name: '百分比', symbol: '%' },
  CELSIUS: { code: 'celsius', name: '摄氏度', symbol: '°C' },
  FAHRENHEIT: { code: 'fahrenheit', name: '华氏度', symbol: '°F' },
  CENTIMETER: { code: 'cm', name: '厘米', symbol: 'cm' },
  KILOGRAM: { code: 'kg', name: '千克', symbol: 'kg' },
  POUND: { code: 'pound', name: '磅', symbol: 'lb' },
  KCAL: { code: 'kcal', name: '千卡', symbol: 'kcal' },
  MINUTE: { code: 'minute', name: '分钟', symbol: 'min' },
  HOUR: { code: 'hour', name: '小时', symbol: 'h' },
  MILLILITER: { code: 'ml', name: '毫升', symbol: 'ml' },
  LITER: { code: 'liter', name: '升', symbol: 'L' },
  INDEX: { code: 'index', name: '指数', symbol: '' },
  NONE: { code: 'none', name: '无', symbol: '' }
}

/**
 * 时间范围快捷方式
 */
export const TimeRange = {
  TODAY: { code: 'today', name: '今天' },
  YESTERDAY: { code: 'yesterday', name: '昨天' },
  THIS_WEEK: { code: 'thisWeek', name: '本周' },
  LAST_WEEK: { code: 'lastWeek', name: '上周' },
  THIS_MONTH: { code: 'thisMonth', name: '本月' },
  LAST_MONTH: { code: 'lastMonth', name: '上月' },
  THIS_YEAR: { code: 'thisYear', name: '今年' },
  LAST_7_DAYS: { code: 'last7Days', name: '最近7天' },
  LAST_30_DAYS: { code: 'last30Days', name: '最近30天' },
  CUSTOM: { code: 'custom', name: '自定义' }
}

/**
 * 日历事件类型
 */
export const CalendarEventType = {
  EVENT: { code: 'event', name: '事件' },
  REMINDER: { code: 'reminder', name: '提醒' },
  BIRTHDAY: { code: 'birthday', name: '生日' },
  ANNIVERSARY: { code: 'anniversary', name: '纪念日' }
}

/**
 * 提醒重复类型
 */
export const RepeatType = {
  NONE: { code: 'none', name: '不重复' },
  DAILY: { code: 'daily', name: '每天' },
  WEEKLY: { code: 'weekly', name: '每周' },
  MONTHLY: { code: 'monthly', name: '每月' },
  YEARLY: { code: 'yearly', name: '每年' },
  CUSTOM: { code: 'custom', name: '自定义' }
}

/**
 * 睡眠阶段
 */
export const SleepStage = {
  AWAKE: { code: 'awake', name: '清醒', ios: 'HKCategoryValueSleepAnalysisAwake', android: 'SLEEP_STAGE_TYPE_AWAKE' },
  LIGHT: { code: 'light', name: '浅睡', ios: 'HKCategoryValueSleepAnalysisAsleep', android: 'SLEEP_STAGE_TYPE_LIGHT' },
  DEEP: { code: 'deep', name: '深睡', ios: 'HKCategoryValueSleepAnalysisAsleep', android: 'SLEEP_STAGE_TYPE_DEEP' },
  REM: { code: 'rem', name: 'REM', ios: 'HKCategoryValueSleepAnalysisAsleep', android: 'SLEEP_STAGE_TYPE_REM' }
}

/**
 * 获取所有健康数据类型代码
 */
export function getAllHealthDataTypes() {
  return Object.keys(HealthDataType).map(key => HealthDataType[key].code)
}

/**
 * 根据代码获取健康数据类型
 */
export function getHealthDataType(code) {
  for (const key in HealthDataType) {
    if (HealthDataType[key].code === code) {
      return HealthDataType[key]
    }
  }
  return null
}

/**
 * 根据分类获取健康数据类型
 */
export function getHealthDataTypesByCategory(category) {
  const types = []
  for (const key in HealthDataType) {
    if (HealthDataType[key].category === category) {
      types.push(HealthDataType[key])
    }
  }
  return types
}

/**
 * 单位转换
 */
export const UnitConverter = {
  // 距离转换
  meterToKm: (value) => value / 1000,
  kmToMeter: (value) => value * 1000,
  
  // 温度转换
  celsiusToFahrenheit: (value) => (value * 9/5) + 32,
  fahrenheitToCelsius: (value) => (value - 32) * 5/9,
  
  // 重量转换
  kgToPound: (value) => value * 2.20462,
  poundToKg: (value) => value / 2.20462,
  
  // 长度转换
  cmToInch: (value) => value / 2.54,
  inchToCm: (value) => value * 2.54,
  
  // 容量转换
  mlToOz: (value) => value / 29.5735,
  ozToMl: (value) => value * 29.5735,
  
  // 时间转换
  minuteToHour: (value) => value / 60,
  hourToMinute: (value) => value * 60,
  secondToMinute: (value) => value / 60,
  minuteToSecond: (value) => value * 60
}

export default {
  HealthDataType,
  ExerciseType,
  DataUnit,
  TimeRange,
  CalendarEventType,
  RepeatType,
  SleepStage,
  getAllHealthDataTypes,
  getHealthDataType,
  getHealthDataTypesByCategory,
  UnitConverter
}
