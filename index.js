/**
 * uni-system-bridge - 系统桥接组件
 * 统一入口文件,导出所有公共 API
 * @version 2.0.0
 */

// 导入模块
import permissionManager from './modules/permission/permission-manager.js'
import healthManager from './modules/health/health-manager.js'
import fitnessManager from './modules/fitness/fitness-manager.js'
import calendarManager from './modules/calendar/calendar-manager.js'
import alarmManager from './modules/alarm/alarm-manager.js'

// 导入类型定义
import { PermissionType, PermissionGroups } from './types/permission-types.js'
import { HealthDataType, ExerciseType, DataUnit, TimeRange } from './types/data-types.js'

// 导入工具函数
import { getCurrentPlatform } from './utils/platform.js'
import { cacheManager } from './utils/cache-manager.js'
import timeUtils from './utils/time-utils.js'

// ==================== 权限管理 API ====================

/**
 * 检查权限状态
 * @param {string} permissionCode - 权限代码
 * @param {boolean} useCache - 是否使用缓存
 * @returns {Promise<Object>} 权限状态
 */
export async function checkPermission(permissionCode, useCache = true) {
  return await permissionManager.checkPermission(permissionCode, useCache)
}

/**
 * 申请权限
 * @param {string} permissionCode - 权限代码
 * @param {Object} options - 配置选项
 * @returns {Promise<Object>} 申请结果
 */
export async function requestPermission(permissionCode, options = {}) {
  return await permissionManager.requestPermission(permissionCode, options)
}

/**
 * 批量申请权限
 * @param {Array<string>} permissionCodes - 权限代码数组
 * @param {Object} options - 配置选项
 * @returns {Promise<Object>} 申请结果
 */
export async function requestPermissions(permissionCodes, options = {}) {
  return await permissionManager.requestPermissions(permissionCodes, options)
}

/**
 * 打开系统设置
 * @returns {Promise<boolean>} 是否成功
 */
export async function openSystemSetting() {
  return await permissionManager.openSystemSetting()
}

/**
 * 获取所有权限状态
 * @returns {Promise<Object>} 权限状态对象
 */
export async function getAllPermissionStatus() {
  return await permissionManager.getAllPermissionStatus()
}

// ==================== 健康数据 API ====================

/**
 * 读取健康数据
 * @param {string} dataType - 数据类型
 * @param {Object} options - 查询选项
 * @returns {Promise<Array>} 数据记录数组
 */
export async function readHealthData(dataType, options = {}) {
  return await healthManager.read(dataType, options)
}

/**
 * 写入健康数据
 * @param {string} dataType - 数据类型
 * @param {number|Object} value - 数据值
 * @param {Object} options - 写入选项
 * @returns {Promise<Object>} 操作结果
 */
export async function writeHealthData(dataType, value, options = {}) {
  return await healthManager.write(dataType, value, options)
}

/**
 * 删除健康数据
 * @param {string} dataType - 数据类型
 * @param {string} recordId - 记录ID
 * @returns {Promise<Object>} 操作结果
 */
export async function deleteHealthData(dataType, recordId) {
  return await healthManager.delete(dataType, recordId)
}

/**
 * 获取健康数据统计
 * @param {Object} options - 统计选项
 * @returns {Promise<Object>} 统计结果
 */
export async function getHealthStatistics(options = {}) {
  return await healthManager.getStatistics(options)
}

/**
 * 批量读取健康数据
 * @param {Array<string>} dataTypes - 数据类型数组
 * @param {Object} options - 查询选项
 * @returns {Promise<Object>} 数据对象
 */
export async function readMultipleHealthData(dataTypes, options = {}) {
  return await healthManager.readMultiple(dataTypes, options)
}

// ==================== 运动数据 API ====================

/**
 * 开始运动会话
 * @param {string} exerciseType - 运动类型
 * @param {Object} options - 会话选项
 * @returns {Promise<string>} 会话ID
 */
export async function startExerciseSession(exerciseType, options = {}) {
  return await fitnessManager.startSession(exerciseType, options)
}

/**
 * 结束运动会话
 * @param {string} sessionId - 会话ID
 * @param {Object} options - 会话数据
 * @returns {Promise<Object>} 操作结果
 */
export async function endExerciseSession(sessionId, options = {}) {
  return await fitnessManager.endSession(sessionId, options)
}

/**
 * 暂停运动会话
 * @param {string} sessionId - 会话ID
 * @returns {Promise<Object>} 操作结果
 */
export async function pauseExerciseSession(sessionId) {
  return await fitnessManager.pauseSession(sessionId)
}

/**
 * 恢复运动会话
 * @param {string} sessionId - 会话ID
 * @returns {Promise<Object>} 操作结果
 */
export async function resumeExerciseSession(sessionId) {
  return await fitnessManager.resumeSession(sessionId)
}

/**
 * 获取运动会话列表
 * @param {Object} options - 查询选项
 * @returns {Promise<Array>} 会话列表
 */
export async function getExerciseSessions(options = {}) {
  return await fitnessManager.getSessions(options)
}

/**
 * 删除运动会话
 * @param {string} sessionId - 会话ID
 * @returns {Promise<Object>} 操作结果
 */
export async function deleteExerciseSession(sessionId) {
  return await fitnessManager.deleteSession(sessionId)
}

/**
 * 获取运动统计数据
 * @param {Object} options - 统计选项
 * @returns {Promise<Object>} 统计结果
 */
export async function getExerciseStatistics(options = {}) {
  return await fitnessManager.getStatistics(options)
}

