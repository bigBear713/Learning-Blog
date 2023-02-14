## distinct
- 用来过滤重复数据
- observer订阅接收到的额数据不会重复
```js
of(1,2,1,3,4,2).pipe(
    distinct()
).subscribe(data=>console.log(data))
// 1
// 2
// 3
// 4
```