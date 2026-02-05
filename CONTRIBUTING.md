# 贡献指南

感谢您考虑为 uni-mobile-bridge 做出贡献！

## 如何贡献

### 报告 Bug

如果您发现了 bug，请通过 GitHub Issues 报告，包括：

1. 详细的问题描述
2. 重现步骤
3. 期望行为
4. 实际行为
5. 运行环境（平台、版本等）
6. 相关日志或截图

### 功能建议

我们欢迎新功能建议！请通过 GitHub Issues 提交您的想法，包括：

1. 功能描述
2. 使用场景
3. 为什么这个功能有用
4. 可能的实现方式

### 提交代码

1. **Fork 项目**
   ```bash
   git clone https://github.com/xingangtech/uni-mobile-bridge.git
   ```

2. **创建特性分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **提交更改**
   ```bash
   git commit -m "feat: add some feature"
   ```

4. **推送到分支**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **创建 Pull Request**

## 代码规范

### JavaScript/TypeScript

- 使用 2 空格缩进
- 使用单引号
- 文件末尾留一个空行
- 使用分号结尾
- 使用 ES6+ 语法

### Java (Android)

- 遵循 Google Java Style Guide
- 使用 4 空格缩进
- 类名使用 PascalCase
- 方法名使用 camelCase

### Objective-C (iOS)

- 遵循 Apple Coding Guidelines
- 使用 4 空格缩进
- 方法名使用 camelCase
- 类名使用前缀（如 UMB）

### ArkTS (HarmonyOS)

- 使用 2 空格缩进
- 遵循 TypeScript 规范
- 类名使用 PascalCase

## Commit 信息规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

示例：
```
feat: add heart rate monitoring support
fix: resolve calendar permission issue on iOS
docs: update API documentation for Sports module
```

## 开发流程

### 本地开发

1. 安装依赖
   ```bash
   npm install
   ```

2. 开发您的功能

3. 测试您的更改
   - Android: 使用 Android Studio
   - iOS: 使用 Xcode
   - HarmonyOS: 使用 DevEco Studio

### 测试

- 确保您的代码在所有支持的平台上都能正常工作
- 添加必要的测试用例
- 运行现有测试确保没有破坏性更改

### 文档

- 更新相关的 API 文档
- 添加或更新使用示例
- 更新 CHANGELOG.md

## Pull Request 审查

提交 PR 后，维护者会审查您的代码。请：

- 确保 CI 通过
- 回应评审意见
- 保持代码同步到最新的 main 分支

## 行为准则

### 我们的承诺

为了营造一个开放和友好的环境，我们承诺：

- 使用友好和包容的语言
- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

### 不可接受的行为

- 使用性化的语言或图像
- 挑衅、侮辱或贬损的评论
- 公开或私下的骚扰
- 未经许可发布他人的私人信息
- 其他在专业环境中可能被视为不当的行为

## 许可证

通过为此项目做出贡献，您同意您的贡献将根据项目的 MIT 许可证授权。

## 问题？

如果您有任何问题，请随时通过 GitHub Issues 联系我们。

---

再次感谢您的贡献！🎉
