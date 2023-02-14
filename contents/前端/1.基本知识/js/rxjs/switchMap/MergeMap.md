## mergeMap
- 将源Observable发出的数据流映射成内部Observable
- 一个数据流对应一个内部Observable实例
- 同时对这些内部Observable实例进行订阅
- 内部Observable有传出数据流就触发next function，不必等前一个内部Observable `complete`了再订阅发出下一个内部Observable的数据流。
- 因此next function传递的值可能和源Observable的值的顺序不同
```js
const mapFn = (val: any, type: string) => new Observable(o => {
    o.next(`${type}: the value is ${val} - 1`);
    setTimeout(() => o.next(`${type}: the value is ${val} - 2`), Math.random()*10000);
});
of(1, 2, 3).pipe(
    mergeMap(val => mapFn(val, 'mergeMap'))
).subscribe(data=>console.log(data));
// mergeMap: the value is 1 - 1
// mergeMap: the value is 2 - 1
// mergeMap: the value is 3 - 1

// mergeMap: the value is 1 - 2 // 可能是1.5s后再输出
// mergeMap: the value is 2 - 2 // 可能是0，5s先输出
// mergeMap: the value is 3 - 2 // 可能是2s后输出
```

## 和concatMap的区别
- `concatMap`是要求前一个内部Observable完成后，再订阅发出下一个内部Observable的数据流
- `mergeMap`则是同时订阅所有内部Observable，有值就及时响应next function
```js
const source$ = of(1,2,3);
const mapFn = (val, type)=>new Observable(o=>{
    o.next(`${type}: the value is ${val} - 1`);
    setTimeout(()=>o.next(`${type}: the value is ${val} - 2`),1000);
});
source$.pipe(
    mergeMap(val=>mapFn(val, 'mergeMap'))
).subscribe(data=>console.log(data));
// mergeMap: the value is 1 - 1
// mergeMap: the value is 2 - 1
// mergeMap: the value is 3 - 1
// 1s后
// mergeMap: the value is 1 - 2
// mergeMap: the value is 2 - 2
// mergeMap: the value is 3 - 2

source$.pipe(
    concatMap(val=>mapFn(val, 'concatMap'))
).subscribe(data=>console.log(data));
// concatMap: the value is 1 - 1
// 1s后
// concatMap: the value is 1 - 2
// 不会输出其它值
```