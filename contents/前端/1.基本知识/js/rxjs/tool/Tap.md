## tap
- 对Observable发出的数据流执行透明的操作或副作用
```js
of(1,2,3).pipe(
    tap(val=>console.log(`the value is ${val}`))
).subscribe(data=>console.log(data));
// the value is 1
// 1
// the value is 2
// 2
// the value is 3
// 3
```