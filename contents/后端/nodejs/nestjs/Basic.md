## @nestjs/cli
- nestjs的命令行客户端，方便对nestjs项目的管理
- 安装命令`npm i -g @nestjs/cli`

## 创建项目
- 命令`nest new [project-name]`
- 项目基本结构
  1. main.ts - 应用程序入口文件。它使用 `NestFactory` 用来创建 Nest 应用实例。
  2. app.module.ts - 应用程序的根模块。
  3. app.controller.ts - 带有单个路由的基本控制器示例
  4. app.controller.spec.ts - 对于基本控制器的单元测试样例
  5. app.service.ts - 带有单个方法的基本服务