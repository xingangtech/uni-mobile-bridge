# uni-mobile-bridge 使用文档

## 简介

uni-mobile-bridge 是一个为 uniapp 设计的强大组件,旨在打通软件和硬件之间的信息壁垒,为开发者提供一站式的解决方案,轻松访问原生系统的核心功能。

## 支持平台

- ✅ Android
- ✅ iOS
- ✅ HarmonyOS (鸿蒙)

## 核心功能

### 1. 健康模块 (Health)
访问系统健康数据,包括步数、心率、睡眠等。

### 2. 运动模块 (Sports)
管理运动记录,支持运动追踪和数据分析。

### 3. 日历模块 (Calendar)
管理系统日历事件,创建、读取、删除日历项。

### 4. 提醒模块 (Reminder)
管理系统提醒事项,支持创建、更新、删除提醒。

## 安装

### 方式一：npm 安装

```bash
npm install uni-mobile-bridge --save
```

### 方式二：手动集成

1. 下载本项目
2. 将项目复制到 `uni_modules` 目录
3. 在 HBuilderX 中右键点击 `uni_modules` -> 导入插件

## 快速开始

### 导入模块

```javascript
import UnimobileBridge from '@/uni_modules/uni-mobile-bridge/js-sdk/index.js'

const { Health, Sports, Calendar, Reminder } = UnimobileBridge
```

## API 文档

### 健康模块 (Health)

#### 1. 请求健康数据权限

```javascript
// 请求权限
const permissions = ['steps', 'heartRate', 'sleep']
Health.requestPermissions(permissions)
  .then(result => {
    console.log('授权成功:', result.granted)
  })
  .catch(error => {
    console.error('授权失败:', error)
  })
```

#### 2. 获取步数数据

```javascript
// 获取今天的步数
Health.getSteps({
  startDate: new Date(),
  endDate: new Date()
})
  .then(data => {
    console.log('今日步数:', data.steps)
  })
  .catch(error => {
    console.error('获取步数失败:', error)
  })
```

#### 3. 获取心率数据

```javascript
// 获取心率
Health.getHeartRate({
  startDate: new Date(),
  endDate: new Date()
})
  .then(data => {
    console.log('当前心率:', data.heartRate)
  })
  .catch(error => {
    console.error('获取心率失败:', error)
  })
```

#### 4. 获取睡眠数据

```javascript
// 获取睡眠数据
Health.getSleepData({
  startDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // 昨天
  endDate: new Date()
})
  .then(data => {
    console.log('睡眠时长:', data.duration, '分钟')
    console.log('睡眠质量:', data.quality)
  })
  .catch(error => {
    console.error('获取睡眠数据失败:', error)
  })
```

### 运动模块 (Sports)

#### 1. 获取运动记录

```javascript
// 获取最近7天的运动记录
const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
const endDate = new Date()

Sports.getWorkouts({
  startDate: startDate,
  endDate: endDate,
  type: 'running' // 或 'walking', 'cycling', 'swimming' 等
})
  .then(workouts => {
    console.log('运动记录:', workouts)
  })
  .catch(error => {
    console.error('获取运动记录失败:', error)
  })
```

#### 2. 开始运动记录

```javascript
// 开始跑步
Sports.startWorkout({ type: 'running' })
  .then(result => {
    console.log('运动已开始，ID:', result.workoutId)
    // 保存 workoutId 用于后续停止
  })
  .catch(error => {
    console.error('开始运动失败:', error)
  })
```

#### 3. 结束运动记录

```javascript
// 结束运动
const workoutId = 'workout_1234567890'
Sports.stopWorkout(workoutId)
  .then(result => {
    console.log('运动汇总:', result.summary)
    console.log('时长:', result.summary.duration, '秒')
    console.log('距离:', result.summary.distance, '米')
    console.log('卡路里:', result.summary.calories)
  })
  .catch(error => {
    console.error('结束运动失败:', error)
  })
```

### 日历模块 (Calendar)

#### 1. 请求日历权限

```javascript
// 请求日历权限
Calendar.requestPermission()
  .then(result => {
    console.log('日历权限已授予')
  })
  .catch(error => {
    console.error('日历权限被拒绝:', error)
  })
```

#### 2. 获取日历事件

```javascript
// 获取本周的日历事件
const startDate = new Date()
const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

Calendar.getEvents({
  startDate: startDate,
  endDate: endDate
})
  .then(events => {
    console.log('日历事件:', events)
    events.forEach(event => {
      console.log(`${event.title} - ${event.startDate}`)
    })
  })
  .catch(error => {
    console.error('获取日历事件失败:', error)
  })
```

