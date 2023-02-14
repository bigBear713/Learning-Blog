## take
- 自定义只发出源Observable的前几个值。
- 算是`first`的进阶版
```js
interval(1000).pipe(
    take(3) // 只取前3个值
).subscribe(data=>console.log(data))
// 0
// 1
// 2
```