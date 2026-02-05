/**
 * uni-mobile-bridge - 跨平台原生功能访问组件
 * 支持 Android、iOS 和 HarmonyOS
 */

const MODULE_NAME = 'UnimobileBridgeModule';

/**
 * 获取原生模块
 */
function getNativeModule() {
  // #ifdef APP-PLUS
  if (typeof uni !== 'undefined' && uni.requireNativePlugin) {
    return uni.requireNativePlugin(MODULE_NAME);
  }
  // #endif
  return null;
}

/**
 * 健康模块 - 访问健康数据
 */
const Health = {
  /**
   * 请求健康数据权限
   * @param {Array<string>} permissions - 需要的权限列表
   * @returns {Promise<{success: boolean, granted: Array<string>}>}
   */
  requestPermissions(permissions) {
    return new Promise((resolve, reject) => {
      const module = getNativeModule();
      if (!module) {
        reject(new Error('Native module not available'));
        return;
      }
      
      module.requestHealthPermissions({
        permissions: permissions || []
      }, (result) => {
        if (result.success) {
          resolve(result);
        } else {
          reject(new Error(result.message || 'Permission request failed'));
        }
      });
    });
  },

  /**
   * 获取步数数据
   * @param {Object} options - {startDate: Date, endDate: Date}
   * @returns {Promise<{steps: number, date: string}>}
   */
  getSteps(options) {
    return new Promise((resolve, reject) => {
      const module = getNativeModule();
      if (!module) {
        reject(new Error('Native module not available'));
        return;
      }
      
      module.getSteps({
        startDate: options.startDate ? options.startDate.toISOString() : new Date().toISOString(),
        endDate: options.endDate ? options.endDate.toISOString() : new Date().toISOString()
      }, (result) => {
        if (result.success) {
          resolve(result.data);
        } else {
          reject(new Error(result.message || 'Failed to get steps'));
        }
      });
    });
  },

  /**
   * 获取心率数据
   * @param {Object} options - {startDate: Date, endDate: Date}
   * @returns {Promise<{heartRate: number, date: string}>}
   */
  getHeartRate(options) {
    return new Promise((resolve, reject) => {
      const module = getNativeModule();
      if (!module) {
        reject(new Error('Native module not available'));
        return;
      }
      
      module.getHeartRate({
        startDate: options.startDate ? options.startDate.toISOString() : new Date().toISOString(),
        endDate: options.endDate ? options.endDate.toISOString() : new Date().toISOString()
      }, (result) => {
        if (result.success) {
          resolve(result.data);
        } else {
          reject(new Error(result.message || 'Failed to get heart rate'));
        }
      });
    });
  },

  /**
   * 获取睡眠数据
   * @param {Object} options - {startDate: Date, endDate: Date}
   * @returns {Promise<{duration: number, quality: string, date: string}>}
   */
  getSleepData(options) {
    return new Promise((resolve, reject) => {
      const module = getNativeModule();
      if (!module) {
        reject(new Error('Native module not available'));
        return;
      }
      
      module.getSleepData({
        startDate: options.startDate ? options.startDate.toISOString() : new Date().toISOString(),
        endDate: options.endDate ? options.endDate.toISOString() : new Date().toISOString()
      }, (result) => {
        if (result.success) {
          resolve(result.data);
        } else {
          reject(new Error(result.message || 'Failed to get sleep data'));
        }
      });
    });
  }
};

/**
 * 运动模块 - 访问运动数据
 */
const Sports = {
  /**
   * 获取运动记录
   * @param {Object} options - {startDate: Date, endDate: Date, type: string}
   * @returns {Promise<Array<{type: string, duration: number, distance: number, calories: number}>>}
   */
  getWorkouts(options) {
    return new Promise((resolve, reject) => {
      const module = getNativeModule();
      if (!module) {
        reject(new Error('Native module not available'));
        return;
      }
      
      module.getWorkouts({
        startDate: options.startDate ? options.startDate.toISOString() : new Date().toISOString(),
        endDate: options.endDate ? options.endDate.toISOString() : new Date().toISOString(),
        type: options.type || 'all'
      }, (result) => {
        if (result.success) {
          resolve(result.data);
        } else {
          reject(new Error(result.message || 'Failed to get workouts'));
        }
      });
    });
  },

  /**
   * 开始运动记录
   * @param {Object} options - {type: string}
   * @returns {Promise<{workoutId: string}>}
   */
  startWorkout(options) {
    return new Promise((resolve, reject) => {
      const module = getNativeModule();
      if (!module) {
        reject(new Error('Native module not available'));
        return;
      }
      
      module.startWorkout({
        type: options.type || 'running'
      }, (result) => {
        if (result.success) {
          resolve(result.data);
        } else {
          reject(new Error(result.message || 'Failed to start workout'));
        }
      });
    });
  },

  /**
   * 结束运动记录
   * @param {string} workoutId - 运动记录ID
   * @returns {Promise<{summary: Object}>}
   */
  stopWorkout(workoutId) {
    return new Promise((resolve, reject) => {
      const module = getNativeModule();
      if (!module) {
        reject(new Error('Native module not available'));
        return;
      }
      
      module.stopWorkout({
        workoutId: workoutId
      }, (result) => {
        if (result.success) {
          resolve(result.data);
        } else {
          reject(new Error(result.message || 'Failed to stop workout'));
        }
      });
    });
  }
};

/**
 * 日历模块 - 访问系统日历
 */
