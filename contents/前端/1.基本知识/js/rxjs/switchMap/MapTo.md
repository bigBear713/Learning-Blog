## mapTo
- 忽略源Observable发送的数据流，只发送指定的的值
```js
of(1,2,3).pipe(
    mapTo(666)
).subscribe();
// 666
// 666
// 666
```