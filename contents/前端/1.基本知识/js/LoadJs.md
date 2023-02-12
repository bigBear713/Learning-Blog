## load js
- 加载js主要分为两种方式:`同步`和`异步`

### 同步
- `同步`加载js，只需要在html中加入一个script标签，带上src就行。
- 当执行到此处时，就算还在渲染页面，也会停止渲染，立即开始加载js。等到加载完毕，并执行完后，才会继续渲染页面，或执行接下去的内容
- 因此以前加载js，都是放到最后，避免阻塞页面的渲染
```html
<body>
    <!-- html content -->
    <script src="xxx.js"></script>
</body>
```

### 异步
- `异步`加载js，又可分为两种方式：`defer`,`async`
- `defer`的兼容性比`async`稍微差一点

#### defer
- defer异步加载js完成后，如果此时有在渲染页面，不会停止渲染，而是等页面渲染完后才执行该js
- defer异步加载的js的会按照声明的顺序来执行。即如果加载的该js前还有其它js，则会先执行其它的js。
```html
<body>
    <!-- html content -->
    <script src="xxx.js" defer></script>
    <!-- yyy.js会等html content渲染完和xxx.js执行完后才开始执行 -->
    <script src="yyy.js" defer></script>
</body>
```

#### async
- async异步加载js完后，如果此时有在渲染页面，则会立即停止页面的渲染，执行该js。执行完后才继续渲染页面
- async异步加载的js的执行顺序没有保证。因为是加载完后立即执行，所以哪个先加载完就先执行哪个
```html
<body>
    <!-- html content -->
    <!-- xxx.js和yyy.js哪个先执行，要看哪个先加载完毕 -->
    <script src="xxx.js" async></script>
    <script src="yyy.js" async></script>
</body>
```

#### 加载es6模块
- 浏览器也能异步加载es6的模块，方法是在`script`标签中加入`type="module"`属性。
- 默认情况下，加载和执行的方式和`defer`一样，等页面都渲染完再执行脚本
- 可以显示设置为`async`的方式加载
```html
<body>
    <!-- html content -->

    <script src="xxx.js" type="module"></script>
    <!-- 等同于 -->
    <script src="xxx.js" type="module" defer></script>

    <!-- 可根据需求调整为async加载方式 -->
    <script src="yyy.js" type="module" async></script>
</body>
```
- es6模块也允许内嵌于网页中，语法与加载外部脚本完全一致
```html
<body>
    <!-- html content -->
    <script type="module">
        import utils from './utils.js';
        // code...
    </script>

</body>
```
- 对于外部的ES6模块脚本，注意点
  1. 代码是在模块作用域中执行，而不是在全局作用域中执行。模块内部的顶层变量，外部不可见
  2. 模块脚本自动采用严格模式，不管有没有声明`use strict`
  3. 模块中，可以使用`import`加载其它模块(`.js`不可省略)，也可以使用export输出对外接口
  4. 模块中，顶层的`this`返回的是`undefined`，而不是`window`
  5. 同一个模块如果加载多次，只会执行一次

### 动态创建script标签
- 动态创建script标签，并赋值src后并不会开始下载，而是要等到将该标签添加到document中，js文件才会开始下载
```js
const script = document.createElement('script')
script.src='xxx.js';
// 添加到document后才开始下载js
document.body.append(script)
```

### XHR异步加载js
- 使用XHR加载js文件后执行，但是不太推荐
```js
const xhr = new XMLHttpRequest();
xhr.open('get','xxx.js');
xhr.send();
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
        eval(xhr.responseText)
    }
}
```

## 预加载文件
- 预加载文件就是在执行到之前预先加载。主要有`preload`,`prefetch`,`subresource`,`prerender`

### preload
- `preload`可以预先加载**当前**页面的js、css等资源，不用等到解析到`script`,`link`标签时才加载
- 可以更早进行资源的加载，且不会阻塞页面的初步渲染，进而提升性能
```html
<head>
   <link rel="preload" href="style.css" as="style"/>
   <link rel="preload" href="xxx.js" as="script"/>
</head>
```

### prefetch
- `prefetch`是预先加载**其它**页面的资源。
- 因为是加载其它页面的资源，优先级没那么高，所以在浏览器**空闲**时才会下载。这样，等进入相应页面时，就能直接从cache data中获取所需资源，提升页面加载渲染速度
- 使用时，无需指定`as`属性
```html
<head>
   <link rel="prefetch" href="style.css"/>
   <link rel="prefetch" href="xxx.js"/>
</head>
```

### subresource
- `subresource`用于指定资源是当前页面的**最高**优先级。如果资源马上会被用到，推荐使用`subresource`
```html
<head>
   <link rel="subresource" href="xxx.js"/>
</head>
```

### prerender
- `prerender`可以让浏览器提前加载一个页面的所有资源，就像打开一个隐藏的tab标签，会下载所有资源、创建DOM、渲染页面、执行js等
- 这是一个重量级选项，只有在十分确定用户会访问某个页面时才能使用。因为代价是昂贵的，比如高CPU、耗电、占用带宽等


## 参考
- https://juejin.cn/post/6844904033233141773