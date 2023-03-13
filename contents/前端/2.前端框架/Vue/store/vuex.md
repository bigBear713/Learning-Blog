## Vuex
- 背后基本思想借鉴了Flux
- 核心内容
  1. module - 数据模块。每个数据模块的`state`,`getter`等都是独立的
  2. state - 整个应用的状态管理单例，等效于Vue中的`data`，对应Flux中的`store`
  3. getter - 可由`state`中的数据派生而成，等同于计算属性`computed`。能自动实现依赖的收集，以便实现计算属性的缓存
  4. mutation - 类似于事件，包含一个类型名和回调函数。回调函数中可对`state`中的数据**同步**修改。
  5. action - 内部操作没有限制，可以进行任意的**异步**操作。需要通过`dispatch`方法来触发action操作。同样的，参数包含类型名`type`和负载`payload`

---

## module
- 每个`module`中，都有独立的`state`,`getter`,`mutation`,`action`
- 可以通过`module.registerModule`动态注册模块
- 支持模块的相互嵌套，可以通过设置命名空间来进行数据和操作隔离

---

## mutation
- Vuex不允许直接调用该函数，而是需要通过`store.commit()`提交一个操作，并将参数传入回调函数中
- `commit()`的参数也可以是一个对象，和Flux中的`action`对象一样，包含类型名`type`和负载`payload`
- 这里要求`mutation`中回调函数的操作一定是同步的。这是因为同步的、可序列化的操作步骤能保证生成唯一的日志记录，才能使devtools能够实现对状态的追踪，实现time-travel

---

## action
- action的操作本质上脱离了Vuex本身，加入将它剥离出来，仅仅在开发者代码中调用`commit`来提交一个`mutation`也能达到一样的效果

---

## 参考
- https://juejin.cn/post/7207848485856100410