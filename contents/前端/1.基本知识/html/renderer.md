## 从输入URL到页面渲染显示期间发生的事情
- 输入要访问的URL, DNS解析，找到服务器
- 和服务器建立TCP连接，发起HTTP请求
- 服务器响应请求，返回页面，客户端接收响应
- 客户端解析并渲染页面
- 连接结束

---

## 输入URL，DNS解析
- 根据输入的url，尝试从客户端本地缓存中查找相应的IP地址
- 如果找不到，则进行DNS解析，找到服务器对应的ip地址
- 找到ip地址后，会在本地进行缓存，以便下次更快访问
- 根据ip地址，访问对应的服务器
### URL解析
- 访问页面时，通常是一串特殊的字符串，而不是ip地址。字符串只是更方便理解和记忆，但最终仍是根据ip地址访问服务器的
- URL解析时，是从后往前解析。比如`www.baidu.com`，是先解析`.com`部分，再解析`baidu`部分。这是因为`.com`是根域名，表示`baidu`域名对应的服务器是在`.com`下的，类似的根域名还有`.cn`

---

## 和服务器建立TCP连接，发起HTTP请求
- 客户端和服务器进行三次握手，建立TCP连接
- 客户端向服务器发起http请求，请求页面数据

---

## 服务器响应请求，客户端接收响应
- 服务器接收到请求后，查找数据，然后发送给客户端
- 客户端接收响应的结果

---

## 客户端对结果进行解析，并渲染页面
- 客户端对返回的html, js, css进行解析
- 解析html文件中的html标记，以及js中的dom api，生成DOM树
- 解析css文件，以及js中的css api，生成CSSOM树
- 将DOM树和CSSOM树结合生成渲染树
- 客户端开始进行reflow回流和repain重绘
  1. `reflow` - 是对html中dom的大小、位置等进行计算
  2. `repain` - 是对元素的字体、颜色等进行绘制
- 最终渲染出整个页面

---

## 连接结束
- 客户端和服务器进行四次挥手，结束TCP连接

---

## reflow回流和repain重绘
### reflow回流
- 渲染树中的部分或者全部元素的尺寸、结构，或者某些属性发生改变时，浏览器重新计算、渲染部分或全部文档的过程
- 会引起回流的操作
  1. 页面首次渲染
  2. 浏览器窗口大小发生改变
  3. 元素的尺寸或大小发生改变
  4. 元素的内容发生改变，比如文字数量或者图片大小等
  5. 元素字体大小变化
  6. 添加或删除`可见`的DOM元素
  7. 激活css`伪类`
  8. 查询某些属性或者调用某些方法
- 一些常用会导致回流的属性和方法
  1. clientWidth, clientHeight, clientTop, clientLeft
  2. offsetWidth, offsetHeight, offsetTop, offsetLeft
  3. scrollWidth, scrollHeight, scrollTop, scrollLeft
  4. scrollIntoView(), scrollIntoViewIfNeeded()
  5. getComputedStyle()
  6. getBoundingClientRect()
  7. scrollTo()
- 回流必定引起重绘，重绘不一定引起回流

### repain重绘
- 当页面中DOM元素样式的改变不会影响它在文档流中的位置(比如`color`，`visibility`等)时，客户端会将新样式赋予DOM元素，并重新绘制它

### 性能影响
- 回流会比重绘的代价要高
- 客户端对频繁回流做的优化：维护一个队列，把所有引起回流和重绘的操作放到队列中。如果队列中的数量达到一定阈值，或者达到一定的时间间隔，浏览器会做一次批处理，然后清空队列。这样就可以将多次回流和重绘变成一次。
- 当访问这些属性或者方法时，会立即清空队列。因为队列中的一些操作会影响到这些属性的取值或者方法的返回值，为了确保结果的精确，会立即执行清空队列
  1. clientWidth, clientHeight, clientTop, clientLeft
  2. offsetWidth, offsetHeight, offsetTop, offsetLeft
  3. scrollWidth, scrollHeight, scrollTop, scrollLeft
  4. width, height
  5. getComputedStyle()
  6. getBoundingClientRect()

### 触发
- 隐藏元素，`display:none`会触发reflow + repain，`visibility:hidden`只会触发repain
- transform/opacity, 不会触发生repain, reflow

