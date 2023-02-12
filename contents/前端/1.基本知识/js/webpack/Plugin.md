## plugin
- 负责功能扩展。
- webpack基于发布订阅模式，在运行的声明中周期中会广播出许多事件。plugin通过监听这些事件，在特定阶段执行相应的任务，实现预期功能
- `compiler`提供webpack整个生命周期相关的钩子，`compilation`提供与模块和依赖相关的粒度更小的钩子

## 开发规则
- plugin必须是一个函数，或者是一个包含`apply`方法的对象。这样才能访问`compiler`实例
- 传递给每个插件的`compiler`和`compilation`都是同一个引用。若在插件上改变它们的属性或方法，会影响后面的插件。
- 异步事件需要在插件处理完任务时，调用回调函数通知webpack进入下一流程，不然会卡住

## 常见Plugin
- `define-plugin`：定义环境变量 (Webpack4 之后指定 mode 会自动配置)
- `ignore-plugin`：忽略部分文件
- `html-webpack-plugin`：简化 HTML 文件创建 (依赖于 html-loader)
- `web-webpack-plugin`：可方便地为单页应用输出 HTML，比 html-webpack-plugin 好用
- `uglifyjs-webpack-plugin`：不支持 ES6 压缩 (Webpack4 以前)
- `terser-webpack-plugin`: 支持压缩 ES6 (Webpack4)
- `webpack-parallel-uglify-plugin`: 多进程执行代码压缩，提升构建速度
- `mini-css-extract-plugin`: 分离样式文件，CSS 提取为独立文件，支持按需加载 (替代extract-text-webpack-plugin)
- `serviceworker-webpack-plugin`：为网页应用增加离线缓存功能
- `clean-webpack-plugin`: 目录清理
- `ModuleConcatenationPlugin`: 开启 Scope Hoisting
- `speed-measure-webpack-plugin`: 可以看到每个 Loader 和 Plugin 执行耗时 (整个打包耗时、每个 Plugin 和 Loader 耗时)
- `webpack-bundle-analyzer`: 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)


## 参考
- https://juejin.cn/post/6844904094281236487
- https://juejin.cn/post/6943468761575849992