## 模块化
- 将一个复杂的程序、代码依据一定的规范分割成几个块（文件）并组合在一起。块内部的属性、方法函数是私有的，外部无法访问。只向外暴露导出几个属性或者方法函数于其它模块交互。

---

## 目的
- 解耦
- 降低复杂度
  
---

## 好处
- 避免命名冲突
- 能按需加载
- 提高可维护性
- 提高可复用性
  
---

## 常见模块化
### CommonJS
- 一开始是在服务端(NodeJS)使用，后来CommonJS也兼容浏览器端
- 引入时是一个值的拷贝，因此引入后，该值在原模块中再被改变，都不会影响到引入该值得地方。同时，引入的地方改变了该值，也不会影响到该值在原模块的值
#### 语法
- 向外暴露：
```js
module.exports = value
// 或者
exports.xxx=value
```
- 引入使用：`require('xxx/xxx')`。引入项目中的模块使用相对路径，引入第三方模块写包名
- 使用`require`引入的本质：`exports`对象
#### 实现
- 服务端：NodeJS，模块加载是同步的
- 浏览器端：借助Browserify进行打包，因此需要安装Browserify为开发依赖

### AMD
- 只能在浏览器端使用，模块加载是异步的。
- 这是为了解决CommonJS加载模块是同步的问题，因为浏览器端不像在服务器端，如果同步加载会发起http请求
- 推荐依赖前置，在一开始就写明依赖的模块
#### 语法
- 向外暴露：`define(id, dependencies, factory)`，id是定义的模块的名字，可省略；dependencies是依赖的模块，如果没有可省略
```js
// 只有factory
define(function(){
    // code...
    return {
        //... 
    };
});
// 定义了模块名
define('a',function(){
    // ...
    return {
        //... 
    };
});
// 依赖其它模块
define(['module1','module2'],function(m1,m2){
    // ...
    return {
        //... 
    };
});
```
- 引入使用：
```js
require(['module1','module2'],function(m1,m2){
    // ...
})
```

### CMD
- 也是只能用于浏览器端，模块异步加载，使用时才加载。
- 和AMD的区别是，AMD是依赖前置，CMD是依赖在使用时才引入
#### 语法
- 向外暴露
```js
// 没有依赖时
define(function(require,exports,module){
    //...
    exports.moduleName = value; // 第一种导出方式
    module.exports = { value }; // 第二种导出方式
})
// 有依赖时
define(function(require,export,module){
    // 同步引入
    var a = require('xxx');
    // 异步引入
    var b = require.async('./module1',function(m1){
        // ...
    });
    // ...
    exports.moduleName = value; // 第一种导出方式
    module.exports = { value }; // 第二种导出方式
})
```
- 引入使用:
```js
define(function(require,export,module){
    var a = require('xxx');
})
```

### UMD
- 统一AMD和CommonJS的模块化方案
- 先检测看是否支持AMD，支持的化就用AMD方式加载模块
- 不支持就用CommonJS
- 都不存在，将模块公开到全局

### Module
- 是ES6才推出的语法，因此为了兼容性，需要在打包时对语法进行降级，再借助Browserify等插件进行打包。
- 引入时是值的引用，因此对引用后的值进行调整后，其它引用的地方的值也是改变后的值。这和CommonJS是不一样的，CommonJS引用的是一个拷贝值。
- 因此这种模块的引入是静态的，而AMD,CMD,CommonJS等是动态的，能够在运行时才动态引入
#### 语法
- 向外暴露
```js
export default xxx;

export const xxx;

export { xxx};
```
- 引入使用
```js
import xxx from './xxx';
import {xxx} from './xxx';
```