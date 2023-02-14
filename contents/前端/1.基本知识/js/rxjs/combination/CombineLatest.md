## combineLatest
- 内部每个Observable都至少发出一次数据后，才触发next function
- 然后只要有一个内部Observable发出数据，都会触发一次next function。订阅到的值是各个内部Observable最新发出的值
```js
combineLatest([
    timer(1000, 4000),
    timer(2000, 4000),
    timer(3000, 4000),
]).subscribe(data => console.log(data));
// [0,0,0] // 3s才开始第一个输出值，因为有个timer是在第3s才发出第一个值
// [1,0,0] // 4s
// [1,1,0] // 5s
// [1,1,1] // 6s
// [2,1,1] // 7s
// [2,2,1] // 8s
// [2,2,2] // 9s
```