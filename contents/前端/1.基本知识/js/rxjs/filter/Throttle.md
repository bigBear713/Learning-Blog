## throttle
- 以某个时间间隔为阈值，在 durationSelector 完成前将抑制新值的发出
```js
interval(1000).pipe(throttle(_=>interval(2000))).subscribe(data=>console.log(data));
// 0
// 3
// 6
```