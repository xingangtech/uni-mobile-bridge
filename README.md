# uni-mobile-bridge

**uniapp 多端硬件系统数据打通组件**

`uni-mobile-bridge` 是一个为 uniapp 设计的强大组件,旨在打通软件和硬件之间的信息壁垒,为开发者提供一站式的解决方案,轻松访问原生系统的核心功能,包括但不限于健康、运动、日历、提醒等。

该组件经过精心设计,实现了跨平台的高度兼容性,支持 **Android**、**iOS** 和 **鸿蒙 (HarmonyOS)**,并对不同平台的 API 进行了统一封装,让开发者可以用一套代码实现多端部署。

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/xingangtech/uni-mobile-bridge)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## ✨ 主要特性

- **跨平台兼容**: 一套代码,完美运行于 Android、iOS 和鸿蒙系统。
- **丰富的功能模块**: 全面覆盖健康、运动、日历、提醒、权限管理等核心系统功能。
- **统一的 API 设计**: 简洁、易用的 API,屏蔽了底层平台的复杂性。
- **强大的权限管理**: 智能的权限申请和引导流程,提升用户体验。
- **TypeScript 支持**: 提供完整的 TypeScript 类型定义,增强代码健壮性。
- **高性能与缓存**: 内置缓存机制,优化数据读取性能。
- **模块化设计**: 按需引入,灵活组合,减小应用体积。

## 📦 安装与使用

1.  **下载组件**: 将 `uni-system-bridge` 目录复制到你的 uniapp 项目的 `uni_modules` 目录下。

2.  **引入组件**: 在需要使用的页面或组件中,通过 `import` 引入。

    ```javascript
    import SystemBridge from 
    '@/uni_modules/uni-system-bridge/index.js
    ';
    ```

3.  **调用 API**: 开始使用 `SystemBridge` 提供的丰富功能。

    ```javascript
    // 示例: 检查相机权限
    async function checkCamera() {
      const status = await SystemBridge.checkPermission(
    'camera
    ');
      console.log(
    '相机权限状态:
    ', status);
    }
    ```

## 🔧 平台配置

为了确保组件在各个平台上正常工作,需要进行一些原生项目的配置。

### Android

在 `manifest.json` 的 `app-plus` -> `distribute` -> `android` -> `permissions` 节点下,添加所需的权限。以下是一个常用权限的示例:

```json
"permissions": [
  "<uses-permission android:name=\"android.permission.CAMERA\"/>",
  "<uses-permission android:name=\"android.permission.ACCESS_FINE_LOCATION\"/>",
  "<uses-permission android:name=\"android.permission.READ_CALENDAR\"/>",
  "<uses-permission android:name=\"android.permission.WRITE_CALENDAR\"/>",
  "<uses-permission android:name=\"android.permission.ACTIVITY_RECOGNITION\"/>",
  "<uses-permission android:name=\"android.permission.health.READ_STEPS\"/>"
]
```

**注意**: 对于健康数据,需要集成 Google 的 **Health Connect**。这通常需要一个原生插件来桥接。

### iOS

在 `manifest.json` 的 `app-plus` -> `distribute` -> `ios` -> `privacyDescription` 节点下,添加权限描述。

```json
"privacyDescription": {
  "NSCameraUsageDescription": "需要使用相机权限进行拍照",
  "NSHealthShareUsageDescription": "需要读取您的健康数据",
  "NSHealthUpdateUsageDescription": "需要写入您的健康数据",
  "NSCalendarsUsageDescription": "需要访问您的日历"
}
```

同时,需要开启 **HealthKit** 的能力。在 `manifest.json` 的 `app-plus` -> `distribute` -> `ios` -> `capabilities` 节点下配置:

```json
"capabilities": {
  "entitlements": {
    "com.apple.developer.healthkit": true,
    "com.apple.developer.healthkit.access": []
  }
}
```

### 鸿蒙 (HarmonyOS)

在 `module.json5` 文件中,添加所需的权限声明。

```json
{
  "module": {
    "requestPermissions": [
      {
        "name": "ohos.permission.CAMERA"
      },
      {
        "name": "ohos.permission.LOCATION"
      },
      {
        "name": "ohos.permission.HEALTH_DATA"
      }
    ]
  }
}
```

## 📖 API 文档

### 权限管理 (`permissionManager`)

