## throttleTime
- `throttle`节流操作符的简化版
- 每隔一段时间才会发送一次数据流
- observer接收第一个值时不会被阻塞, 而是接收完一个之后的设定时间里都拿不到值
```js
interval(1000).pipe(
    throttleTime(2000)
).subscribe(data=>console.log(data));
// 第一次不会被阻塞
// 0
// 2s后
// 3
```