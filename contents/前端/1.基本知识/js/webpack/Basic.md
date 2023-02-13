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

## loader和plugin的区别
- loader本质是一个函数，用于对接收的内容进行转化，返回转化后的结果，是对其它类型的资源进行转译的预处理工作。是将资源文件转成js形式
- loader在modules.rules中配置，作为模块的解析规则，类型为数组。每一项都是一个Object，内部包含test, loader, options等属性。
- plugin是一个插件，基于`Tapable`，可以拓展webpack的功能。webpack在生命周期内会广播出许多事件，plugin可以监听这些事件，在适当的时候通过webpack提供的API改变输出结果。
- plugin在plugins中单独配置，类型为数组，每一项是相应的plugin实例。参数都通过构造函数传入。

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
- 为每个模块创造一个导入和导出的环境，本质上没有修改代码的执行逻辑。代码的执行顺序与模块的加载顺序一致
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
- map文件只要不打开开发者工具，浏览器是不会加载的
- 线上环境一般的3种处理方案
  1. `hidden-source-map`，借助第三方错误监控平台sentry使用
  2. `nosources-source-map`，只会显示具体行数，以及查看源代码的错误栈。安全性比sourceMap高
  3. `sourceMap`，通过nginx设置，将`.map`文件只对白名单开发，一般是公司内网

## 文件监听原理
- 当源文件发生改变时，webpack能自动重新构建出新的输出文件
- 开启监听的方式：
  1. 使用command启动webpack时，带上参数`--watch`
  2. 在配置文件webpack.config.js中，设置属性`watch:true`
- 缺点：需要每次手动刷新浏览器
- 原理：轮询判断文件最后编辑的时间点是否变化。如果发生变化，并非立即告诉监听者，而是会缓存起来，等`aggregateTimeout`后再执行
```js
module.export = {
    // 默认false,也就是不开启
    watch: true,
    // 只有开启监听模式时，watchOptions才有意义
    watchOptions: {
        // 默认为空，不监听的文件或者文件夹，支持正则匹配
        ignored: /node_modules/,
        // 监听到变化发生后会等300ms再去执行，默认300ms
        aggregateTimeout:300,
        // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
        poll:1000
    }
}
```

## 热更新原理
- 热更新，又称热替换，Hot Module Replacement, 简称HMR。
- 可以做到不用刷新浏览器，将新变更的模块替换掉旧的模块。
- 核心:客户端从服务端拉取更新后的文件，准确说是chunk diff。
  1. WDS与浏览器之间建立一个websocket，当本地资源发生变化时，WDS会像浏览器推送更新，并带上构建时的hash，让浏览器与上一次的资源做对比。
  2. 浏览器对比出差异后，会像WDS发起一个AJAX请求，获取更新内容(文件列表，hash)
  3. 浏览器便可根据这些信息再像WDS发起jsonp请求获取该chunk的增量更新
  4. 后续部分由HotModulePlugin插件完成，提供相关API让开发者针对自身场景进行处理。比如`react-hot-loader`，`vue-loader`都是借助这些API实现HMR

## 如何对bundle文件的体积进行监控
- 通过vscode中的`Import Cost`插件可以对引入的模块的大小进行实时检测
- 使用`webpack-bundle-analyzer`生成的bundle的模块组成图，显示所占体积
- `bundleSize`工具包可以进行自动化资源体积监控

## 文件指纹
- 是打包后，输出的文件名的后缀
  1. `hash`，和整个项目的构建相关，只要文件有被修改，整个项目构建的hash就会发生改变
  2. `Chunkhash`，和webpack打包的chunk相关，不同的entry会生成不同的chunkhash
  3. `Contenthash`，根据文件内容生成hash。文件内容不变，则contenthash不变
- js文件的指纹设置：设置output的filename,用chunkhash
```js
module.exports = {
    entry: {
        app: './scr/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name][chunkhash:8].js',
        path:__dirname + '/dist'
    }
}
```
- css文件的指纹设置：使用`MiniCssExtractPlugin`插件，设置filename参数，使用contenthash
```js
module.exports = {
    entry: {
        app: './scr/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name][chunkhash:8].js',
        path:__dirname + '/dist'
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: `[name][contenthash:8].css`
        })
    ]
}
```
- 图片的文件指纹设置：设置`file-loader`的name参数，使用hash。其中占位符的名称和含义
  1. ext: 资源后缀名
  2. name: 文件名称
  3. path: 文件相对路径
  4. folder: 文件所在文件夹
  5. contenthash: 文件内容的hash，默认是md5生成
  6. hash：文件内容的hash，默认是md5生成
  7. emoji：一个随机的指代文件内容的emoji
