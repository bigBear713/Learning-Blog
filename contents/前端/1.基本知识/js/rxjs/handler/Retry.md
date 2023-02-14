## retry
- 当Observable报错时，可重试
```js
interval(1000).pipe(
    mergeMap(val => {
        // 抛出错误以进行演示
        if (val > 5) {
            return throwError('Error!');
        }
        return of(val);
    }),
    // 出错的话可以重试2次
    retry(2)
).subscribe(
    val => console.log(val),
    err => console.log(`${err}: Retried 2 times then quit!`)
)
//   0..1..2..3..4..5..
//   0..1..2..3..4..5..
//   0..1..2..3..4..5..
//  "Error!: Retried 2 times then quit!"
```