/**
 * 获取活跃的运动会话
 * @returns {Array} 活跃会话列表
 */
export function getActiveExerciseSessions() {
  return fitnessManager.getActiveSessions()
}

// ==================== 日历 API ====================

/**
 * 获取日历列表
 * @returns {Promise<Array>} 日历列表
 */
export async function getCalendars() {
  return await calendarManager.getCalendars()
}

/**
 * 创建日历事件
 * @param {Object} options - 事件选项
 * @returns {Promise<string>} 事件ID
 */
export async function createCalendarEvent(options) {
  return await calendarManager.createEvent(options)
}

/**
 * 更新日历事件
 * @param {string} eventId - 事件ID
 * @param {Object} options - 事件选项
 * @returns {Promise<Object>} 操作结果
 */
export async function updateCalendarEvent(eventId, options) {
  return await calendarManager.updateEvent(eventId, options)
}

/**
 * 删除日历事件
 * @param {string} eventId - 事件ID
 * @returns {Promise<Object>} 操作结果
 */
export async function deleteCalendarEvent(eventId) {
  return await calendarManager.deleteEvent(eventId)
}

/**
 * 获取日历事件列表
 * @param {Object} options - 查询选项
 * @returns {Promise<Array>} 事件列表
 */
export async function getCalendarEvents(options = {}) {
  return await calendarManager.getEvents(options)
}

/**
 * 搜索日历事件
 * @param {string} keyword - 关键词
 * @param {Object} options - 搜索选项
 * @returns {Promise<Array>} 事件列表
 */
export async function searchCalendarEvents(keyword, options = {}) {
  return await calendarManager.searchEvents(keyword, options)
}

// ==================== 提醒和闹钟 API ====================

/**
 * 创建提醒
 * @param {Object} options - 提醒选项
 * @returns {Promise<string>} 提醒ID
 */
export async function createReminder(options) {
  return await alarmManager.createReminder(options)
}

/**
 * 更新提醒
 * @param {string} reminderId - 提醒ID
 * @param {Object} options - 提醒选项
 * @returns {Promise<Object>} 操作结果
 */
export async function updateReminder(reminderId, options) {
  return await alarmManager.updateReminder(reminderId, options)
}

/**
 * 删除提醒
 * @param {string} reminderId - 提醒ID
 * @returns {Promise<Object>} 操作结果
 */
export async function deleteReminder(reminderId) {
  return await alarmManager.deleteReminder(reminderId)
}

/**
 * 获取提醒列表
 * @returns {Promise<Array>} 提醒列表
 */
export async function getReminders() {
  return await alarmManager.getReminders()
}

/**
 * 设置闹钟
 * @param {Object} options - 闹钟选项
 * @returns {Promise<string>} 闹钟ID
 */
export async function setAlarm(options) {
  return await alarmManager.setAlarm(options)
}

/**
 * 取消闹钟
 * @param {string} alarmId - 闹钟ID
 * @returns {Promise<Object>} 操作结果
 */
export async function cancelAlarm(alarmId) {
  return await alarmManager.cancelAlarm(alarmId)
}

// ==================== 工具函数 API ====================

/**
 * 获取当前平台
 * @returns {string} 平台标识
 */
export function getPlatform() {
  return getCurrentPlatform()
}

/**
 * 清除缓存
 */
export function clearCache() {
  cacheManager.clear()
}

/**
 * 清除指定前缀的缓存
 * @param {string} prefix - 前缀
 */
export function clearCacheByPrefix(prefix) {
  cacheManager.removeByPrefix(prefix)
}

/**
 * 获取时间范围时间戳
 * @param {string} range - 时间范围代码
 * @returns {Object} { startTime, endTime }
 */
export function getTimeRange(range) {
  return timeUtils.getTimeRangeTimestamps(range)
}

/**
 * 格式化时间戳
 * @param {number} timestamp - 时间戳
 * @param {string} format - 格式字符串
 * @returns {string} 格式化后的时间
 */
export function formatTime(timestamp, format) {
  return timeUtils.formatTimestamp(timestamp, format)
}

// ==================== 导出类型定义 ====================

export {
  // 权限类型
  PermissionType,
  PermissionGroups,
  
  // 数据类型
  HealthDataType,
  ExerciseType,
  DataUnit,
  TimeRange,
  
  // 管理器实例 (高级用法)
  permissionManager,
  healthManager,
  fitnessManager,
  calendarManager,
  alarmManager,
  
  // 工具
  cacheManager,
  timeUtils
}

// 默认导出
export default {
  // 权限管理
  checkPermission,
  requestPermission,
  requestPermissions,
  openSystemSetting,
  getAllPermissionStatus,
  
  // 健康数据
  readHealthData,
  writeHealthData,
  deleteHealthData,
  getHealthStatistics,
  readMultipleHealthData,
  
  // 运动数据
  startExerciseSession,
  endExerciseSession,
  pauseExerciseSession,
  resumeExerciseSession,
  getExerciseSessions,
  deleteExerciseSession,
  getExerciseStatistics,
  getActiveExerciseSessions,
  
  // 日历
  getCalendars,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  getCalendarEvents,
  searchCalendarEvents,
  
  // 提醒和闹钟
  createReminder,
  updateReminder,
  deleteReminder,
  getReminders,
  setAlarm,
  cancelAlarm,
  
  // 工具函数
  getPlatform,
  clearCache,
  clearCacheByPrefix,
  getTimeRange,
  formatTime,
  
  // 类型定义
  PermissionType,
  PermissionGroups,
  HealthDataType,
  ExerciseType,
  DataUnit,
  TimeRange
}