#### 3. 创建日历事件

```javascript
// 创建新的日历事件
const event = {
  title: '团队会议',
  startDate: new Date(2024, 0, 15, 10, 0), // 2024年1月15日 10:00
  endDate: new Date(2024, 0, 15, 11, 0),   // 2024年1月15日 11:00
  location: '会议室A',
  notes: '讨论Q1计划'
}

Calendar.createEvent(event)
  .then(result => {
    console.log('事件已创建，ID:', result.eventId)
  })
  .catch(error => {
    console.error('创建事件失败:', error)
  })
```

#### 4. 删除日历事件

```javascript
// 删除日历事件
const eventId = 'event_1234567890'
Calendar.deleteEvent(eventId)
  .then(result => {
    console.log('事件已删除')
  })
  .catch(error => {
    console.error('删除事件失败:', error)
  })
```

### 提醒模块 (Reminder)

#### 1. 请求提醒权限

```javascript
// 请求提醒权限
Reminder.requestPermission()
  .then(result => {
    console.log('提醒权限已授予')
  })
  .catch(error => {
    console.error('提醒权限被拒绝:', error)
  })
```

#### 2. 获取提醒列表

```javascript
// 获取未完成的提醒
Reminder.getReminders({ completed: false })
  .then(reminders => {
    console.log('待办提醒:', reminders)
    reminders.forEach(reminder => {
      console.log(`${reminder.title} - 截止: ${reminder.dueDate}`)
    })
  })
  .catch(error => {
    console.error('获取提醒失败:', error)
  })
```

#### 3. 创建提醒

```javascript
// 创建新提醒
const reminder = {
  title: '完成项目报告',
  dueDate: new Date(2024, 0, 20, 17, 0), // 2024年1月20日 17:00
  notes: '需要包含Q4数据分析',
  priority: 5 // 0-5，5为最高优先级
}

Reminder.createReminder(reminder)
  .then(result => {
    console.log('提醒已创建，ID:', result.reminderId)
  })
  .catch(error => {
    console.error('创建提醒失败:', error)
  })
```

#### 4. 更新提醒

```javascript
// 更新提醒（标记为完成）
const reminderId = 'reminder_1234567890'
Reminder.updateReminder(reminderId, {
  completed: true
})
  .then(result => {
    console.log('提醒已更新')
  })
  .catch(error => {
    console.error('更新提醒失败:', error)
  })
```

#### 5. 删除提醒

```javascript
// 删除提醒
const reminderId = 'reminder_1234567890'
Reminder.deleteReminder(reminderId)
  .then(result => {
    console.log('提醒已删除')
  })
  .catch(error => {
    console.error('删除提醒失败:', error)
  })
```

## 完整示例

```vue
<template>
  <view class="container">
    <view class="section">
      <text class="title">健康数据</text>
      <button @click="getHealthData">获取今日步数</button>
      <text class="result">{{ healthResult }}</text>
    </view>

    <view class="section">
      <text class="title">运动记录</text>
      <button @click="startWorkoutHandler">开始跑步</button>
      <button @click="stopWorkoutHandler">结束跑步</button>
      <text class="result">{{ sportsResult }}</text>
    </view>

    <view class="section">
      <text class="title">日历管理</text>
      <button @click="createEventHandler">创建日历事件</button>
      <text class="result">{{ calendarResult }}</text>
    </view>

    <view class="section">
      <text class="title">提醒事项</text>
      <button @click="createReminderHandler">创建提醒</button>
      <text class="result">{{ reminderResult }}</text>
    </view>
  </view>
</template>

<script>
import UnimobileBridge from '@/uni_modules/uni-mobile-bridge/js-sdk/index.js'

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
    async getHealthData() {
      try {
        // 先请求权限
        await Health.requestPermissions(['steps'])
        
        // 获取步数
        const data = await Health.getSteps({
          startDate: new Date(),
          endDate: new Date()
        })
        
        this.healthResult = `今日步数: ${data.steps}`
      } catch (error) {
        this.healthResult = `错误: ${error.message}`
      }
    },
    
    async startWorkoutHandler() {
      try {
        const result = await Sports.startWorkout({ type: 'running' })
        this.currentWorkoutId = result.workoutId
        this.sportsResult = '运动已开始'
      } catch (error) {
        this.sportsResult = `错误: ${error.message}`
      }
    },
    
    async stopWorkoutHandler() {
      try {
        if (!this.currentWorkoutId) {
          this.sportsResult = '请先开始运动'
          return
        }
        
        const result = await Sports.stopWorkout(this.currentWorkoutId)
        this.sportsResult = `运动已结束\n时长: ${result.summary.duration}秒\n距离: ${result.summary.distance}米`
        this.currentWorkoutId = null
      } catch (error) {
        this.sportsResult = `错误: ${error.message}`
      }
    },
    
    async createEventHandler() {
      try {
        // 先请求权限
        await Calendar.requestPermission()
        
        // 创建事件
        const event = {
          title: '测试事件',
          startDate: new Date(),
          endDate: new Date(Date.now() + 60 * 60 * 1000),
          location: '测试地点'
        }
        
        const result = await Calendar.createEvent(event)
        this.calendarResult = `事件已创建，ID: ${result.eventId}`
      } catch (error) {
        this.calendarResult = `错误: ${error.message}`
      }
    },
    
    async createReminderHandler() {
      try {
        // 先请求权限
        await Reminder.requestPermission()
        
        // 创建提醒
        const reminder = {
          title: '测试提醒',
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
          notes: '这是一个测试提醒',
          priority: 3
        }
        
        const result = await Reminder.createReminder(reminder)
        this.reminderResult = `提醒已创建，ID: ${result.reminderId}`
      } catch (error) {
        this.reminderResult = `错误: ${error.message}`
      }
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
}

.section {
  margin-bottom: 30px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

button {
  margin: 5px 0;
}

.result {
  margin-top: 10px;
  color: #666;
}
</style>
```

