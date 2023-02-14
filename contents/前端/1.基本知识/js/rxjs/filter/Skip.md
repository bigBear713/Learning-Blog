## skip
- 跳过源Observable发出的前几个数据流
- 和`take`相反
```js
of(1,2,3,4,5,6).pipe(
    skip(2)
).subscribe(data=>console.log(data));
// 3
// 4
// 5
// 6
```