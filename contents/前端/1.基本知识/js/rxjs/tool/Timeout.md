## timeout
- 在指定的时间内不发出值，就报错
```js
of(1,2,3).pipe(
    delay(5000),
    timeout(3000)
).subscribe(
    data=>console.log('next'),
    eror=>console.log('error')
);
// 3s后，报错,触发error function
// error
```