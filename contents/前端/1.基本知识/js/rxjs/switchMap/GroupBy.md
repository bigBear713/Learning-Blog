## groupBy
- 根据所给条件，对Observable发出的值进行分组
```js
    of(1, 2, 3, 4, 5).pipe(
      groupBy(val => val > 2), // 返回的是Observable
      mergeMap(group => group.pipe(toArray()))
    ).subscribe(data => console.log(data))
    // [1,2]
    // [3,4,5]
```