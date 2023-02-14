## bufferToggle
- 与`buffer`类似，将Observable发出的值储存在缓冲区。
- 接收一个Observable参数，用于打开开关，将缓存区中的数据流发送出去
- 接收一个Observable参数，用于关闭开关，将源Observable发出的数据存储在缓冲区
```js
const startToggle$ = new Subject();
const closeToggle$ = new Subject();
interval(1000).pipe(
    bufferToggle(startToggle$,closeToggle$)
).subscribe(data=>console.log(data))
```