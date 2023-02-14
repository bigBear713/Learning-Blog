## first
- 只发出源Observable发出的第一个数据流
```js
of(1,2,3).pipe(
    first()
).subscribe(data=>console.log(data))
// 1
```