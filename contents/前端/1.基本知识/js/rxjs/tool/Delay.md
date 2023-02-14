## delay
- 根据给定的值，延迟发出Observable发出的值
```js
of(1,2,3).pipe(delay(1000)).subscribe(data=>console.log(data));
// 1s后
// 1
// 2
// 3
```