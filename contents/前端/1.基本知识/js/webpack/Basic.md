## 基本结构
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 单文件入口
  entry: path.resolve(__dirname, "../src/main.js"),
  // 多文件入口
  // entry:{
  //   bundle1: './main1.js',
  //   bundle2: './main2.js'
  // },
  output: {
    path:path.resolve(__dirname,'../dist'),
    filename: '[name].bundle.js',
    clean:true //每次构建清除dist包
  },
  module:{
    rules:[
        {
            test: /\.css$/,
            // 使用use链式调用
            use: ["style-loader", "css-loader"], //从右向左解析
        },
        {
            test: /\.vue$/,
            // 使用loader，通过loader名称调用
            loader: 'vue-loader',
            include: [path.resolve(__dirname, '../src')]
        },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        filename: 'index.html', 
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json", ".vue"], //省略文件后缀
    alias: { //配置别名
      "@": path.resolve(__dirname, "../src"),
    },
  },

}
```
- entry: 入口。可配置多个入口。如果是SPA，只需配置一个入口就可
- output: 出口。设置文件打包后的存放路径。只有一个出口
- loader: 加载器。用于将模块文件进行转译处理，以便webpack处理。在webpack中，资源都是模块，比如js，css，image，jsx，vue等。在module中的rules中配置。loader的配置包括：
  1. test：正则校验（必须）、
  2. loader调用：loader名称，或者使用use链式调用（二选一）。use链式调用，都是从右往左解析，需要注意调用的**顺序**。
  3. include/exclude：手动添加必须处理的文件、文件夹，或屏蔽不需要处理的文件、文件夹
  4. options：为loader提供额外的设置选项
- plugin: 插件。用来拓展webpack的功能，包括：打包优化、资源管理、注入环境变量。使用时只需要`require()`，然后加入到`plugins`数组中


## 搭建环境
- 在项目中，常会根据需要区分为`开发环境`和`生产环境`。因此配置文件也至少会有3份（common配置文件，dev配置文件，prod配置文件）
- 实际使用的是`dev`配置文件和`prod`配置文件。`common`配置文件是一些基础配置，最后将通过`webpack-merge`被merge到dev/prod配置文件中
```js
// webpack.dev.js
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    hot: true, //热更新
    open: true, //编译完自动打开浏览器
    compress: true, //开启gzip压缩
    port: 3000, //开启端口号
    //托管的静态资源文件
    //可通过数组的方式托管多个静态资源文件
    static: {
      directory: path.join(__dirname, "../public"),
    },
  },
});


// webpack.prod.js
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
 
module.exports = merge(common, {
  mode: "production",
});

```

## 作用
- 模块打包。可以将不同模块的文件打包整合在一起，并保证它们之间引用正确，执行有序。因此我们可以在开发过程中根据业务需求划分模块，保证项目结构的清晰和可读性
- 编译兼容。通过`loader`等机制，不仅可帮代码做`profill`，以便在不同版本的浏览器上运行，还可以编译转换如`jsx`,`scss`,`vue`这类浏览器无法识别的格式文件。让我们在开发过程中，能使用新特性和新语法做开发，提高开发效率
- 能力拓展。通过`plugin`机制，在模块打包、编译兼容的基础上，进一步实现如按需加载、代码压缩等一系列功能，进一步提高自动化程度、工作效率和打包输出的质量

## 模块打包的原理
- webpack的打包流程
  1. 读取webpack的配置参数
  2. 启动webpack，创建Compiler对象，开始解析项目
  3. 从entry入口开始进行解析，找到其导入的依赖模块，递归遍历分析，形成依赖关系树
  4. 对不同类型的依赖模块文件（scss，jsx）使用对应的loader进行编译，最终转为js文件
  5. 整个过程中，webpakc会通过**发布订阅**模式，向外抛出一些hook。而webpack的plugin通过监听这些关键事件点，执行插件任务从而达到干预输出结果的目的
- 文件的解析和构建是一个负责的过程，主要依赖`compiler`和`compilation`两个核心对象实现
  1. `compiler`是一个全局单例，负责把控整个打包构建流程。
  2. `compilation`是每一次构建的上下文对象，包含此次构建所需的所有信息。
  3. 每次热更新和重新构建，compiler都会创建一个新的compilation对象，负责对此次更新的构建流程
- 每个模块间的依赖关系，都是依赖`AST`语法树。每个模块文件通过`loader`解析完后，会通过`acorn`库生成模块代码的`AST`语法树。通过语法树就可知道这个模块是否还有依赖的模块，继而继续循环执行下一个模块的编译。
- 最终webpack打包出来的`bundle`文件是一个`IIFE`的执行函数
- 和webpack4比，webpack5打包出来的bundle做了相当的精简。
- 在模块开发过程中，开发者通常使用`ES Module`或者`CommonJS`的规范导出、引入模块。webpakc打包编译时，会同一替换成自己的`__webpack_require__`开实现模块的引入和导出，从而实现模块的缓存机制，以及抹平不同模块规范之间的一些差异性

## SourceMap
- 是一种将编译、打包、压缩后的代码映射回源的技术。
- sourceMap能帮助开发者快速定位源代码位置，提高开发效率。
- `.map`是相应的映射文件
```js
{
  "version" : 3,                          // Source Map版本
  "file": "out.js",                       // 输出文件（可选）
  "sourceRoot": "",                       // 源文件根目录（可选）
  "sources": ["foo.js", "bar.js"],        // 源文件列表
  "sourcesContent": [null, null],         // 源内容列表（可选，和源文件列表顺序一致）
  "names": ["src", "maps", "are", "fun"], // mappings使用的符号名称列表
  "mappings": "A,AAAB;;ABCDE;"            // 带有编码映射数据的字符串
}
```
- 其中的`mappings`字段的规则：
  1. 生成文件中的一行的每个组用“;”分隔
  2. 每一段用“,”分隔
  3. 每段由1、4或5个可变长度字段组成
- 有了这份文件，只需在压缩代码的最末端加上这句注释：`//# sourceURL=/path/to/file.js.map`，便可让sourceMap生效
- 有了这段注释，浏览器会通过`sourceURL`去获取这份映射文件，通过解释器解析后，实现源代码和混淆代码的映射。因此sourceMap也是一项需要浏览器支持的技术

## 参考
- https://juejin.cn/post/7014466035923288072
- https://juejin.cn/post/6844904094281236487
- https://juejin.cn/post/6943468761575849992