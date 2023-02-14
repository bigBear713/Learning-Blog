## Subject
- 是一个Observable，也是一个Observer。即它既可以接收Observable发出的数据流，也能向订阅它的Observer发出数据
- 可以对内部的observers列表进行多播
- `Subjects` 是将任意 `Observable` 执行共享给多个观察者的唯一方式
- 3种变体
  1. BehaviorSubject
  2. ReplaySubject
  3. AsyncSubject


## BehaviorSubject
- 在有新的订阅时，会额外发出最近一次发出的值的Subject。
- 即新的observer开始订阅时，能立马订阅获取到最新的值

## ReplaySubject
- 会保存所有值，然后回放给新的observer。同时它提供了入参用于控制重放值的数量（默认重放所有）
- 即新的observer开始订阅时，能立马获取这个可观察对象之前发送出来的值，数量可控
- 获取之前发送出来的值时，也是一次次触发next function

## AsyncSubject
- 只有当 Observable 执行完成时(执行`complete()`)，才会将执行的**最后一个值**发送给观察者
- 如果因**异常**而终止，AsyncSubject将不会释放任何数据，但是会向Observer传递一个异常通知。