## bufferWhen
- 类似于`buffen`，将Observable发出的值存储在缓冲区，直到内部Observable发出值才将缓冲区中的值发出。
- 将缓冲区中的值发出清空后，又开始缓存，等待内部Observable下次发出值
```js
const signal$ = interval(5000);
interval(1000).pipe(bufferWhen(signal$)).subscribe(data=>console.log(data));
// 5s后
// [1,2,3,4,5]
// 又5s后
// [6,7,8,9,10]
```