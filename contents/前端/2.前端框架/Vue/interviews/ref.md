## vue3中的ref、toRef、toRefs

### ref
- 接收一个内部值，生成一个响应式数据。该内部值挂载在ref对象的`value`属性上
- 该对象可以用于模板和`reactive`。
- 使用`ref`是为了解决`setup`，`computed`，`合成函数`等情况下，响应式丢失的问题

### toRef
- 为响应式对象(reactive)的一个属性，创建对应的`ref`,且该方式创建的`ref`与源属性保持同步

### toRefs
- 将响应式对象(reactive)转换成普通对象，对象的每个属性都是对应的`ref`，两者之间保持同步。使用`toRefs`进行对象解构