| 方法名 | 参数 | 返回值 | 描述 |
| :--- | :--- | :--- | :--- |
| `checkPermission` | `(permissionCode: string)` | `Promise<PermissionStatus>` | 检查单个权限的状态 |
| `requestPermission` | `(permissionCode: string, options?: object)` | `Promise<PermissionResult>` | 申请单个权限 |
| `requestPermissions` | `(permissionCodes: string[], options?: object)` | `Promise<BatchPermissionResult>` | 批量申请权限 |
| `openSystemSetting` | `()` | `Promise<boolean>` | 打开系统权限设置页面 |

**示例:**

```javascript
async function requestHealthPermission() {
  const result = await SystemBridge.requestPermission(
'healthRead
', {
    showGuide: true, // 如果被拒绝,显示引导弹窗
    guideTitle: 
'需要健康数据权限
',
    guideContent: 
'用于展示您的步数和心率信息。
'
  });
  if (result.authorized) {
    console.log(
'健康数据权限已获取
');
  }
}
```

### 健康数据 (`healthManager`)

| 方法名 | 参数 | 返回值 | 描述 |
| :--- | :--- | :--- | :--- |
| `readHealthData` | `(dataType: string, options: HealthQueryOptions)` | `Promise<HealthDataRecord[]>` | 读取健康数据,如步数、心率等 |
| `writeHealthData` | `(dataType: string, value: number, options: HealthWriteOptions)` | `Promise<OperationResult>` | 写入健康数据 |
| `getHealthStatistics` | `(options: StatisticsOptions)` | `Promise<StatisticsResult>` | 获取健康数据的统计信息 |

**示例:**

```javascript
async function getTodaySteps() {
  try {
    const stepsData = await SystemBridge.readHealthData(
'steps
', {
      timeRange: 
'today
' // 获取今天的数据
    });
    const totalSteps = stepsData.reduce((sum, record) => sum + record.value, 0);
    console.log(`今日总步数: ${totalSteps}`);
  } catch (error) {
    console.error(
'读取步数失败:
', error);
  }
}
```

### 运动数据 (`fitnessManager`)

| 方法名 | 参数 | 返回值 | 描述 |
| :--- | :--- | :--- | :--- |
| `startExerciseSession` | `(exerciseType: string)` | `Promise<string>` | 开始一个运动会话,返回会话 ID |
| `endExerciseSession` | `(sessionId: string, data: object)` | `Promise<OperationResult>` | 结束一个运动会话并保存数据 |
| `getExerciseSessions` | `(options: HealthQueryOptions)` | `Promise<ExerciseSessionRecord[]>` | 获取历史运动记录 |

**示例:**

```javascript
let currentSessionId = null;

async function startRunning() {
  currentSessionId = await SystemBridge.startExerciseSession(
'running
');
  console.log(
'开始跑步,会话ID:
', currentSessionId);
}

async function endRunning() {
  if (currentSessionId) {
    await SystemBridge.endExerciseSession(currentSessionId, {
      distance: 5000, // 5公里
      calories: 350   // 消耗350千卡
    });
    console.log(
'跑步结束并已保存
');
  }
}
```

### 日历与提醒 (`calendarManager`, `alarmManager`)

| 方法名 | 参数 | 返回值 | 描述 |
| :--- | :--- | :--- | :--- |
| `createCalendarEvent` | `(options: CalendarEventOptions)` | `Promise<string>` | 创建一个日历事件 |
| `getCalendarEvents` | `(options: HealthQueryOptions)` | `Promise<CalendarEventRecord[]>` | 获取日历事件列表 |
| `setAlarm` | `(options: AlarmOptions)` | `Promise<string>` | 设置一个闹钟 |
| `createReminder` | `(options: ReminderOptions)` | `Promise<string>` | 创建一个提醒事项 |

**示例:**

```javascript
async function addMeetingToCalendar() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0);

  const eventId = await SystemBridge.createCalendarEvent({
    title: 
'团队会议
',
    startTime: tomorrow.getTime(),
    endTime: tomorrow.getTime() + 60 * 60 * 1000, // 1小时
    location: 
'线上会议室
',
    alarms: [{ minutesBefore: 30 }] // 提前30分钟提醒
  });
  console.log(`会议已添加到日历,事件ID: ${eventId}`);
}
```

## 🤝 贡献

我们欢迎任何形式的贡献! 如果您发现任何错误、有功能建议或希望改进代码,请随时:

1.  Fork 本仓库
2.  创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3.  提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4.  推送到分支 (`git push origin feature/AmazingFeature`)
5.  开启一个 Pull Request

## 📜 许可证

该项目基于 [MIT 许可证](https://opensource.org/licenses/MIT) 发布。