## concatWith
- 只有当源Observable`complete`后，**才能**开始内部的Observable
```js
of(1,2,3).pipe(
  concatWith(
    of(5,6,7) // 内部的Observable
  )
).subscribe(data=>console.log(data));
// 1
// 2
// 3
// 5
// 6
// 7
```

## concatMap
- [link]()