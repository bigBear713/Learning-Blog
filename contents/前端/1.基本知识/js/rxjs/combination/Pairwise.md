## pairwise
- 将前一个值和当前值，合成数组发出
- 至少将会发出2个数据，否则会订阅不到数据
```js
    of(1, 2, 3).pipe(
      pairwise()
    ).subscribe(data => console.log(data));
    // [1,2]
    // [2,3]
```