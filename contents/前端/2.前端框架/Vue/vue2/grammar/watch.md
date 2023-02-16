## watch侦听器
- 一个更通用的方法，来相应数据的变化
- 当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

## watch侦听器的属性
- 如果直接赋值为一个function，则为处理函数
- 如果赋值为对象，则
  1. `deep`: 是否深层监听，默认为false。对于Object等应用类型来说，属性值改变时会监听不到。当将`deep`设置为true时，能够对应用类型的属性进行监听，避免属性值改变却没触发视图更新的问题。但是会影响性能
  2. `immediate`：是否立即执行，默认为false。控制侦听器创建时是否立即执行一次处理函数。如果为true，则立即执行
  3. `handler`：处理函数，会传递newValue和oldValue这两个值。
- 如果赋值为数组，则当作处理函数，依次执行
- 可以使用组件实例的 `$watch` 方法来命令式地创建一个侦听器`this.$watch('question', (newQuestion) => {}` 
- - 手动停止watch侦听器
```js
const unwatch = this.$watch('foo', callback)

// ...当该侦听器不再需要时
unwatch()
```