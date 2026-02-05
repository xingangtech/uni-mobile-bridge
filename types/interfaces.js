/**
 * 系统桥接组件 - 接口定义
 * 定义所有模块的统一接口规范
 */

/**
 * 健康数据查询选项
 * @typedef {Object} HealthQueryOptions
 * @property {number} startTime - 开始时间戳 (毫秒)
 * @property {number} endTime - 结束时间戳 (毫秒)
 * @property {string} timeRange - 时间范围快捷方式 (today, yesterday, thisWeek 等)
 * @property {string} unit - 数据单位
 * @property {number} limit - 返回数据条数限制
 * @property {boolean} ascending - 是否升序排列
 * @property {boolean} useCache - 是否使用缓存
 */

/**
 * 健康数据写入选项
 * @typedef {Object} HealthWriteOptions
 * @property {number} timestamp - 数据时间戳 (毫秒)
 * @property {string} source - 数据来源
 * @property {Object} metadata - 元数据
 * @property {boolean} merge - 是否合并已有数据
 */

/**
 * 健康数据记录
 * @typedef {Object} HealthDataRecord
 * @property {string} id - 记录ID
 * @property {string} dataType - 数据类型
 * @property {number|Object} value - 数据值
 * @property {string} unit - 数据单位
 * @property {number} startTime - 开始时间
 * @property {number} endTime - 结束时间
 * @property {string} source - 数据来源
 * @property {Object} metadata - 元数据
 */

/**
 * 运动会话选项
 * @typedef {Object} ExerciseSessionOptions
 * @property {string} exerciseType - 运动类型
 * @property {number} startTime - 开始时间
 * @property {number} endTime - 结束时间
 * @property {number} duration - 持续时间 (分钟)
 * @property {number} distance - 距离 (米)
 * @property {number} calories - 卡路里 (千卡)
 * @property {number} steps - 步数
 * @property {number} avgHeartRate - 平均心率
 * @property {number} maxHeartRate - 最大心率
 * @property {string} notes - 备注
 */

/**
 * 运动会话记录
 * @typedef {Object} ExerciseSessionRecord
 * @property {string} id - 会话ID
 * @property {string} exerciseType - 运动类型
 * @property {number} startTime - 开始时间
 * @property {number} endTime - 结束时间
 * @property {number} duration - 持续时间
 * @property {Object} stats - 统计数据
 * @property {string} source - 数据来源
 */

/**
 * 日历事件选项
 * @typedef {Object} CalendarEventOptions
 * @property {string} title - 标题
 * @property {string} description - 描述
 * @property {string} location - 地点
 * @property {number} startTime - 开始时间
 * @property {number} endTime - 结束时间
 * @property {boolean} allDay - 是否全天事件
 * @property {string} repeatType - 重复类型
 * @property {number} repeatInterval - 重复间隔
 * @property {number} repeatEndTime - 重复结束时间
 * @property {Array<Object>} alarms - 提醒列表
 * @property {string} calendarId - 日历ID
 */

/**
 * 日历事件记录
 * @typedef {Object} CalendarEventRecord
 * @property {string} id - 事件ID
 * @property {string} title - 标题
 * @property {string} description - 描述
 * @property {string} location - 地点
 * @property {number} startTime - 开始时间
 * @property {number} endTime - 结束时间
 * @property {boolean} allDay - 是否全天
 * @property {string} repeatType - 重复类型
 * @property {Array<Object>} alarms - 提醒列表
 * @property {string} calendarId - 日历ID
 */

/**
 * 提醒选项
 * @typedef {Object} ReminderOptions
 * @property {string} title - 标题
 * @property {string} content - 内容
 * @property {number} triggerTime - 触发时间
 * @property {string} repeatType - 重复类型
 * @property {number} repeatInterval - 重复间隔
 * @property {string} soundName - 声音名称
 * @property {boolean} vibrate - 是否震动
 */

/**
 * 睡眠数据选项
 * @typedef {Object} SleepDataOptions
 * @property {number} startTime - 开始时间
 * @property {number} endTime - 结束时间
 * @property {Array<Object>} stages - 睡眠阶段
 * @property {string} notes - 备注
 */

/**
 * 睡眠数据记录
 * @typedef {Object} SleepDataRecord
 * @property {string} id - 记录ID
 * @property {number} startTime - 开始时间
 * @property {number} endTime - 结束时间
 * @property {number} duration - 总时长 (分钟)
 * @property {Array<Object>} stages - 睡眠阶段
 * @property {Object} stats - 统计数据
 */

/**
 * 统计数据选项
 * @typedef {Object} StatisticsOptions
 * @property {string} dataType - 数据类型
 * @property {number} startTime - 开始时间
 * @property {number} endTime - 结束时间
 * @property {string} interval - 统计间隔 (hour, day, week, month)
 * @property {string} aggregation - 聚合方式 (sum, avg, min, max)
 */

/**
 * 统计数据结果
 * @typedef {Object} StatisticsResult
 * @property {string} dataType - 数据类型
 * @property {number} startTime - 开始时间
 * @property {number} endTime - 结束时间
 * @property {number} total - 总计
 * @property {number} average - 平均值
 * @property {number} min - 最小值
 * @property {number} max - 最大值
 * @property {Array<Object>} data - 详细数据
 */