## 权限配置

### Android

在 `manifest.json` 中添加以下权限：

```json
{
  "permissions": [
    "android.permission.ACTIVITY_RECOGNITION",
    "android.permission.BODY_SENSORS",
    "android.permission.READ_CALENDAR",
    "android.permission.WRITE_CALENDAR"
  ]
}
```

### iOS

在 `Info.plist` 中添加以下权限说明：

```xml
<key>NSHealthShareUsageDescription</key>
<string>需要访问您的健康数据</string>
<key>NSHealthUpdateUsageDescription</key>
<string>需要更新您的健康数据</string>
<key>NSCalendarsUsageDescription</key>
<string>需要访问您的日历</string>
<key>NSRemindersUsageDescription</key>
<string>需要访问您的提醒事项</string>
<key>NSMotionUsageDescription</key>
<string>需要访问您的运动数据</string>
```

### HarmonyOS

在 `module.json5` 中添加以下权限：

```json
{
  "requestPermissions": [
    {
      "name": "ohos.permission.ACTIVITY_MOTION"
    },
    {
      "name": "ohos.permission.READ_CALENDAR"
    },
    {
      "name": "ohos.permission.WRITE_CALENDAR"
    }
  ]
}
```

## 注意事项

1. **权限请求**: 在使用任何功能前，务必先请求相应的权限。
2. **平台差异**: 不同平台的 API 实现可能略有差异，请注意处理错误。
3. **数据格式**: 日期统一使用 JavaScript Date 对象。
4. **异步操作**: 所有 API 调用都是异步的，返回 Promise。
5. **错误处理**: 建议使用 try-catch 或 .catch() 处理可能的错误。

## 常见问题

### Q1: 如何判断当前平台是否支持某个功能？

```javascript
// 检查原生模块是否可用
if (typeof uni !== 'undefined' && uni.requireNativePlugin) {
  // 原生功能可用
} else {
  // 原生功能不可用，可能在H5或小程序环境
}
```

### Q2: 权限被拒绝后如何处理？

```javascript
try {
  await Health.requestPermissions(['steps'])
} catch (error) {
  // 引导用户去设置页面开启权限
  uni.showModal({
    title: '权限提示',
    content: '需要健康数据权限才能使用此功能，请在设置中开启',
    success: (res) => {
      if (res.confirm) {
        // 打开应用设置页面
      }
    }
  })
}
```

### Q3: 如何获取历史数据？

```javascript
// 获取过去30天的步数
const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
const endDate = new Date()

Health.getSteps({ startDate, endDate })
  .then(data => {
    console.log('过去30天步数:', data)
  })
```

## 技术支持

- GitHub: https://github.com/xingangtech/uni-mobile-bridge
- Issues: https://github.com/xingangtech/uni-mobile-bridge/issues
- 文档: https://github.com/xingangtech/uni-mobile-bridge/blob/main/DOCS.md

## 许可证

MIT License

Copyright (c) 2024 xingangtech

## 更新日志

查看 [CHANGELOG.md](CHANGELOG.md) 了解版本更新信息。
