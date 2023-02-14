## merge
- 将多个Observable合并成一个Observable
- 某个Observable发送一次数据，就触发next function
- 并行订阅
```js
  merge(
      new Observable(o => {
        o.next('a');
        setTimeout(() => {
          o.next('b');
          o.complete();
        }, 1000 * 6)
      }),
      of(1, 2, 3),
      of(11, 12),
      of(21).pipe(delay(1000 * 5))
    ).subscribe(data => console.log(data));
    // 'a'
    // 1
    // 2
    // 3
    // 11
    // 12
    // 21 // 5s后
    // 'b' // 6s后
```