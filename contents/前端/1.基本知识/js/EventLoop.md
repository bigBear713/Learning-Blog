## 事件循环EventLoop
- EventLoop是js的执行机制。
- 需要被执行的代码块会被放到调用栈（call stack）中，周期内调用栈中的代码块会从上到下被执行。
- 当调用栈中的代码块都被执行完后，会先看微任务中是否有能执行的，再看宏任务中是否有能执行的，最后开启下一个事件周期，将执行队列中的代码块放到调用栈中并清空队列，形成一个循环。
- 异步代码需要响应时，会将响应事件放入执行队列中等待下一个周期被执行。

## 微任务
- 微任务，microtask，又称jobs，由js自身发起的。
- 常见的微任务：Promise, process.nextTick, Object.observe(已被废弃，proxy代替), MutationObserver
- 在ES3以及以前的版本中，js是没有发起异步请求的能力的，所以此时不存在微任务。ES5之后，引入Promise后，在不需要浏览器的情况下，js引擎也能自己发起异步任务，此时就有了微任务。

## 宏任务
- 宏任务，macrotask，又称task，由宿主（浏览器、Node）发起。
- 常见的宏任务：setTimeout, setInterval, script, I/O, UI rendering等。
- 宏任务中没有能执行的后，会开启下一个事件循环。
  
## requestAnimationFrame
- 既不是宏任务也不是微任务，它是跟渲染相关，所以有时执行得像微任务，有时执行得像宏任务

## requestIdleCallback
- 回调属于低优先级任务，仅在浏览器**空闲**时期被调用（目前仍处于实验功能阶段，在微前端中常有应用）