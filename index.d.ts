/**
 * uni-system-bridge - TypeScript 类型定义
 * @version 2.0.0
 */

// ==================== 基础类型 ====================

/**
 * 平台类型
 */
export type Platform = 'ios' | 'android' | 'harmony' | 'unknown'

/**
 * 权限状态
 */
export interface PermissionStatus {
  /** 是否已授权 */
  authorized: boolean
  /** 是否被拒绝 */
  denied: boolean
  /** 是否永久拒绝 */
  deniedForever: boolean
  /** 详细状态 */
  status: 'authorized' | 'denied' | 'not_determined' | 'restricted'
}

/**
 * 权限请求选项
 */
export interface PermissionRequestOptions {
  /** 是否显示引导 */
  showGuide?: boolean
  /** 引导标题 */
  guideTitle?: string
  /** 引导内容 */
  guideContent?: string
  /** 是否自动打开设置 */
  autoOpenSetting?: boolean
}

/**
 * 权限请求结果
 */
export interface PermissionResult {
  /** 是否成功 */
  success: boolean
  /** 是否已授权 */
  authorized: boolean
  /** 是否永久拒绝 */
  deniedForever?: boolean
  /** 结果消息 */
  message: string
}

/**
 * 批量权限请求结果
 */
export interface BatchPermissionResult {
  /** 是否全部授权 */
  allGranted: boolean
  /** 已授权列表 */
  granted: string[]
  /** 被拒绝列表 */
  denied: string[]
  /** 详细结果 */
  results: Record<string, PermissionResult>
}

// ==================== 健康数据类型 ====================

/**
 * 健康数据查询选项
 */
export interface HealthQueryOptions {
  /** 开始时间戳 (毫秒) */
  startTime?: number
  /** 结束时间戳 (毫秒) */
  endTime?: number
  /** 时间范围快捷方式 */
  timeRange?: 'today' | 'yesterday' | 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth' | 'thisYear' | 'last7Days' | 'last30Days'
  /** 数据单位 */
  unit?: string
  /** 返回数据条数限制 */
  limit?: number
  /** 是否升序排列 */
  ascending?: boolean
  /** 是否使用缓存 */
  useCache?: boolean
}

/**
 * 健康数据写入选项
 */
export interface HealthWriteOptions {
  /** 数据时间戳 (毫秒) */
  timestamp?: number
  /** 数据来源 */
  source?: string
  /** 元数据 */
  metadata?: Record<string, any>
  /** 是否合并已有数据 */
  merge?: boolean
}

/**
 * 健康数据记录
 */
export interface HealthDataRecord {
  /** 记录ID */
  id: string
  /** 数据类型 */
  dataType: string
  /** 数据值 */
  value: number | object
  /** 数据单位 */
  unit: string
  /** 开始时间 */
  startTime: number
  /** 结束时间 */
  endTime: number
  /** 数据来源 */
  source: string
  /** 元数据 */
  metadata?: Record<string, any>
}

/**
 * 统计数据选项
 */
export interface StatisticsOptions {
  /** 数据类型 */
  dataType: string
  /** 开始时间 */
  startTime?: number
  /** 结束时间 */
  endTime?: number
  /** 统计间隔 */
  interval?: 'hour' | 'day' | 'week' | 'month'
  /** 聚合方式 */
  aggregation?: 'sum' | 'avg' | 'min' | 'max'
}

/**
 * 统计数据结果
 */
export interface StatisticsResult {
  /** 数据类型 */
  dataType: string
  /** 开始时间 */
  startTime: number
  /** 结束时间 */
  endTime: number
  /** 总计 */
  total: number
  /** 平均值 */
  average: number
  /** 最小值 */
  min: number
  /** 最大值 */
  max: number
  /** 数据条数 */
  count: number
  /** 详细数据 */
  data: HealthDataRecord[]
}

// ==================== 运动数据类型 ====================

/**
 * 运动会话选项
 */
export interface ExerciseSessionOptions {
  /** 运动类型 */
  exerciseType?: string
  /** 开始时间 */
  startTime?: number
  /** 结束时间 */
  endTime?: number
  /** 持续时间 (分钟) */
  duration?: number
  /** 距离 (米) */
  distance?: number
  /** 卡路里 (千卡) */
  calories?: number
  /** 步数 */
  steps?: number
  /** 平均心率 */
  avgHeartRate?: number
  /** 最大心率 */
  maxHeartRate?: number
  /** 备注 */
  notes?: string
}

/**
 * 运动会话记录
 */
