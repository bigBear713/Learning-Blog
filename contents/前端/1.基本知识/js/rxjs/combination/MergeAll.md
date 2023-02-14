## mergeAll
- 将所有内部Observables收集,并订阅
- 订阅是并行的，所以顺序不能保证
- `concatAll`的订阅是串行的
```js
of(1, 2, 3).pipe(
    map(val => new Observable(o => {
    setTimeout(() => {
        o.next(`第${val}个内部Observable`);
        o.next(10);
        o.next(11);
        o.next(12);
    }, Math.random() * 1000);
    })),
    mergeAll()
).subscribe(data => console.log(data))
// 因为是并形订阅，所以顺序和源Observable中的不同
// 第3个内部Observable
// 10
// 11
// 12

// 第1个内部Observable
// 10
// 11
// 12

// 第2个内部Observable
// 10
// 11
// 12
```
```