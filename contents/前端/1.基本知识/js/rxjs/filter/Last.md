## last
- 当Observable为`complete`时，才发出它最后一个值
- 和`first`相反
```js
of(1,2,3).pipe(last()).subscribe(data=>console.log(data))
// 3
```