export interface ExerciseSessionRecord {
  /** 会话ID */
  id: string
  /** 运动类型 */
  exerciseType: string
  /** 开始时间 */
  startTime: number
  /** 结束时间 */
  endTime: number
  /** 持续时间 (分钟) */
  duration: number
  /** 统计数据 */
  stats: {
    distance: number
    steps: number
    calories: number
    avgHeartRate: number
    maxHeartRate: number
  }
  /** 数据来源 */
  source: string
  /** 状态 */
  status: 'active' | 'paused' | 'completed'
}

/**
 * 运动统计结果
 */
export interface ExerciseStatisticsResult {
  /** 总会话数 */
  totalSessions: number
  /** 总时长 (分钟) */
  totalDuration: number
  /** 总距离 (米) */
  totalDistance: number
  /** 总步数 */
  totalSteps: number
  /** 总卡路里 (千卡) */
  totalCalories: number
  /** 平均时长 */
  avgDuration: number
  /** 平均距离 */
  avgDistance: number
  /** 平均卡路里 */
  avgCalories: number
  /** 会话列表 */
  sessions: ExerciseSessionRecord[]
}

// ==================== 日历类型 ====================

/**
 * 日历对象
 */
export interface Calendar {
  /** 日历ID */
  id: string
  /** 日历名称 */
  name: string
  /** 日历颜色 */
  color?: string
  /** 是否默认日历 */
  isDefault?: boolean
}

/**
 * 日历事件选项
 */
export interface CalendarEventOptions {
  /** 标题 */
  title: string
  /** 描述 */
  description?: string
  /** 地点 */
  location?: string
  /** 开始时间 */
  startTime: number
  /** 结束时间 */
  endTime: number
  /** 是否全天事件 */
  allDay?: boolean
  /** 重复类型 */
  repeatType?: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'
  /** 重复间隔 */
  repeatInterval?: number
  /** 重复结束时间 */
  repeatEndTime?: number
  /** 提醒列表 */
  alarms?: Array<{
    /** 提前时间 (分钟) */
    minutesBefore: number
  }>
  /** 日历ID */
  calendarId?: string
}

/**
 * 日历事件记录
 */
export interface CalendarEventRecord {
  /** 事件ID */
  id: string
  /** 标题 */
  title: string
  /** 描述 */
  description?: string
  /** 地点 */
  location?: string
  /** 开始时间 */
  startTime: number
  /** 结束时间 */
  endTime: number
  /** 是否全天 */
  allDay: boolean
  /** 重复类型 */
  repeatType: string
  /** 提醒列表 */
  alarms: Array<{
    minutesBefore: number
  }>
  /** 日历ID */
  calendarId: string
}

// ==================== 提醒和闹钟类型 ====================

/**
 * 提醒选项
 */
export interface ReminderOptions {
  /** 标题 */
  title: string
  /** 内容 */
  content?: string
  /** 触发时间 */
  triggerTime: number
  /** 重复类型 */
  repeatType?: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'
  /** 重复间隔 */
  repeatInterval?: number
  /** 声音名称 */
  soundName?: string
  /** 是否震动 */
  vibrate?: boolean
}

/**
 * 闹钟选项
 */
export interface AlarmOptions {
  /** 小时 (0-23) */
  hour: number
  /** 分钟 (0-59) */
  minute: number
  /** 重复类型 */
  repeatType?: 'none' | 'daily' | 'weekly' | 'custom'
  /** 标签 */
  label?: string
  /** 是否启用 */
  enabled?: boolean
}

// ==================== 操作结果类型 ====================

/**
 * 操作结果
 */
export interface OperationResult {
  /** 是否成功 */
  success: boolean
  /** 返回数据 */
  data?: any
  /** 错误信息 */
  error?: {
    code: string
    message: string
  }
  /** 消息 */
  message: string
}

// ==================== API 函数声明 ====================

// 权限管理
export function checkPermission(permissionCode: string, useCache?: boolean): Promise<PermissionStatus>
export function requestPermission(permissionCode: string, options?: PermissionRequestOptions): Promise<PermissionResult>
export function requestPermissions(permissionCodes: string[], options?: PermissionRequestOptions): Promise<BatchPermissionResult>
export function openSystemSetting(): Promise<boolean>
export function getAllPermissionStatus(): Promise<Record<string, PermissionStatus>>

// 健康数据
export function readHealthData(dataType: string, options?: HealthQueryOptions): Promise<HealthDataRecord[]>
export function writeHealthData(dataType: string, value: number | object, options?: HealthWriteOptions): Promise<OperationResult>
export function deleteHealthData(dataType: string, recordId: string): Promise<OperationResult>
export function getHealthStatistics(options: StatisticsOptions): Promise<StatisticsResult>
export function readMultipleHealthData(dataTypes: string[], options?: HealthQueryOptions): Promise<Record<string, HealthDataRecord[]>>

