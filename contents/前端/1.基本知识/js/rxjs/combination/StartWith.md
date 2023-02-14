## startWith
- 最先发出的值。
- 在发出源Observable的数据流前
```js
of(1, 2, 3).pipe(
    delay(1000),
    startWith(666)
).subscribe(data => console.log(data));
// 666
// 1s后
// 1
// 2
// 3
```