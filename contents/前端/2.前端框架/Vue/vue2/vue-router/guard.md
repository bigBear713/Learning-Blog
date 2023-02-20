## guard路由守卫
- 全局路由守卫函数：`beforeEach`，`afterEach`
- 单个路由守卫函数：`beforeEnter`
- 组件内路由守卫函数：`beforeRouteEnter`, `beforeRouteLeave`, `beforeRouteUpdate`

---

## 全局路由守卫函数
### beforeEach
- 是一个全局的before钩子函数
- 每次、每个路由改变前，都需执行一次
- 参数
  1. to - Route路由对象，即将要进入的目标
  2. from - Route路由对象，当前导航正要离开的路由
  3. next - Function函数，通过调用该函数resolve这个钩子，才能到下一步。参数为空时，会到下一个钩子。如果已经是最后一个钩子，路由的状态就变成`confirm`

### afterEach
- 是一个全局的after钩子函数
- 在页面加载之后执行。而 `beforeEach` 是在页面加载之前执行
- 参数和 `beforeEach` 一样

---

## 单个路由守卫函数beforeEnter
- 进入某个路由时执行
- 参数和 `beforeEach` 一样

---

## 组件内路由守卫函数
- 写在组件内，在组件内执行
  
### beforeRouteEnter
- 在渲染该组件的对应路由被 `confirm` **前**调用
- 无法获取组件实例`this`，因为钩子执行前，组件实例还没创建
- 参数和 `beforeEach` 一样

### beforeRouteUpdate
- 在当前路由改变前，但是该组件被复用时调用。比如对于一个带有动态参数的路由`/foo/:id`，在`/foo/1`和`/foo/2`之间跳转的时候，由于会渲染同一个组件，所以组件实例会被复用
- 能够访问组件实例`this`
- 参数和 `beforeEach` 一样

### beforeRouteLeave
- 导航离开当前组件的对应路由时调用
- 可以访问组件实例`this`
- 参数和 `beforeEach` 一样