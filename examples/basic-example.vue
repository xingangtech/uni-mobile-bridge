<template>
  <view class="container">
    <view class="header">
      <text class="title">uni-mobile-bridge 示例</text>
      <text class="subtitle">跨平台原生功能访问</text>
    </view>

    <!-- 健康模块示例 -->
    <view class="module-section">
      <view class="module-header">
        <text class="module-title">🏥 健康模块</text>
      </view>
      <button class="btn" @click="requestHealthPermissions">请求健康权限</button>
      <button class="btn" @click="getSteps">获取今日步数</button>
      <button class="btn" @click="getHeartRate">获取心率</button>
      <button class="btn" @click="getSleepData">获取睡眠数据</button>
      <view v-if="healthResult" class="result">
        <text>{{ healthResult }}</text>
      </view>
    </view>

    <!-- 运动模块示例 -->
    <view class="module-section">
      <view class="module-header">
        <text class="module-title">🏃 运动模块</text>
      </view>
      <button class="btn" @click="startWorkout">开始运动</button>
      <button class="btn" @click="stopWorkout" :disabled="!currentWorkoutId">结束运动</button>
      <button class="btn" @click="getWorkouts">获取运动记录</button>
      <view v-if="sportsResult" class="result">
        <text>{{ sportsResult }}</text>
      </view>
    </view>

    <!-- 日历模块示例 -->
    <view class="module-section">
      <view class="module-header">
        <text class="module-title">📅 日历模块</text>
      </view>
      <button class="btn" @click="requestCalendarPermission">请求日历权限</button>
      <button class="btn" @click="createEvent">创建日历事件</button>
      <button class="btn" @click="getEvents">获取日历事件</button>
      <view v-if="calendarResult" class="result">
        <text>{{ calendarResult }}</text>
      </view>
    </view>

    <!-- 提醒模块示例 -->
    <view class="module-section">
      <view class="module-header">
        <text class="module-title">⏰ 提醒模块</text>
      </view>
      <button class="btn" @click="requestReminderPermission">请求提醒权限</button>
      <button class="btn" @click="createReminder">创建提醒</button>
      <button class="btn" @click="getReminders">获取提醒列表</button>
      <view v-if="reminderResult" class="result">
        <text>{{ reminderResult }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import UnimobileBridge from '../js-sdk/index.js'

const { Health, Sports, Calendar, Reminder } = UnimobileBridge

export default {
  data() {
    return {
      healthResult: '',
      sportsResult: '',
      calendarResult: '',
      reminderResult: '',
      currentWorkoutId: null
    }
  },

  methods: {
    // 健康模块方法
    async requestHealthPermissions() {
      try {
        const result = await Health.requestPermissions(['steps', 'heartRate', 'sleep'])
        this.healthResult = `权限授予成功: ${JSON.stringify(result.granted)}`
        this.showSuccess('健康权限已授予')
      } catch (error) {
        this.healthResult = `错误: ${error.message}`
        this.showError(error.message)
      }
    },

    async getSteps() {
      try {
        const data = await Health.getSteps({
          startDate: new Date(),
          endDate: new Date()
        })
        this.healthResult = `今日步数: ${data.steps} 步`
        this.showSuccess(`今日步数: ${data.steps}`)
      } catch (error) {
        this.healthResult = `错误: ${error.message}`
        this.showError(error.message)
      }
    },

    async getHeartRate() {
      try {
        const data = await Health.getHeartRate({
          startDate: new Date(),
          endDate: new Date()
        })
        this.healthResult = `当前心率: ${data.heartRate} bpm`
        this.showSuccess(`心率: ${data.heartRate} bpm`)
      } catch (error) {
        this.healthResult = `错误: ${error.message}`
        this.showError(error.message)
      }
    },

    async getSleepData() {
      try {
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
        const data = await Health.getSleepData({
          startDate: yesterday,
          endDate: new Date()
        })
        this.healthResult = `睡眠时长: ${data.duration}分钟\n睡眠质量: ${data.quality}`
        this.showSuccess('睡眠数据获取成功')
      } catch (error) {
        this.healthResult = `错误: ${error.message}`
        this.showError(error.message)
      }
    },

    // 运动模块方法
    async startWorkout() {
      try {
        const result = await Sports.startWorkout({ type: 'running' })
        this.currentWorkoutId = result.workoutId
        this.sportsResult = `运动已开始\nID: ${result.workoutId}`
        this.showSuccess('运动开始')
      } catch (error) {
        this.sportsResult = `错误: ${error.message}`
        this.showError(error.message)
      }
    },

    async stopWorkout() {
      try {
        if (!this.currentWorkoutId) {
          this.showError('请先开始运动')
          return
        }

        const result = await Sports.stopWorkout(this.currentWorkoutId)
        const summary = result.summary
        this.sportsResult = `运动已结束\n时长: ${summary.duration}秒\n距离: ${summary.distance}米\n卡路里: ${summary.calories}`
        this.currentWorkoutId = null
        this.showSuccess('运动结束')
      } catch (error) {
        this.sportsResult = `错误: ${error.message}`
        this.showError(error.message)
      }
    },

    async getWorkouts() {
      try {
        const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        const endDate = new Date()
        const workouts = await Sports.getWorkouts({
          startDate,
          endDate,
          type: 'all'
        })
        this.sportsResult = `获取到 ${workouts.length} 条运动记录`
        this.showSuccess(`找到 ${workouts.length} 条记录`)
      } catch (error) {
        this.sportsResult = `错误: ${error.message}`
        this.showError(error.message)
      }
    },

    // 日历模块方法
    async requestCalendarPermission() {
      try {
        await Calendar.requestPermission()
        this.calendarResult = '日历权限已授予'
        this.showSuccess('日历权限已授予')
      } catch (error) {
        this.calendarResult = `错误: ${error.message}`
        this.showError(error.message)
      }
    },

    async createEvent() {
      try {
        const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
        const event = {
          title: '测试日历事件',
          startDate: tomorrow,
          endDate: new Date(tomorrow.getTime() + 60 * 60 * 1000),
          location: '测试地点',
          notes: '这是一个测试事件'
        }

        const result = await Calendar.createEvent(event)
        this.calendarResult = `事件已创建\nID: ${result.eventId}`
        this.showSuccess('日历事件已创建')
      } catch (error) {
        this.calendarResult = `错误: ${error.message}`
        this.showError(error.message)
      }
    },

    async getEvents() {
      try {
        const startDate = new Date()
        const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        const events = await Calendar.getEvents({ startDate, endDate })
        this.calendarResult = `获取到 ${events.length} 个日历事件`
        this.showSuccess(`找到 ${events.length} 个事件`)
      } catch (error) {
        this.calendarResult = `错误: ${error.message}`
        this.showError(error.message)
      }
    },

    // 提醒模块方法
    async requestReminderPermission() {
      try {
        await Reminder.requestPermission()
        this.reminderResult = '提醒权限已授予'
        this.showSuccess('提醒权限已授予')
      } catch (error) {
        this.reminderResult = `错误: ${error.message}`
        this.showError(error.message)
      }
    },

    async createReminder() {
      try {
        const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
        const reminder = {
          title: '测试提醒',
          dueDate: tomorrow,
          notes: '这是一个测试提醒',
          priority: 3
        }

        const result = await Reminder.createReminder(reminder)
        this.reminderResult = `提醒已创建\nID: ${result.reminderId}`
        this.showSuccess('提醒已创建')
      } catch (error) {
        this.reminderResult = `错误: ${error.message}`
        this.showError(error.message)
      }
    },

    async getReminders() {
      try {
        const reminders = await Reminder.getReminders({ completed: false })
        this.reminderResult = `获取到 ${reminders.length} 个待办提醒`
        this.showSuccess(`找到 ${reminders.length} 个提醒`)
      } catch (error) {
        this.reminderResult = `错误: ${error.message}`
        this.showError(error.message)
      }
    },

    // 工具方法
    showSuccess(message) {
      uni.showToast({
        title: message,
        icon: 'success'
      })
    },

    showError(message) {
      uni.showToast({
        title: message,
        icon: 'none'
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40rpx 30rpx;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
}

.title {
  font-size: 48rpx;
  font-weight: bold;
  color: #ffffff;
  display: block;
  margin-bottom: 10rpx;
}

.subtitle {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
  display: block;
}

.module-section {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.module-header {
  margin-bottom: 20rpx;
}

.module-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333333;
}

.btn {
  margin-bottom: 20rpx;
  border-radius: 10rpx;
  font-size: 28rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: none;
}

.btn:disabled {
  opacity: 0.5;
}

.result {
  margin-top: 20rpx;
  padding: 20rpx;
  background-color: #f8f9fa;
  border-radius: 10rpx;
  border-left: 4rpx solid #667eea;
}

.result text {
  font-size: 26rpx;
  color: #666666;
  line-height: 1.6;
}
</style>
