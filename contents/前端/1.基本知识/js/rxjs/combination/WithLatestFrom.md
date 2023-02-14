## withLatestFrom
- 同时订阅另一个Observable的最新值
- 订阅的值为数组，第一个元素为源Observable的数据，第二个才是提供的另一个Observable的最新的数据。
- 订阅的值为数组，且数组长度固定为2.当有多个withLatestFrom时，数组第一个元素也是 一个数组，取前两个可观察对象的值
```js
of(1,2,3,4).pipe(
    withLatestFrom(new Observable(o=>{
        o.next(11);
        setTimeout(()=>o.next(12),100);
    })),
    withLatestFrom(of(21,22,23,24)),
).subscribe(data=>console.log(data));
// [[1,11],24]
// [[2,11],24]
// [[3,11],24]
// [[4,11],24]
```