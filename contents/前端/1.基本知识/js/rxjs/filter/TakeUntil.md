## takeUntil
- 接收源Observable发出的值，直到提供的内部Observable发出值
- 常用于取消源Observable的订阅
```js
const sub$ = new Subject();
interval(1000).pipe(takeUntil(sub$)).subscribe(data=>console.log(data));
setTimeout(()=>sub$.next(),2000);
// 0
// 1
```