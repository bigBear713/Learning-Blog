## lifeCycle生命周期
- beforeCreate - 组件实例被创建之初
- created - 组件实例已经完全被创建
- beforeMount - 组件挂载之前
- mounted - 组件已经被挂载到实例上之后
- beforeUpdate- 组件数据发生变化，更新之前
- updated - 组件数据更新之后
- beforeDestroy - 组件实例销毁之前
- destroyed - 组件实例销毁之后
- activated - keep-alive缓存的组件激活时
- deactivated - keep-alive缓存的组件被停用时调用
- errorCaptured - 捕获一个来自子孙组件的错误时被调用

---

## beforeCreated
- 组件实例刚创建之初
- 此时组件实例只有 `Event` 和 `lifeCycle` ，其它的都还没创建

---

## created
- 组件实例被创建之后
- 此时 `props` ， `data` ， `methods` 已经被初始化，可以开始被调用
- `props` 最早被初始化

---

## beforeMount
- 组件被挂载之前
- 此时开始解析 `template` 模板，执行vue中的指令。在内存中生成一个编译好的模板字符串。然后将这模板字符串渲染成内存中的DOM
- 此时只是在内存中渲染好DOM，并未把模板挂载到页面中去，页面中的内容还是旧的

---

## mounted
- 组件已经挂载到实例上之后
- 此时将内存中的 `$el` -- 模板内容，替换到页面中
- 因此，如果要对页面进行DOM操作，最早需要在 `mounted` 中。
- 执行完 `mounted` ，就表示vue实例已经初始化完毕，脱离创建阶段，进入运行阶段
- 数据请求在 `created` 和 `mounted` 的区别：放在`mounted`中的请求有可能导致页面闪动（因为此时页面dom结构已经生成），但如果在页面加载前完成请求，则不会出现此情况。建议对页面内容的改动放在`created`生命周期当中。
  
---

## beforeUpdate
- 在页面中的数据更新之前
- 此时实例中`data`中的数据是最新的，页面中的数据还是旧的
- 执行`re-render`和`patch`两个方法：会根据data中的数据，在内存中渲染出一份最新的DOM，然后再把更新的虚拟DOM-data重新渲染到页面view中去

---

## updated
- 在页面中的数据更新之后
- 此时页面中的数据已经和实例中的`data`中的数据保持同步，都是最新的
- 若在`updated`中再次修改数据，会再次触发更新方法（`beforeUpdate`、`updated`）

---

## beforeDestroy
- 组件实例被销毁之前
- 此时组件实例已经进入销毁阶段。但`data`，`methods`等都仍可用，还没开始被销毁
- 若在`beforeUpdate`中再次修改数据，不会再次触发更新方法

---

## destroyed
- 组件实例已经被销毁
- 此时组件实例已经完全被销毁，`data`、`props`和`methods`等都不可用
- 并不能清除DOM，仅仅销毁实例

---

## activated
- 使用keep-alive缓存组件时，当组件处于 `created` 时也会执行该钩子函数

---

## deactivated
- keep-alive缓存的组件被停用时调用

---

## 参考
- https://vue3js.cn/interview/vue/lifecycle.htm
