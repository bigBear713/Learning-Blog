## reduce
- 将Observable发出的值递归为单个值，当Observable`complete`时，将这个值发出
```js
of(1,2,3,4,5).pipe(reduce((acc,cur)=>acc+cur)).subscribe(data=>console.log(data))
// 15
```