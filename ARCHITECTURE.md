# uni-mobile-bridge 架构说明

## 项目结构

```
uni-mobile-bridge/
├── js-sdk/                      # JavaScript SDK
│   ├── index.js                 # 主入口文件，提供统一的API接口
│   └── index.d.ts               # TypeScript 类型定义
├── android/                     # Android 原生实现
│   ├── build.gradle             # Gradle 构建配置
│   └── src/main/
│       ├── AndroidManifest.xml  # Android 权限配置
│       └── java/com/xingangtech/unimobilebridge/
│           └── UnimobileBridgeModule.java  # Android 原生模块
├── ios/                         # iOS 原生实现
│   ├── UnimobileBridgeModule.h  # iOS 模块头文件
│   ├── UnimobileBridgeModule.m  # iOS 模块实现
│   └── UnimobileBridgeModule.podspec  # CocoaPods 配置
├── harmony/                     # HarmonyOS 原生实现
│   ├── oh-package.json5         # HarmonyOS 包配置
│   └── src/main/ets/
│       ├── UnimobileBridgeModule.ets  # HarmonyOS 模块实现
│       └── types.ets            # 类型定义
├── examples/                    # 使用示例
│   ├── README.md                # 示例说明
│   └── basic-example.vue        # 基础示例
├── DOCS.md                      # 完整的 API 文档
├── README.md                    # 项目说明
├── CHANGELOG.md                 # 更新日志
├── CONTRIBUTING.md              # 贡献指南
├── LICENSE                      # MIT 许可证
└── package.json                 # NPM 包配置
```

## 技术架构

### 1. JavaScript SDK 层

JavaScript SDK 是整个组件的入口，提供统一的 API 接口。它负责：

- 调用原生模块
- 参数格式化和校验
- Promise 封装
- 错误处理

**核心代码结构：**

```javascript
const MODULE_NAME = 'UnimobileBridgeModule';

function getNativeModule() {
  if (typeof uni !== 'undefined' && uni.requireNativePlugin) {
    return uni.requireNativePlugin(MODULE_NAME);
  }
  return null;
}

// 每个功能模块都遵循相同的模式
const Health = {
  async requestPermissions(permissions) {
    // 调用原生模块
    // 返回 Promise
  }
}
```

### 2. 原生层实现

#### Android 实现

使用 uni-app 的原生插件开发规范：

- 继承 `UniModule` 基类
- 使用 `@UniJSMethod` 注解标记方法
- 通过 `UniJSCallback` 回调结果

**核心技术：**
- HealthConnect API / Google Fit API (健康数据)
- Android Calendar Provider (日历)
- Android Reminder API (提醒)
- 运动传感器 API

#### iOS 实现

使用 uni-app 的 iOS 原生插件开发规范：

- 继承 `DCUniModule` 基类
- 使用 `DCUniModuleCallback` 回调结果

**核心技术：**
- HealthKit (健康数据)
- EventKit (日历和提醒)
- CoreMotion (运动数据)

#### HarmonyOS 实现

使用 ArkTS 语言开发：

- 实现统一的模块接口
- 使用 HarmonyOS 的原生 API

**核心技术：**
- Health Kit (健康数据)
- Calendar API (日历)
- Reminder API (提醒)

### 3. 跨平台兼容性

组件通过以下方式实现跨平台兼容：

1. **统一的 API 接口**：JavaScript 层提供统一的方法签名
2. **平台检测**：自动检测运行平台，加载对应的原生模块
3. **错误处理**：统一的错误处理和回调机制
4. **数据格式化**：统一的日期、时间等数据格式

## 数据流

```
┌─────────────────┐
│   Vue 组件      │
│   (用户代码)    │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  JavaScript SDK │
│  (js-sdk/)      │
│  - 参数验证     │
│  - Promise封装  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  uni-app Bridge │
│  (uni 提供)     │
└────────┬────────┘
         │
    ┌────┴────┬────────┬──────────┐
    ↓         ↓        ↓          ↓
┌────────┐┌──────┐┌─────────┐
│Android ││ iOS  ││HarmonyOS│
│Native  ││Native││ Native  │
└───┬────┘└──┬───┘└────┬────┘
    │        │         │
    ↓        ↓         ↓
┌────────┐┌──────┐┌─────────┐
│系统API ││系统  ││ 系统    │
│        ││API   ││ API     │
└────────┘└──────┘└─────────┘
```

## 权限管理

### Android

