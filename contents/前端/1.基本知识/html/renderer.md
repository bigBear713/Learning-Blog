## 从输入URL到页面渲染显示期间发生的事情
- 输入要访问的URL, DNS解析，找到服务器
- 和服务器建立TCP连接，发起HTTP请求
- 服务器响应请求，返回页面，客户端接收响应
- 客户端解析并渲染页面
- 连接结束

## 输入URL，DNS解析
- 根据输入的url，尝试从客户端本地缓存中查找相应的IP地址
- 如果找不到，则进行DNS解析，找到服务器对应的ip地址
- 找到ip地址后，会在本地进行缓存，以便下次更快访问
- 根据ip地址，访问对应的服务器
### URL解析
- 访问页面时，通常是一串特殊的字符串，而不是ip地址。字符串只是更方便理解和记忆，但最终仍是根据ip地址访问服务器的
- URL解析时，是从后往前解析。比如`www.baidu.com`，是先解析`.com`部分，再解析`baidu`部分。这是因为`.com`是根域名，表示`baidu`域名对应的服务器是在`.com`下的，类似的根域名还有`.cn`

## 和服务器建立TCP连接，发起HTTP请求
- 客户端和服务器进行三次握手，建立TCP连接
- 客户端向服务器发起http请求，请求页面数据

## 服务器响应请求，客户端接收响应
- 服务器接收到请求后，查找数据，然后发送给客户端
- 客户端接收响应的结果

## 客户端对结果进行解析，并渲染页面
- 客户端对返回的html, js, css进行解析
- 解析html文件中的html标记，以及js中的dom api，生成DOM树
- 解析css文件，以及js中的css api，生成CSSOM树
- 将DOM树和CSSOM树结合生成渲染树
- 客户端开始进行reflow回流和repain重绘
  1. `reflow` - 是对html中dom的大小、位置等进行计算
  2. `repain` - 是对元素的字体、颜色等进行绘制
- 最终渲染出整个页面

## 连接结束
- 客户端和服务器进行四次挥手，结束TCP连接


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

### 如何避免
#### css
- 避免使用`table`布局
- 尽可能在DOM树的最末端改变`class`
- 避免设置多层内联样式
- 将动画效果应用到`position`为`absolute/fixed`的元素上
- 避免使用css表达式，如`calc()`
#### js
- 避免频繁操作样式，最好一次性重写`style`属性，或者将样式列表定义为`class`并一次性修改`class`的属性
- 避免频繁操作DOM，可以创建一个`documentFragment`，在它上面执行所有的DOM操作，再将它添加到文档中
- 可以先将元素设置为`display:none`，操作结束后再显示出来。因为对`display:none`的元素进行DOM操作，不会引起回流和重绘
- 避免频繁读取会引起回流和重绘的属性。如果需要频繁读取，可用一个变量缓存起来
- 对有复杂动画效果的DOM元素使用`absolute/fixed`定位，使它脱离文档流，否则会引起父元素及后续元素的频繁回流

## 参考
- https://juejin.cn/post/6844903569087266823