## filter
- 根据条件过滤数据流，和数组的filter类似
```js
of(1,2,3,4).pipe(
    filter(val=>val%2===0)
).subscribe(data=>console.log(data))
// 2
// 4
```