在 `AndroidManifest.xml` 中声明权限：
```xml
<uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />
<uses-permission android:name="android.permission.BODY_SENSORS" />
<uses-permission android:name="android.permission.READ_CALENDAR" />
<uses-permission android:name="android.permission.WRITE_CALENDAR" />
```

运行时权限请求通过原生代码实现。

### iOS

在 `Info.plist` 中添加权限说明：
```xml
<key>NSHealthShareUsageDescription</key>
<string>需要访问您的健康数据</string>
```

通过 HealthKit 和 EventKit 的 API 请求权限。

### HarmonyOS

在 `module.json5` 中声明权限：
```json
{
  "requestPermissions": [
    {"name": "ohos.permission.ACTIVITY_MOTION"}
  ]
}
```

## API 设计原则

1. **一致性**：所有 API 使用相同的调用模式
2. **Promise 化**：所有异步操作返回 Promise
3. **错误优先**：统一的错误处理机制
4. **类型安全**：完整的 TypeScript 类型定义
5. **向后兼容**：遵循语义化版本控制

## 扩展指南

### 添加新功能

1. 在 `js-sdk/index.js` 中添加新的 API 方法
2. 在 `js-sdk/index.d.ts` 中添加类型定义
3. 在各平台的原生代码中实现对应方法：
   - Android: `UnimobileBridgeModule.java`
   - iOS: `UnimobileBridgeModule.m`
   - HarmonyOS: `UnimobileBridgeModule.ets`
4. 更新文档和示例

### 示例：添加血压监测功能

**1. JavaScript SDK (js-sdk/index.js):**
```javascript
const Health = {
  // ... 现有方法
  
  async getBloodPressure(options) {
    return new Promise((resolve, reject) => {
      const module = getNativeModule();
      if (!module) {
        reject(new Error('Native module not available'));
        return;
      }
      
      module.getBloodPressure(options, (result) => {
        if (result.success) {
          resolve(result.data);
        } else {
          reject(new Error(result.message));
        }
      });
    });
  }
}
```

**2. TypeScript 定义 (js-sdk/index.d.ts):**
```typescript
export namespace Health {
  interface BloodPressureData {
    systolic: number;
    diastolic: number;
    date: string;
  }
  
  export function getBloodPressure(options: DateRangeOptions): Promise<BloodPressureData>;
}
```

**3. Android 实现:**
```java
@UniJSMethod(uiThread = false)
public void getBloodPressure(JSONObject options, UniJSCallback callback) {
    // 实现血压数据获取
}
```

**4. iOS 实现:**
```objective-c
- (void)getBloodPressure:(NSDictionary *)options callback:(DCUniModuleCallback)callback {
    // 实现血压数据获取
}
```

**5. HarmonyOS 实现:**
```typescript
public async getBloodPressure(options: any): Promise<any> {
  // 实现血压数据获取
}
```

## 性能优化

1. **延迟加载**：原生模块按需加载
2. **缓存机制**：适当缓存权限状态等信息
3. **批量操作**：支持批量查询以减少跨平台调用次数
4. **异步处理**：所有耗时操作都在后台线程执行

## 测试策略

1. **单元测试**：测试 JavaScript SDK 的逻辑
2. **集成测试**：测试 JavaScript 和原生层的交互
3. **真机测试**：在真实设备上测试所有功能
4. **兼容性测试**：在不同版本的系统上测试

## 发布流程

1. 更新版本号 (package.json)
2. 更新 CHANGELOG.md
3. 运行测试
4. 构建打包
5. 发布到 npm
6. 发布到 DCloud 插件市场
7. 创建 GitHub Release

## 故障排查

### 常见问题

1. **模块加载失败**
   - 检查是否在 App 环境运行
   - 检查原生插件是否正确配置

2. **权限被拒绝**
   - 检查权限配置
   - 引导用户到设置中授权

3. **数据获取失败**
   - 检查日期范围是否合理
   - 检查系统 API 的可用性

## 参考资料

- [uni-app 原生插件开发文档](https://nativesupport.dcloud.net.cn/)
- [Android HealthConnect API](https://developer.android.com/health-and-fitness)
- [iOS HealthKit](https://developer.apple.com/documentation/healthkit)
- [HarmonyOS Health Kit](https://developer.harmonyos.com/)

---

如有问题，请查看 [完整文档](./DOCS.md) 或提交 [Issue](https://github.com/xingangtech/uni-mobile-bridge/issues)。
