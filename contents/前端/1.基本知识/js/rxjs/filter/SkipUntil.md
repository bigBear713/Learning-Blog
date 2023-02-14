## skipUntil
- 一直忽略Observable发出的值，直到提供的Observable发出数据
```js
    new Observable(o => {
      o.next(1);
      setTimeout(() => o.next(10), 5000)
    }).pipe(
      skipUntil(of(1).pipe(delay(2000)))
    ).subscribe(data => console.log(data));
    // 10
    // 只会输出10，因为输出1的时候，内部Observable of()还没发出数据
```