const Calendar = {
  /**
   * 请求日历权限
   * @returns {Promise<{success: boolean}>}
   */
  requestPermission() {
    return new Promise((resolve, reject) => {
      const module = getNativeModule();
      if (!module) {
        reject(new Error('Native module not available'));
        return;
      }
      
      module.requestCalendarPermission({}, (result) => {
        if (result.success) {
          resolve(result);
        } else {
          reject(new Error(result.message || 'Permission request failed'));
        }
      });
    });
  },

  /**
   * 获取日历事件
   * @param {Object} options - {startDate: Date, endDate: Date, calendarIds: Array<string>}
   * @returns {Promise<Array<{id: string, title: string, startDate: string, endDate: string}>>}
   */
  getEvents(options) {
    return new Promise((resolve, reject) => {
      const module = getNativeModule();
      if (!module) {
        reject(new Error('Native module not available'));
        return;
      }
      
      module.getCalendarEvents({
        startDate: options.startDate ? options.startDate.toISOString() : new Date().toISOString(),
        endDate: options.endDate ? options.endDate.toISOString() : new Date().toISOString(),
        calendarIds: options.calendarIds || []
      }, (result) => {
        if (result.success) {
          resolve(result.data);
        } else {
          reject(new Error(result.message || 'Failed to get events'));
        }
      });
    });
  },

  /**
   * 创建日历事件
   * @param {Object} event - {title: string, startDate: Date, endDate: Date, location: string, notes: string}
   * @returns {Promise<{eventId: string}>}
   */
  createEvent(event) {
    return new Promise((resolve, reject) => {
      const module = getNativeModule();
      if (!module) {
        reject(new Error('Native module not available'));
        return;
      }
      
      module.createCalendarEvent({
        title: event.title,
        startDate: event.startDate ? event.startDate.toISOString() : new Date().toISOString(),
        endDate: event.endDate ? event.endDate.toISOString() : new Date().toISOString(),
        location: event.location || '',
        notes: event.notes || ''
      }, (result) => {
        if (result.success) {
          resolve(result.data);
        } else {
          reject(new Error(result.message || 'Failed to create event'));
        }
      });
    });
  },

  /**
   * 删除日历事件
   * @param {string} eventId - 事件ID
   * @returns {Promise<{success: boolean}>}
   */
  deleteEvent(eventId) {
    return new Promise((resolve, reject) => {
      const module = getNativeModule();
      if (!module) {
        reject(new Error('Native module not available'));
        return;
      }
      
      module.deleteCalendarEvent({
        eventId: eventId
      }, (result) => {
        if (result.success) {
          resolve(result);
        } else {
          reject(new Error(result.message || 'Failed to delete event'));
        }
      });
    });
  }
};

/**
 * 提醒模块 - 访问系统提醒
 */
const Reminder = {
  /**
   * 请求提醒权限
   * @returns {Promise<{success: boolean}>}
   */
  requestPermission() {
    return new Promise((resolve, reject) => {
      const module = getNativeModule();
      if (!module) {
        reject(new Error('Native module not available'));
        return;
      }
      
      module.requestReminderPermission({}, (result) => {
        if (result.success) {
          resolve(result);
        } else {
          reject(new Error(result.message || 'Permission request failed'));
        }
      });
    });
  },

  /**
   * 获取提醒列表
   * @param {Object} options - {completed: boolean}
   * @returns {Promise<Array<{id: string, title: string, dueDate: string, completed: boolean}>>}
   */
  getReminders(options) {
    return new Promise((resolve, reject) => {
      const module = getNativeModule();
      if (!module) {
        reject(new Error('Native module not available'));
        return;
      }
      
      module.getReminders({
        completed: options && options.completed !== undefined ? options.completed : false
      }, (result) => {
        if (result.success) {
          resolve(result.data);
        } else {
          reject(new Error(result.message || 'Failed to get reminders'));
        }
      });
    });
  },

  /**
   * 创建提醒
   * @param {Object} reminder - {title: string, dueDate: Date, notes: string, priority: number}
   * @returns {Promise<{reminderId: string}>}
   */
  createReminder(reminder) {
    return new Promise((resolve, reject) => {
      const module = getNativeModule();
      if (!module) {
        reject(new Error('Native module not available'));
        return;
      }
      
      module.createReminder({
        title: reminder.title,
        dueDate: reminder.dueDate ? reminder.dueDate.toISOString() : null,
        notes: reminder.notes || '',
        priority: reminder.priority || 0
      }, (result) => {
        if (result.success) {
          resolve(result.data);
        } else {
          reject(new Error(result.message || 'Failed to create reminder'));
        }
      });
    });
  },

  /**
   * 更新提醒
   * @param {string} reminderId - 提醒ID
   * @param {Object} updates - 更新的字段
   * @returns {Promise<{success: boolean}>}
   */
  updateReminder(reminderId, updates) {
    return new Promise((resolve, reject) => {
      const module = getNativeModule();
      if (!module) {
        reject(new Error('Native module not available'));
        return;
      }
      
      module.updateReminder({
        reminderId: reminderId,
        ...updates
      }, (result) => {
        if (result.success) {
          resolve(result);
        } else {
          reject(new Error(result.message || 'Failed to update reminder'));
        }
      });
    });
  },

  /**
   * 删除提醒
   * @param {string} reminderId - 提醒ID
   * @returns {Promise<{success: boolean}>}
   */
  deleteReminder(reminderId) {
    return new Promise((resolve, reject) => {
      const module = getNativeModule();
      if (!module) {
        reject(new Error('Native module not available'));
        return;
      }
      
      module.deleteReminder({
        reminderId: reminderId
      }, (result) => {
        if (result.success) {
          resolve(result);
        } else {
          reject(new Error(result.message || 'Failed to delete reminder'));
        }
      });
    });
  }
};

// 导出API
export default {
  Health,
  Sports,
  Calendar,
  Reminder
};

// 兼容CommonJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Health,
    Sports,
    Calendar,
    Reminder
  };
}