```js
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename:'bundle.js',
        path:path.resolve(__dirname, 'dist')
    },
    module:{
        rules:[{
            test:/\.(png|svg|jpg|gif)$/,
            use:[{
                loader:'file-loader',
                options:{
                    name:'img/[name][hash:8].[ext]'
                }
            }]
        }]
    }
}
```

## 保证loader的执行顺序
- 可以使用`enforce`强制执行loader的作用顺序
- `pre`代表在所有正常Loader之前执行
- `post`是在所有loader之后执行
- `inline`官方不推荐使用

## 优化webpack的构建速度
- 使用高版本的webpack和nodejs
- 多进程、多实例构建：thread-loader
- 压缩代码
  1. 多进程并行压缩
  2. 通过`mini-css-extract-plugin`提取chunk中的css代码到单独文件，通过`css-loader`的minimize选项开启cssnano压缩css
- 图片压缩：使用基于Node的`imagemin`，或者配置`image-webpack-loader`
- 缩小打包作用域
  1. 使用include/exclude
  2. resolve.modules指明第三方模块的绝对路径，减少不必要的查找
  3. resolve.mainFields只采用main字段作为入口文件描述字段
  4. resolve.extensions尽可能减少后缀尝试的可能性
  5. noParse对完全不需要解析的库进行忽略
  6. IgnorePlguin，完全排除模块
  7. 合理使用alias
- 提取页面公共资源：
  1. 基础包分离。使用`html-webpack-externals-plugin`，将基础包通过CDN引入，不打入bundle中；使用`SplitChunksPlugin`进行（公共脚本、基础包、页面公共文件）分离（webpack4内置）,替代CommonChunksPlugin
- DLL
  1. 使用DllPlugin进行分包，使用DllReferencePlugin索引链接，对mainfest.json引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间
  2. HashedModuleIdsPlugin可以解决模块数字id的问题
- 充分利用缓存提升二次构建速度
  1. babel-loader开启缓存
  2. terser-webpack-plugin开启缓存
  3. 使用cache-loader或hard-source-webpack-plugin
- Tree shaking
  1. 打包过程中检测没有引用过的模块并进行标记，在资源压缩时将它们从bundle中移除。只能对ES6 module生效，所以开发中尽量使用ES6 module，提高tree shaking效率。
  2. 禁用babel-loader中的模块依赖，否则webpack接收到的就是转换过的CommonJS形式的模块，无法进行tree-shaking
  3. 使用uncss去除无用的css。purgecss-webpack-plugin 和 mini-css-extract-plugin配合使用(建议)
- scope hoisting。
  - 构建后的代码会存在大量闭包，造成体积增大，运行代码时创建的函数作用域变多，内存开销变大。scope hoisting将所有模块的代码按引用顺序放在一个函数作用域，然后适度重命名一些变量名 以防止变量名冲突
  - 必须是ES6的语法，因为很多第三方库都是使用CommonJS语法，为了充分发挥Scope hoisting 的作用，需要配置 mainFields 对第三方模块优先采用 jsnext:main 中指向的ES6模块化语法
- 动态Polyfill。建议采用polyfill-service，只给用户返回需要的polyfill，社区维护

## 代码分割
- 本质是**源代码直接上线**和**打包成唯一脚本main.bundle.js**这两种极端方案之间的一种更适合实际场景的中间状态
- 用可接收的服务器性能压力增加，来换取更好的用户体验
  1. `源代码直接上线`，虽然过程可控，但是http请求多，性能开销大
  2. `打包成唯一脚本`，服务器压力小，但是页面空白期长，用户体验不好

## Babel原理
- 大概分为3部分
  1. 解析。将代码转成`AST`。词法分析，将代码（字符串）分割成token流，即语法单元组成的数组；语法分析，分析token流，并生成AST
  2. 转换。访问AST节点进行变换操作生成新的AST
  3. 生成。以新的AST为基础生成代码

## 参考
- https://juejin.cn/post/7014466035923288072
- https://juejin.cn/post/6844904094281236487
- https://juejin.cn/post/6943468761575849992