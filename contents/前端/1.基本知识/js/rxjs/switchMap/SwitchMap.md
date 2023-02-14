## switchMap
- 将源Observable发出的数据流映射成内部Observable发出的数据流
- 当源Observable发出新的数据流时，上一次的内部Observable就会被取消订阅，切换到这次新数据流产生的新的内部Observable，并进行订阅
- 即源Observable每发出一次数据流，就重置内部Observable
```js
new Observable(o=>{
    let i=0;
    setInterval(()=>o.next(i++),2000);
}).pipe(
    switchMap(val=>new Observable(o=>{
        setTimeout(()=>{
            o.next(`a-${val}`);
        },1000);
        // 因为源Observable发出新的数据后，订阅的Observable会被切换成源Observable, 所以内部Observable新的数据不会再被订阅到
        setTimeout(() => {
          o.next(`aa-${val}`);
        }, 3000);
    }))
).subscribe(data=>console.log(data));
// a-0
// a-1
// a-2
```
- switchMap = map + switchAll

