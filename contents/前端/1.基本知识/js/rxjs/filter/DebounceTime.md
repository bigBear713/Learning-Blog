## debounceTime
- `debounce`防抖操作符的简化版
- 一段时间内，只有没有发出新的数据流，才发出此次数据流。即防抖操作
```js
interval(1000).pipe(
    take(3),
    debounceTime(2000)
).subscribe(data=>console.log(data))
// 5s后，才输出 2
```

## 和auditTime的差异