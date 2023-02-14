## timer
- 在给定的时间后发出数字
- 可接收第二个参数，设置每间隔多少时间发出连续的值
```js
timer(1000,3000).subscribe(data=>console.log(data))
// 1s后
// 0
// 4s后
// 1
// 7s后
// 2
```