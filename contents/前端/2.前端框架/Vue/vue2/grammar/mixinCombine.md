## mixin混入
- 混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能
- 一个混入对象可以包含任意组件选项。
- 当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。
- 即将一些组件的公共配置抽取出来，在定义其它组件，且需要这些配置的时候，将它们合并，得出一个完整的组件配置
```js
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

### 选项合并
- 当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。
- 数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先
- 同名钩子函数将合并为一个数组，因此都将被调用
- 混入对象的钩子将在组件自身钩子之前调用
- 值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。
- 两个对象键名冲突时，取组件对象的键值对。
- `Vue.extend()` 也使用同样的策略进行合并。

### 全局混入
- 混入也可以进行全局注册。使用时格外小心！
- 一旦使用全局混入，它将影响**每一个**之后创建的 Vue 实例 (包括第三方组件)
- 使用恰当时，这可以用来为自定义选项注入处理逻辑。
- 大多数情况下，只应当应用于自定义选项

### 自定义选项合并策略
- 自定义选项将使用默认策略，即简单地覆盖已有值
- 如果想让自定义选项以自定义逻辑合并，可以向 Vue.config.optionMergeStrategies 添加一个函数：
- 对于多数值为对象的选项，可以使用与 methods 相同的合并策略：
```js
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // 返回合并后的值
}

// 使用与 methods 相同的合并策略
var strategies = Vue.config.optionMergeStrategies
strategies.myOption = strategies.methods
```

## 自定义指令
- 需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令
```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```
- 注册局部指令：组件中也接受一个 `directives` 的选项
```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

### 钩子函数
- 一个指令定义对象可以提供如下几个钩子函数 (均为可选)：
  1. `bind` - 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
  2. `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  3. `update`：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
  4. `componentUpdated`：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
  5. `unbind`：只调用一次，指令与元素解绑时调用。
- 钩子函数参数： 除了 `el` 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 `dataset` 来进行。
  1. `el`：指令所绑定的元素，可以用来直接操作 DOM。
  2. `binding`：一个对象，包含以下 property：
   - `name`：指令名，不包括 v- 前缀。
   - `value`：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
   - `oldValue`：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
   - `expression`：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
   - `arg`：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
   - `modifiers`：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
  3. `vnode`：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
  4. `oldVnode`：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

### 动态指令参数
- 指令的参数可以是动态的。例如，在 v-mydirective:[argument]="value" 中，argument 参数可以根据组件实例数据进行更新！这使得自定义指令可以在应用中被灵活使用。
```js
// <div id="dynamicexample">
//   <h3>Scroll down inside this section ↓</h3>
//   <p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
// </div>
new Vue({
  el: '#dynamicexample',
  data: function () {
    return {
      direction: 'left'
    }
  }
})

// 定义pin组件
Vue.directive('pin', {
  bind: function (el, binding, vnode) {
    el.style.position = 'fixed'
    var s = (binding.arg == 'left' ? 'left' : 'top')
    el.style[s] = binding.value + 'px'
  }
})

```

### 函数简写
- 想在 bind 和 update 时触发相同行为，而不关心其它的钩子
```js
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

### 对象字面量
- 如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式。
```js
// <div v-demo="{ color: 'white', text: 'hello!' }"></div>
Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text)  // => "hello!"
})
```
