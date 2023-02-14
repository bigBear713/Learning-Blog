## every
- Observable发出的每个数据都符合条件，则返回true，否则返回false
- 和数组的every方法类似
```js
of(1,2,3).pipe(every(val=>val>2)).subscribe(data=>console.log(data))
// false
```