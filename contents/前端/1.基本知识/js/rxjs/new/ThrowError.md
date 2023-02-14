## throwError
- 创建一个状态为error的Observable
```js
 throwError(()=>new Error('error info')).subscribe(()=>{},err=>console.error(err));
 // error info
```