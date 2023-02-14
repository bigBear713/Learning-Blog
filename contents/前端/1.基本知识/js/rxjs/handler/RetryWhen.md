## retryWhen
- 当Observable报错时，自定义retry的条件
```js
interval(1000).pipe(
    map(val => {
        // 抛出错误以进行演示
        if (val > 5) {
            // 错误将由 retryWhen 接收
            throw val;
        }
        return val;
    }),
    retryWhen(errors =>
        errors.pipe(
            // 输出错误信息
            tap(val => console.log(`Value ${val} was too high!`)),
            // 5秒后重启
            delayWhen(val => timer(val * 1000))
        )
    )
).subscribe(
    val => console.log(val),
    err => console.log(`${err}: Retried 2 times then quit!`)
)
//   0
//   1
//   2
//   3
//   4
//   5
//   "Value 6 was too high!"
//   --等待5秒后然后重复此过程
```