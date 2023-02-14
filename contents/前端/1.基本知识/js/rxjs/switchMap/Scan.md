## scan累加器操作符
- 对源Observable发出的数据流进行累加处理。
- 类似于数组中的`.reduce()`
```js
of(1,2,3,4).pipe(
    scan((acc,cur)=>acc+cur,0)
).subscribe(data=>console.log(data));
// 1
// 3
// 6
// 10
```