// 运动数据
export function startExerciseSession(exerciseType: string, options?: ExerciseSessionOptions): Promise<string>
export function endExerciseSession(sessionId: string, options?: ExerciseSessionOptions): Promise<OperationResult>
export function pauseExerciseSession(sessionId: string): Promise<OperationResult>
export function resumeExerciseSession(sessionId: string): Promise<OperationResult>
export function getExerciseSessions(options?: HealthQueryOptions): Promise<ExerciseSessionRecord[]>
export function deleteExerciseSession(sessionId: string): Promise<OperationResult>
export function getExerciseStatistics(options?: StatisticsOptions): Promise<ExerciseStatisticsResult>
export function getActiveExerciseSessions(): ExerciseSessionRecord[]

// 日历
export function getCalendars(): Promise<Calendar[]>
export function createCalendarEvent(options: CalendarEventOptions): Promise<string>
export function updateCalendarEvent(eventId: string, options: CalendarEventOptions): Promise<OperationResult>
export function deleteCalendarEvent(eventId: string): Promise<OperationResult>
export function getCalendarEvents(options?: HealthQueryOptions): Promise<CalendarEventRecord[]>
export function searchCalendarEvents(keyword: string, options?: HealthQueryOptions): Promise<CalendarEventRecord[]>

// 提醒和闹钟
export function createReminder(options: ReminderOptions): Promise<string>
export function updateReminder(reminderId: string, options: ReminderOptions): Promise<OperationResult>
export function deleteReminder(reminderId: string): Promise<OperationResult>
export function getReminders(): Promise<any[]>
export function setAlarm(options: AlarmOptions): Promise<string>
export function cancelAlarm(alarmId: string): Promise<OperationResult>

// 工具函数
export function getPlatform(): Platform
export function clearCache(): void
export function clearCacheByPrefix(prefix: string): void
export function getTimeRange(range: string): { startTime: number; endTime: number }
export function formatTime(timestamp: number, format?: string): string

// 类型定义导出
export const PermissionType: Record<string, any>
export const PermissionGroups: Record<string, any>
export const HealthDataType: Record<string, any>
export const ExerciseType: Record<string, any>
export const DataUnit: Record<string, any>
export const TimeRange: Record<string, any>

// 默认导出
declare const _default: {
  checkPermission: typeof checkPermission
  requestPermission: typeof requestPermission
  requestPermissions: typeof requestPermissions
  openSystemSetting: typeof openSystemSetting
  getAllPermissionStatus: typeof getAllPermissionStatus
  readHealthData: typeof readHealthData
  writeHealthData: typeof writeHealthData
  deleteHealthData: typeof deleteHealthData
  getHealthStatistics: typeof getHealthStatistics
  readMultipleHealthData: typeof readMultipleHealthData
  startExerciseSession: typeof startExerciseSession
  endExerciseSession: typeof endExerciseSession
  pauseExerciseSession: typeof pauseExerciseSession
  resumeExerciseSession: typeof resumeExerciseSession
  getExerciseSessions: typeof getExerciseSessions
  deleteExerciseSession: typeof deleteExerciseSession
  getExerciseStatistics: typeof getExerciseStatistics
  getActiveExerciseSessions: typeof getActiveExerciseSessions
  getCalendars: typeof getCalendars
  createCalendarEvent: typeof createCalendarEvent
  updateCalendarEvent: typeof updateCalendarEvent
  deleteCalendarEvent: typeof deleteCalendarEvent
  getCalendarEvents: typeof getCalendarEvents
  searchCalendarEvents: typeof searchCalendarEvents
  createReminder: typeof createReminder
  updateReminder: typeof updateReminder
  deleteReminder: typeof deleteReminder
  getReminders: typeof getReminders
  setAlarm: typeof setAlarm
  cancelAlarm: typeof cancelAlarm
  getPlatform: typeof getPlatform
  clearCache: typeof clearCache
  clearCacheByPrefix: typeof clearCacheByPrefix
  getTimeRange: typeof getTimeRange
  formatTime: typeof formatTime
  PermissionType: typeof PermissionType
  PermissionGroups: typeof PermissionGroups
  HealthDataType: typeof HealthDataType
  ExerciseType: typeof ExerciseType
  DataUnit: typeof DataUnit
  TimeRange: typeof TimeRange
}

export default _default
