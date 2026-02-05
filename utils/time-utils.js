/**
 * 时间工具函数
 */

/**
 * 获取时间范围的时间戳
 * @param {string} range - 时间范围代码
 * @returns {Object} { startTime, endTime }
 */
export function getTimeRangeTimestamps(range) {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  let startTime, endTime
  
  switch (range) {
    case 'today':
      startTime = today.getTime()
      endTime = Date.now()
      break
      
    case 'yesterday':
      startTime = today.getTime() - 24 * 60 * 60 * 1000
      endTime = today.getTime()
      break
      
    case 'thisWeek':
      const dayOfWeek = today.getDay()
      const monday = new Date(today)
      monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
      startTime = monday.getTime()
      endTime = Date.now()
      break
      
    case 'lastWeek':
      const lastMonday = new Date(today)
      lastMonday.setDate(today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1) - 7)
      const lastSunday = new Date(lastMonday)
      lastSunday.setDate(lastMonday.getDate() + 6)
      startTime = lastMonday.getTime()
      endTime = lastSunday.getTime() + 24 * 60 * 60 * 1000
      break
      
    case 'thisMonth':
      startTime = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
      endTime = Date.now()
      break
      
    case 'lastMonth':
      startTime = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime()
      endTime = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
      break
      
    case 'thisYear':
      startTime = new Date(now.getFullYear(), 0, 1).getTime()
      endTime = Date.now()
      break
      
    case 'last7Days':
      startTime = today.getTime() - 7 * 24 * 60 * 60 * 1000
      endTime = Date.now()
      break
      
    case 'last30Days':
      startTime = today.getTime() - 30 * 24 * 60 * 60 * 1000
      endTime = Date.now()
      break
      
    default:
      // 默认返回今天
      startTime = today.getTime()
      endTime = Date.now()
  }
  
  return { startTime, endTime }
}

/**
 * 格式化时间戳
 * @param {number} timestamp - 时间戳 (毫秒)
 * @param {string} format - 格式字符串
 * @returns {string} 格式化后的时间字符串
 */
export function formatTimestamp(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
  const date = new Date(timestamp)
  
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 解析日期字符串为时间戳
 * @param {string} dateString - 日期字符串
 * @returns {number} 时间戳 (毫秒)
 */
export function parseDateString(dateString) {
  return new Date(dateString).getTime()
}

/**
 * 获取今天的开始时间
 * @returns {number} 时间戳 (毫秒)
 */
export function getTodayStart() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
}

/**
 * 获取今天的结束时间
 * @returns {number} 时间戳 (毫秒)
 */
export function getTodayEnd() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime()
}

/**
 * 计算两个时间戳之间的天数
 * @param {number} startTime - 开始时间戳
 * @param {number} endTime - 结束时间戳
 * @returns {number} 天数
 */
export function getDaysBetween(startTime, endTime) {
  return Math.floor((endTime - startTime) / (24 * 60 * 60 * 1000))
}

/**
 * 获取指定日期的开始时间
 * @param {Date} date - 日期对象
 * @returns {number} 时间戳 (毫秒)
 */
export function getDateStart(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

/**
 * 获取指定日期的结束时间
 * @param {Date} date - 日期对象
 * @returns {number} 时间戳 (毫秒)
 */
export function getDateEnd(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999).getTime()
}

/**
 * 判断是否是同一天
 * @param {number} timestamp1 - 时间戳1
 * @param {number} timestamp2 - 时间戳2
 * @returns {boolean}
 */
export function isSameDay(timestamp1, timestamp2) {
  const date1 = new Date(timestamp1)
  const date2 = new Date(timestamp2)
  
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate()
}

/**
 * 获取相对时间描述
 * @param {number} timestamp - 时间戳
 * @returns {string} 相对时间描述
 */
export function getRelativeTime(timestamp) {
  const now = Date.now()
  const diff = now - timestamp
  
  if (diff < 60 * 1000) {
    return '刚刚'
  } else if (diff < 60 * 60 * 1000) {
    return `${Math.floor(diff / (60 * 1000))}分钟前`
  } else if (diff < 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / (60 * 60 * 1000))}小时前`
  } else if (diff < 7 * 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / (24 * 60 * 60 * 1000))}天前`
  } else {
    return formatTimestamp(timestamp, 'YYYY-MM-DD')
  }
}

export default {
  getTimeRangeTimestamps,
  formatTimestamp,
  parseDateString,
  getTodayStart,
  getTodayEnd,
  getDaysBetween,
  getDateStart,
  getDateEnd,
  isSameDay,
  getRelativeTime
}