/**
 * 数据同步选项
 * @typedef {Object} SyncOptions
 * @property {Array<string>} dataTypes - 要同步的数据类型
 * @property {number} startTime - 开始时间
 * @property {number} endTime - 结束时间
 * @property {boolean} bidirectional - 是否双向同步
 * @property {string} conflictResolution - 冲突解决策略
 */

/**
 * 权限请求结果
 * @typedef {Object} PermissionResult
 * @property {boolean} success - 是否成功
 * @property {boolean} authorized - 是否已授权
 * @property {boolean} denied - 是否被拒绝
 * @property {boolean} deniedForever - 是否永久拒绝
 * @property {string} status - 状态
 * @property {string} message - 消息
 */

/**
 * 批量权限请求结果
 * @typedef {Object} BatchPermissionResult
 * @property {boolean} allGranted - 是否全部授权
 * @property {Array<string>} granted - 已授权列表
 * @property {Array<string>} denied - 被拒绝列表
 * @property {Object} results - 详细结果
 */

/**
 * 错误信息
 * @typedef {Object} ErrorInfo
 * @property {string} code - 错误代码
 * @property {string} message - 错误消息
 * @property {Object} details - 错误详情
 */

/**
 * 操作结果
 * @typedef {Object} OperationResult
 * @property {boolean} success - 是否成功
 * @property {*} data - 返回数据
 * @property {ErrorInfo} error - 错误信息
 * @property {string} message - 消息
 */

/**
 * 健康数据模块接口
 */
export const IHealthModule = {
  /**
   * 读取健康数据
   * @param {string} dataType - 数据类型
   * @param {HealthQueryOptions} options - 查询选项
   * @returns {Promise<Array<HealthDataRecord>>}
   */
  read: async (dataType, options) => {},
  
  /**
   * 写入健康数据
   * @param {string} dataType - 数据类型
   * @param {number|Object} value - 数据值
   * @param {HealthWriteOptions} options - 写入选项
   * @returns {Promise<OperationResult>}
   */
  write: async (dataType, value, options) => {},
  
  /**
   * 删除健康数据
   * @param {string} dataType - 数据类型
   * @param {string} recordId - 记录ID
   * @returns {Promise<OperationResult>}
   */
  delete: async (dataType, recordId) => {},
  
  /**
   * 获取统计数据
   * @param {StatisticsOptions} options - 统计选项
   * @returns {Promise<StatisticsResult>}
   */
  getStatistics: async (options) => {}
}

/**
 * 运动数据模块接口
 */
export const IFitnessModule = {
  /**
   * 开始运动会话
   * @param {string} exerciseType - 运动类型
   * @returns {Promise<string>} 会话ID
   */
  startSession: async (exerciseType) => {},
  
  /**
   * 结束运动会话
   * @param {string} sessionId - 会话ID
   * @param {ExerciseSessionOptions} options - 会话选项
   * @returns {Promise<OperationResult>}
   */
  endSession: async (sessionId, options) => {},
  
  /**
   * 获取运动会话列表
   * @param {HealthQueryOptions} options - 查询选项
   * @returns {Promise<Array<ExerciseSessionRecord>>}
   */
  getSessions: async (options) => {},
  
  /**
   * 删除运动会话
   * @param {string} sessionId - 会话ID
   * @returns {Promise<OperationResult>}
   */
  deleteSession: async (sessionId) => {}
}

/**
 * 日历模块接口
 */
export const ICalendarModule = {
  /**
   * 获取日历列表
   * @returns {Promise<Array<Object>>}
   */
  getCalendars: async () => {},
  
  /**
   * 创建日历事件
   * @param {CalendarEventOptions} options - 事件选项
   * @returns {Promise<string>} 事件ID
   */
  createEvent: async (options) => {},
  
  /**
   * 更新日历事件
   * @param {string} eventId - 事件ID
   * @param {CalendarEventOptions} options - 事件选项
   * @returns {Promise<OperationResult>}
   */
  updateEvent: async (eventId, options) => {},
  
  /**
   * 删除日历事件
   * @param {string} eventId - 事件ID
   * @returns {Promise<OperationResult>}
   */
  deleteEvent: async (eventId) => {},
  
  /**
   * 获取日历事件列表
   * @param {HealthQueryOptions} options - 查询选项
   * @returns {Promise<Array<CalendarEventRecord>>}
   */
  getEvents: async (options) => {}
}

/**
 * 提醒模块接口
 */
export const IAlarmModule = {
  /**
   * 创建提醒
   * @param {ReminderOptions} options - 提醒选项
   * @returns {Promise<string>} 提醒ID
   */
  createReminder: async (options) => {},
  
  /**
   * 更新提醒
   * @param {string} reminderId - 提醒ID
   * @param {ReminderOptions} options - 提醒选项
   * @returns {Promise<OperationResult>}
   */
  updateReminder: async (reminderId, options) => {},
  
  /**
   * 删除提醒
   * @param {string} reminderId - 提醒ID
   * @returns {Promise<OperationResult>}
   */
  deleteReminder: async (reminderId) => {},
  
  /**
   * 获取提醒列表
   * @returns {Promise<Array<Object>>}
   */
  getReminders: async () => {}
}

export default {
  IHealthModule,
  IFitnessModule,
  ICalendarModule,
  IAlarmModule
}
