## single
- 当Observable `complete`时，输出符合条件的值
- 如果有多个符合条件的值，则会报错，即只能由一个值符合条件
```js
of(1,2,3,4).pipe(single(val=>val===2)).subscribe(data=>console.log(data));
// 2
of(1,2,3,4).pipe(single(val=>val%2===0)).subscribe(data=>console.log(data));
// 会报错
```