### 如何避免
#### css
- 避免使用`table`布局
- 尽可能在DOM树的最末端改变`class`
- 避免设置多层内联样式
- 将动画效果应用到`position`为`absolute/fixed`的元素上
- 避免使用css表达式，如`calc()`
- 避免css选择器嵌套层级太深
- 使用`translate`替代`top`
- 使用`flexBox`代替老式布局模型
#### js
- 避免频繁操作样式，最好一次性重写`style`属性，或者将样式列表定义为`class`并一次性修改`class`的属性
- 避免频繁操作DOM，可以创建一个`documentFragment`，在它上面执行所有的DOM操作，再将它添加到文档中
- 可以先将元素设置为`display:none`，操作结束后再显示出来。因为对`display:none`的元素进行DOM操作，不会引起回流和重绘
- 避免频繁读取会引起回流和重绘的属性。如果需要频繁读取，可用一个变量缓存起来
- 对有复杂动画效果的DOM元素使用`absolute/fixed`定位，使它脱离文档流，否则会引起父元素及后续元素的频繁回流
- 把DOM离线后再修改
- 动画实现速度的选择，速度越快，reflow的次数越多。也可以选择用`requestAnimationFrame`

### reflow, repain和EventLoop的关系
- 当`EventLoop`执行完`MicroTasks`后，会判断document是否需要更新。因为浏览器是60HZ刷新率，所以每16ms才会更新一次
- 然后判断是否有`scroll`或者`resize`，有的话会触发事件。因此`scroll`和`resize`也是16ms才触发一次，并自带节流功能
- 判断是否触发`media query`
- 更新动画并发送事件
- 判断是否有全屏操作事件
- 执行`requestAnimationFrame`回调
- 执行`IntersectionObserver`回调，该方法用于判断元素是否可见，可以用于懒加载上，但是有兼容性问题
- 更新界面

---

## 优化页面的渲染
### 使用requestAnimationFrame
- 动画实现避免使用`setTimeout`和`setInterval`，尽量使用`requestAnimationFrame`
- `setTimeout(callback)`和`setInterval(callback)`无法保证callback函数执行的时机
- `requestAnimationFrame(callback)`可以保证callback函数在每帧动画开始时执行

### 将耗时长的js代码放到Web Worker中去做
-  js代码是运行在客户端的主线程上。同时 客户端主线程还负责样式计算、布局、绘制等工作。如果js运行耗时太长，会阻塞其它渲染工作，导致丢帧。
-  每帧的渲染应该在16ms内完成。但在动画过程中，因为已经被占用不少时间，所以js代码运行耗时应控制在`3-4`毫秒。

### 对用户输入事件的处理事件函数做去抖动
- 用户输入事件的处理函数在执行时会阻塞帧的渲染，并导致额外的布局发生。
- 正常情况下，用户和页面交互，页面的渲染层合并线程将受到这个事件并移动元素。这个响应过程是不需要主线程参与的，不会导致js、布局和绘制过程发生。但如果被触摸的元素绑定了事件处理函数，如`touchstart`/`touchend`等，那么渲染层合并线程必须等待这些被绑定的处理函数执行完毕才能执行，也就是页面滚动页面等操作被阻塞了，表现出的行为就是滚动出现延迟或者卡断。因此，必须保证用户输入事件绑定的任何处理函数都能够快速执行完毕，以便腾出时间来让渲染合并线程完成它的工作

### 避免使用运行时间过长的输入事件处理函数
- 如`scroll`等输入事件处理函数，都会在`requestAnimationFrame`之前被调用执行。
- 如果在输入事件处理函数中做**修改样式属性**的操作，那么这些操作就会被浏览器暂存起来。
- 然后在调用`requestAnimationFrame`的时候，如果一开始就执行读取样式属性的操作，将会触发浏览器的强制同步布局操作

### 对滚动事件做去抖动
- 通过`requestAnamitionFrame`可以对样式的修改做去抖动，同时也可让事件处理函数变得更轻。
```js
function onScroll(evt){
  // scroll the scroll value for later
  lastScrollY = window.scrollY;

  // prevent multiple rAF callbacks
  if(scheduleAnimatitonFrame) return;

  scheduleAnimationFrame = true;
  requestAnimationFrame(readAndUpdatePage);
}

window.addEventListener('scroll', onScroll)
```

### 结合chrome分析
- chrome dev tool > performance

---

## 参考
- https://juejin.cn/post/6844903569087266823
- https://juejin.cn/post/6844903935614910471