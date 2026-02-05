# uni-mobile-bridge 使用示例

本目录包含 uni-mobile-bridge 的各种使用示例。

## 示例列表

### 1. 基础示例 (basic-example.vue)
展示所有模块的基本用法。

### 2. 健康数据追踪示例 (health-tracker.vue)
一个完整的健康数据追踪应用示例。

### 3. 运动记录示例 (workout-tracker.vue)
运动追踪和记录应用示例。

### 4. 日历管理示例 (calendar-manager.vue)
日历事件管理应用示例。

### 5. 提醒事项示例 (reminder-app.vue)
提醒事项管理应用示例。

## 使用方法

1. 将示例文件复制到你的 uniapp 项目的 `pages` 目录
2. 在 `pages.json` 中注册相应的页面
3. 确保已正确安装 uni-mobile-bridge 插件
4. 运行项目并测试功能

## 注意事项

- 所有示例都需要在真机上运行（Android/iOS/HarmonyOS）
- 请确保已正确配置相应的权限
- 首次使用需要授予相应的系统权限

## 快速开始

```bash
# 1. 复制示例到你的项目
cp examples/basic-example.vue /path/to/your/project/pages/

# 2. 在 pages.json 中添加页面配置
{
  "pages": [
    {
      "path": "pages/basic-example",
      "style": {
        "navigationBarTitleText": "uni-mobile-bridge 示例"
      }
    }
  ]
}

# 3. 运行项目
# 在 HBuilderX 中运行到真机
```
