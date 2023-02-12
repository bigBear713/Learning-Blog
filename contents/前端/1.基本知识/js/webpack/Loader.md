## loader
- 负责对文件的转换
- webpack内部默认只能解析js模块代码，因此在打包过程中，会默认将遇到的所有文件都当作js代码进行解析。
- 因此当项目中存在非js类型文件时，就需要先对其进行必要的转换，才能继续执行打包任务。这也是Loader机制存在的意义
- loader函数中的this由webpack提供，可以通过this对象提供相关属性，获取当前loader需要的各种信息。
- loader函数中的this指向一个叫`loaderContext`的loader-runner特有对象

## 常见loader
- `babel-loader`：把 ES6 转换成 ES5
- `ts-loader`: 将 TypeScript 转换成 JavaScript
- `sass-loader`：将SCSS/SASS代码转换成CSS
- `css-loader`：加载 CSS，支持模块化、压缩、文件导入等特性
- `style-loader`：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS
- `postcss-loader`：扩展 CSS 语法，使用下一代 CSS，可以配合 autoprefixer 插件自动补齐 CSS3 前缀
- `image-loader`：加载并且压缩图片文件
- `awesome-typescript-loader`：将 TypeScript 转换成 JavaScript，性能优于 ts-loader
- `eslint-loader`：通过 ESLint 检查 JavaScript 代码
- `tslint-loader`：通过 TSLint检查 TypeScript 代码
- `file-loader`：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件 (处理图片和字体)
- `url-loader`：与 file-loader 类似，区别是用户可以设置一个阈值，大于阈值会交给 file-loader 处理，小于阈值时返回文件 base64 形式编码 (处理图片和字体)
- `source-map-loader`：加载额外的 Source Map 文件，以方便断点调试
- `vue-loader`：加载 Vue.js 单文件组件
- `i18n-loader`: 国际化
- `cache-loader`: 可以在一些性能开销较大的 Loader 之前添加，目的是将结果缓存到磁盘里
- `svg-inline-loader`：将压缩后的 SVG 内容注入代码中
- `raw-loader`：加载文件原始内容（utf-8）
- `json-loader` 加载 JSON 文件（默认包含）
- `handlebars-loader`: 将 Handlebars 模版编译成函数并返回
- `mocha-loader`：加载 Mocha 测试用例的代码
- `coverjs-loader`：计算测试的覆盖率

## 参考
- https://juejin.cn/post/6844904094281236487