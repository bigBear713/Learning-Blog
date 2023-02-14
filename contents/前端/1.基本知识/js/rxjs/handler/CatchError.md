## catchError
- 处理错误的操作符
- 需返回一个Observable
```js
throwError(()=>new Error('error info')).pipe(catchError(err=>of(err))).subscribe(data=>console.log(data),err=>console.error(err));
// 在next function中输出error info
```