## module模块
- 模块定义了一个应用程序，为根模块
- 模块是一个应用程序中，不同部分的容器
- 模块是应用控制器的容器
- 控制器通常属于一个模块
- AngularJS 模块让所有函数的作用域在模块下，避免了重名的问题

---

## 使用
### 创建
- 使用`.module()`创建模块

### 添加
- 可以为模块添加controller, directive, filter, service等
  1. `.controller()` 添加控制器
  2. `.directive()` 添加指令
  3. `.filter()` 添加过滤器
  4. `.service()` 添加服务