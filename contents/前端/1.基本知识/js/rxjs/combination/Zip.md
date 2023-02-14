## zip
- 会订阅所有内部Observable，然后等待每个发出一个数据流。
- zip第几次次订阅到的值，都是内部Observable相应第几次发出的值。也因此，当某个内部Observable为`complete`后，其它内部Observable发出对应的第几次的数据流后，会被取消订阅
- 订阅到的数据流是一个数组，顺序和订阅的所有内部Observable的顺序保持一致
```js
zip(
    of(1,2,3,4),
    of(11,12,13).pipe(delay(1000)), // 因为这个Observable发出3次值后就complete，所以两外两个Observable的4，24没机会发出就complete
    of(21,22,23,24).pipe(delay(1000*2)),
).subscribe(data=>console.log(data));
// 2s后
// [1, 11, 21]
// [2, 12, 22]
// [3, 13, 23]
```

## 和forkJoin的区别