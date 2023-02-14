## bufferTime
- 与`buffer`类似，将Observable发出的值存储到缓存区，直到设定的时间后，或Observable为`complete`时才发出值
```js
interval(1000).pipe(bufferTime(3000)).subscribe(data=>console.log(data));
// [0]
// [1,2,3]
// [4,5]
// [6,7]
```