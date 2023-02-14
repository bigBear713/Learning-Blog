## race
- 对所有内部Observable订阅，使用最先发出数据的那个Observable的数据
```js
race(
    of(1,2,3).pipe(delay(1000*3)),
    // 因为这个最先输出数据，因此后续都是使用这个Observable的数据流
    new Observable(o=>{
        o.next(11);
        setTimeout(()=>o.next(12),1000)
    }),
    of(21,22,23).pipe(delay(1000*1)),
).subscribe(data=>console.log(data));
// 11
// 12 // 1s后
```