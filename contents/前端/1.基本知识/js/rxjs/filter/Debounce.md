## debounce
- 传入一个函数参数，舍弃掉在两次输出之间小于指定时间的发出值。
```js
of(1,2,3,4,5).pipe(debounce(()=>timer(1000))).subscribe(data=>console.log(data))
// 5
// 只会输出5，因为debounce(()=>timer(1000))让每次输出数据都要等1s。1s内又有新的数据过来，因此之前的会被舍弃
```