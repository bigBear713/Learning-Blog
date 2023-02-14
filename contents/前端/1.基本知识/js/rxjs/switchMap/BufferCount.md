## bufferCount
- 和`buffer`类似，将Observable发出的值缓存，直到达到设定的个数,或者Observable为`complete`才向外发出
```js
of(1,2,3,4,5).pipe(
    bufferCount(3)
).subscribe(data=>console.log(data))
// [1,2,3]
// [4,5]
```