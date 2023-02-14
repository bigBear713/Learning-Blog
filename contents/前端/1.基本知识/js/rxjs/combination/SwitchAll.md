## switchAll
- 当源Observable有发送出新的数据时，会将observer切换成源Observable
```js
new Observable(o=>{
    let i=0;
    setInterval(()=>o.next(i++),2000);
}).pipe(
    map(val=>new Observable(o=>{
        setTimeout(()=>{
            o.next(`a-${val}`);
        },1000);
        // 因为源Observable发出新的数据后，订阅的Observable会被切换成源Observable, 所以内部Observable新的数据不会再被订阅到
        setTimeout(() => {
          o.next(`aa-${val}`);
        }, 3000);
    })),
    switchAll(),
).subscribe(data=>console.log(data));
// a-0
// a-1
// a-2
```
