## Observable可观察对象
- 可以被订阅观察
- 数据是一个流的形式，即可以不断发出值
- 可以通过**管道**操作符对数据流进行转换处理
- 有3种状态：活跃中，错误，完成。只有当它不再会发出值(发出值的实例失去引用，相应内存被释放时)，或者为错误状态，或者完成状态时，内存才会被释放
- 通过对Observable进行`.subscribe()`，订阅它发出的数据流。
- `.subscribe()`接收3个参数：`next:function(value){}`,`error:function(err){}`,`complete:function(){}`。
  1. 活跃中时，数据流在next function中接收、处理。每发出一次数据，都会触发一次next function，除非它处于`complete`状态，或者被取消订阅
  2. 当发生错误时，会触发error function，带有错误信息。只会触发一次，此时可观察对象被关闭。
  3. 当可观察对象处于完成状态时，会触发complete function。此时不会带有任何参数。
- 只有被`.subscribe()`了，这个可观察对象才会被执行。
- 可通过`.unsubscribe()`取消订阅。取消订阅后，可观察对象再发出任何值，都接收不到。
- 可通过`.toPromise()`将Observable转为`Promise`，此时只有当Observable为`complete`或`error`状态时，才会触发`.then()`或`.catch()`方法。

## 创建Observable
```js
// 创建
const ob$:observer = new Observable(o=>{
    for(let i of 10){
      o.next(i);
    }
    // 将Observable设置为complete状态
    o.complete();
    // 将Observable设置为error状态
    // o.error('error info');
});
// 订阅
const sub = ob$.pipe(
  // operators
  map(value=>value),
  filter(value=>!!value),  
).subscribe(
    data=>console.log(data), // next function, 此处会打印出0,1,2,3,4,5,6,7,8,9
    err=>console.error(err), // err function
    ()=>{} // complete function
);
// 取消订阅
sub.unsubscribe();
```
- 使用`new`关键字
- observer可以通过`.pipe()`实现对数据流的处理

## Subscription
- 订阅Observable后，得到的就是一个`Subscription`类型的实例。
- 可用来取消对Observable的订阅
- 可通过`.add()`取消多个订阅

## 单播和多播
### 单播
- 单播，即一个Observable只能被一个observer订阅观察。
- 当被其它observer订阅观察时，会产生一个新的实例。新的实例都是**从头开始**把值发给相应的observer
- 普通的Observable是单播的

### 多播
- 多播，即一个Observable能被多个observer订阅观察。新的observer不管何时开始订阅，接收到的值都是最新的值，而不是从头开始
- `Subject`是实现多播的唯一方式

## Cold-Observables与Hot-Observables
### Cold Observables
- 只有被 observers 订阅的时候，才会开始产生值
- 是单播的，有多少个订阅就会生成多少个订阅实例。每个订阅都是从第一个产生的值开始接收值，所以每个订阅接收到的值都是一样的。
### Hot-Observables
- 不管有没有被订阅都会产生值
- 是多播的。多个订阅共享同一个实例，是从订阅开始接受到值，每个订阅接收到的值是不同的，取决于它们是**从什么时候**开始订阅。

## Operators
- 采用函数式编程风格的纯函数 (pure function)，使用像 map、filter、concat、flatMap 等这样的操作符来处理集合
- 调用任意的操作符时都**不会改变**已存在的Observable实例，而是会在原有的基础上返回一个新的Observable。

## 参考
- https://juejin.cn/post/6910943445569765384