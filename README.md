# uni-mobile-bridge

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/xingangtech/uni-mobile-bridge)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/xingangtech/uni-mobile-bridge/blob/main/LICENSE)
[![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS%20%7C%20HarmonyOS-lightgrey.svg)](https://github.com/xingangtech/uni-mobile-bridge)

uni-mobile-bridge 是一个为 uniapp 设计的强大组件,旨在打通软件和硬件之间的信息壁垒,为开发者提供一站式的解决方案,轻松访问原生系统的核心功能,包括但不限于健康、运动、日历、提醒等。该组件经过精心设计,实现了跨平台的高度兼容性,支持 Android、iOS 和 鸿蒙 (HarmonyOS),并对不同平台的 API 进行了统一封装,让开发者可以用一套代码实现多端部署。

## ✨ 特性

- 🎯 **统一 API** - 一套代码,多端部署,无需关心平台差异
- 🔐 **权限管理** - 完善的权限请求和管理机制
- 📱 **跨平台支持** - 全面支持 Android、iOS 和 HarmonyOS
- 💪 **TypeScript** - 完整的类型定义,提供更好的开发体验
- 📚 **丰富文档** - 详细的中文文档和使用示例
- 🚀 **高性能** - 原生实现,性能卓越

## 🎯 核心功能

### 健康模块 (Health)
- ✅ 步数统计
- ✅ 心率监测
- ✅ 睡眠分析
- ✅ 卡路里消耗
- ✅ 运动距离

### 运动模块 (Sports)
- ✅ 运动记录追踪
- ✅ 多种运动类型支持
- ✅ 实时运动数据
- ✅ 运动历史查询

### 日历模块 (Calendar)
- ✅ 读取日历事件
- ✅ 创建日历事件
- ✅ 删除日历事件
- ✅ 日历权限管理

### 提醒模块 (Reminder)
- ✅ 创建提醒事项
- ✅ 查询提醒列表
- ✅ 更新提醒状态
- ✅ 删除提醒事项

## 📦 安装

### 方式一：npm 安装

```bash
npm install uni-mobile-bridge --save
```

### 方式二：直接下载

下载本项目,复制到你的 uniapp 项目的 `uni_modules` 目录。

## 🚀 快速开始

### 1. 导入模块

```javascript
import UnimobileBridge from 'uni-mobile-bridge'

const { Health, Sports, Calendar, Reminder } = UnimobileBridge
```

### 2. 获取健康数据

```javascript
// 请求权限
await Health.requestPermissions(['steps'])

// 获取今日步数
const data = await Health.getSteps({
  startDate: new Date(),
  endDate: new Date()
})

console.log('今日步数:', data.steps)
```

### 3. 创建日历事件

```javascript
// 请求权限
await Calendar.requestPermission()

// 创建事件
const event = {
  title: '团队会议',
  startDate: new Date(2024, 0, 15, 10, 0),
  endDate: new Date(2024, 0, 15, 11, 0),
  location: '会议室A'
}

const result = await Calendar.createEvent(event)
console.log('事件ID:', result.eventId)
```

## 📖 文档

- [完整 API 文档](./DOCS.md)
- [使用示例](./examples/)
- [更新日志](./CHANGELOG.md)

## 🔧 平台支持

| 平台 | 版本要求 | 状态 |
|------|---------|------|
| Android | API 21+ | ✅ 支持 |
| iOS | 10.0+ | ✅ 支持 |
| HarmonyOS | 3.0+ | ✅ 支持 |

## 📱 权限配置

### Android (manifest.json)

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

### iOS (Info.plist)

```xml
<key>NSHealthShareUsageDescription</key>
<string>需要访问您的健康数据</string>
<key>NSCalendarsUsageDescription</key>
<string>需要访问您的日历</string>
<key>NSRemindersUsageDescription</key>
<string>需要访问您的提醒事项</string>
```

### HarmonyOS (module.json5)

```json
{
  "requestPermissions": [
    {"name": "ohos.permission.ACTIVITY_MOTION"},
    {"name": "ohos.permission.READ_CALENDAR"},
    {"name": "ohos.permission.WRITE_CALENDAR"}
  ]
}
```

## 💻 开发

```bash
# 克隆项目
git clone https://github.com/xingangtech/uni-mobile-bridge.git

# 查看文档
cd uni-mobile-bridge
cat DOCS.md
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request!

## 📄 许可证

[MIT License](LICENSE)

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者!

## 📮 联系我们

- GitHub: https://github.com/xingangtech/uni-mobile-bridge
- Issues: https://github.com/xingangtech/uni-mobile-bridge/issues

---

Made with ❤️ by xingangtech
