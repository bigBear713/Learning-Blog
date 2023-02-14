## fromEvent操作符
- 创建一个 Observable，该 Observable 发出来自**给定事件对象**的指定类型事件
- 可用于浏览器环境中的Dom事件或Node环境中的EventEmitter事件等。
```js
fromEvent(document.getElementById('btn'), 'click').subscribe()
```