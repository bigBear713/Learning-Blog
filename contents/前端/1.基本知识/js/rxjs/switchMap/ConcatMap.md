## concatMap
- 将源Observable映射成内部Observable，并按顺序订阅发出
- 如果源Observable发出了下一个值，内部Observable还没发出值，会先将源Observable新发出的值储存起来，等内部Observable发出了值，再映射发送源Observable新发出的值
- 如果内部Observable不是`complete`状态，则永远不会处理源Observable后续发出的值
```js
interval(2000).pipe(
    concatMap(
        value=>of(`the value is ${value}`) // 应是一个Observable，否则会自动转为Observable。比如 如果返回string，会转成of(string)
    )
).subscribe(data=>console.log(data));

interval(2000).pipe(
  concatMap(value=>{
    return new Observable(o=>{
      o.next(`the value is ${value}`);
      // 如果没有complete，则永远不会处理源Observable后续发出的值
      setTimeout(()=>o.complete(),1000*5)
    }); 
  })
).subscribe(data=>console.log(data));
```
- concatMap = map + concatAll

## 和mergeMap的区别
- [link]()