## sample
- 当提供的内部Observable发出数据时，发出源Observable的值
```js
interval(1000).pipe(
    sample(interval(2000))
).subscribe(data=>console.log(data));
// 1
// 3
// 5
```