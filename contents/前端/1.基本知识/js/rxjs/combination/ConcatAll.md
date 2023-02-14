## concatAll
- 将所有内部Observables收集
- 按照顺序，当前一个Observable `complete`后，才开始订阅下一个Observable
```js
of(1, 2, 3).pipe(
    map(val => new Observable(o => {
    setTimeout(() => {
        o.next(`第${val}个内部Observable`);
        o.next(10);
        o.next(11);
        o.next(12);
        o.complete(); // 没有将该Observable设置为complete，无法订阅下一个Observable
    }, Math.random() * 1000);
    })),
    concatAll()
).subscribe(data => console.log(data))
// 第1个内部Observable
// 10
// 11
// 12

// 第2个内部Observable
// 10
// 11
// 12

// 第3个内部Observable
// 10
// 11
// 12
```