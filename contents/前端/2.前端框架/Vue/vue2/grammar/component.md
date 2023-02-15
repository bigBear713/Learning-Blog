## component组件
- 组件是可复用的 Vue 实例，且带有一个名字
- 可以将组件进行任意次数的复用
- `data`必须是一个**函数**，因此每个实例可以维护一份被返回对象的独立的拷贝。如果 Vue 没有这条规则，调整某个组件的某个属性，就会影响到其它同类型的组件的实例上的同个属性

## 结构
```js
import AAAComponent from './aaa.component.vue';
export default {
    components:{
        'comp-a':AAAComponent,
        'comp-b':BBBComponent
    },
    // inheritAttrs: false,
    props:['prop1','prop2'],
    model: {
        prop: 'prop2',
        event: 'change'
    },
    data:()=>{
        return {
            data1:'value',
        };
    },
    watch:{
        //  如果prop1的值发生改变，这个函数会执行
        prop1:function(newVal, oldVal){}
    },
    created:function(){},
    methods:{
        fetchList:function(){}
    },
    computed:{
        fullName:{
            get:function(){},
            set:function(){}
        },
        firstName:function{
            return '';
        }
    },
}
```
- components: 局部注册组件的对象，以便组件在当前组件使用。其 property 名就是自定义元素的名字，其 property 值就是这个组件的选项对象。
- props：在组件上注册的一些自定义 `attribute`。
- data：存放组件的属性，必须是一个函数
- watch: 侦听器属性，对属性进行侦听，当属性值发生改变时，会执行相应的函数
- created：
- methods：存放方法的属性
- computed：计算属性，存放一些需要计算、又不常变化的值
- model:一个对象，针对自定义`v-model`，需要`prop`和`event`两个属性。其中`event:change`固定

## Props
- 在组件上注册的一些自定义 `attribute`
- 当一个值传递给一个 prop attribute 的时候，它就变成了那个组件实例的一个 property
- 一个组件默认可以拥有任意数量的 prop，任何值都可以传递给任何 prop
- prop的大小写(camelCase vs kebab-case)：HTML 中的 attribute 名是大小写**不敏感**的，所以浏览器会把**所有**大写字符解释为**小写字符**
- 传递prop值：如果没有使用`v-bind`，直接通过attribute，则当作字符串处理；使用`v-bind`后，可传入number, boolean等其它类型的值
- 如果想传入一个对象的所有 property，可以使用不带参数的`v-bind`
```html
<blog-post v-bind="post"></blog-post>
<!-- 等价于 -->
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>
```

### Props类型
- 使用对象形式列出props，可给每个prop指定类型
- 指定prop类型，会在它们遇到错误的类型时从浏览器的 JavaScript 控制台提示用户
```js
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```

### 单向数据流
- 所有的 prop 都使得其父子 prop 之间形成了一个**单向下行**绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。
- 每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop
- 常见试图变更一个 prop 的情形：
  1. 这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。在这种情况下，最好定义一个本地的 data property 并将这个 prop 用作其初始值。
  2. 这个 prop 以一种原始的值传入且需要进行转换。在这种情况下，最好使用这个 prop 的值来定义一个计算属性
- JavaScript 中对象和数组是通过**引用**传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身将**会影响到父组件**的状态。
```js
{
    props: ['initialCounter','size'],
    data: function () {
        return {
            counter: this.initialCounter
        }
    },
    computed: {
        normalizedSize: function () {
            return this.size.trim().toLowerCase()
        }
    }
}
```

### Prop验证
- 为了定制 prop 的验证方式，你可以为 props 中的值提供一个带有验证需求的**对象**，而不是一个字符串数组
- 当 prop 验证失败的时候，(开发环境构建版本的) Vue 将会产生一个控制台的警告
- prop 会在一个组件实例创建之前进行验证，所以实例的 property (如 `data`、`computed` 等) 在 `default` 或 `validator` 函数中是不可用的
- 类型检查： `type` 可以是下列原生构造函数中的一个。`type` 还可以是一个自定义的构造函数，并且通过 instanceof 来进行检查确认
  1. String
  2. Number
  3. Boolean
  4. Array
  5. Object
  6. Date
  7. Function
  8. Symbol
```js
function Person (firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}
{
    props: {
        // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
        propA: Number,
        // 多个可能的类型
        propB: [String, Number],
        // 必填的字符串
        propC: {
            type: String,
            required: true
        },
        // 带有默认值的数字
        propD: {
            type: Number,
            default: 100
        },
        // 带有默认值的对象
        propE: {
            type: Object,
            // 对象或数组默认值必须从一个工厂函数获取
            default: function () {
                return { message: 'hello' }
            }
        },
        // 自定义验证函数
        propF: {
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['success', 'warning', 'danger'].includes(value)
            }
        },
        propG: Person
  }
}
```

### 非 Prop 的 Attribute
- 一个非 prop 的 attribute 是指传向一个组件，但是该组件并没有相应 prop 定义的 attribute。
- 此时会自动将这个attribute自动添加到组件的根元素上
- 如果你不希望组件的根元素继承 attribute，你可以在组件的选项中设置 `inheritAttrs: false`，但它不会影响`class`和`style`的绑定
- `$attrs` property 包含了传递给一个组件的 attribute 名和 attribute 值，因此可用来手动决定将外部的attr赋给组件内的哪些元素

### 合并\替换原有的attribute
- 对于绝大多数 attribute 来说，从外部提供给组件的值会替换掉组件内部设置好的默认值
- `class` 和 `style` attribute 会稍微智能一些，即两边的值会被合并起来，从而得到最终的值

## 单个根元素
- 每个组件必须只有一个根元素
- 可以将模板的内容包裹在一个父元素内，来修复这个问题

## 监听子组件事件
- 通过 `v-on` 监听子组件实例的任意事件
- 子组件可以通过调用内建的 `$emit` 方法，并传入**事件名**称来触发一个事件
- `$emit` 的第二个参数可以向父组件抛出一个值
- 父级组件监听这个事件的时候，可以通过 `$event` 访问到被抛出的这个值。如果这个事件处理函数是一个方法，那么这个值将会作为第一个参数传入这个方法
  
### 在组件上使用`v-model`
- 自定义事件也可以用于创建支持 v-model 的自定义输入组件
```html
<input v-model="searchText">
<!-- 等价于 -->
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
<!-- 当用在组件上时 -->
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
```

## 通过插槽分发内容
- 使用`<slot></slot>`实现内容从父组件到子组件的投影

### 编译作用域
- 插槽跟模板的其它地方一样可以访问相同的实例 property (也就是相同的“作用域”)，而不能访问 子组件 的作用域
- 规则：父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。
- 后备内容：即当没有内容投影进来时显示的内容。有时为一个插槽设置具体的后备 (也就是默认的) 内容是很有用的，它只会在没有提供内容的时候被渲染
```html
<button type="submit">
  <slot>Submit</slot>
</button>
```

### 具名插槽
- `<slot>`有个`name`属性，可以用来定义额外的插槽。`<slot name="header"></slot>`
- 一个不带 name 的 <slot> 出口会带有隐含的名字“default”
- 在向具名插槽提供内容的时候，我们可以在一个 <template> 元素上使用 `v-slot` 指令，并以 `v-slot` 的参数的形式提供其名称。任何没有被包裹在带有 `v-slot` 的 <template> 中的内容都会被视为默认插槽的内容。
```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

### 作用域插槽
- 让插槽内容能够访问子组件中才有的数据
```html
<!-- slotProps是定义在子组件current-user中的属性 -->
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```

### 独占默认插槽的缩写语法
- 被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样我们就可以把 v-slot 直接用在组件上
- 默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确。只要出现多个插槽，请始终为所有的插槽使用完整的基于 <template> 的语法
```html
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```

### 解构插槽 Prop
- `v-slot` 的值实际上可以是任何能够作为函数定义中的参数的 JavaScript 表达式。在支持的环境下 (单文件组件或现代浏览器)，你也可以使用 ES2015 解构来传入具体的插槽 prop
```html
<current-user v-slot="{ user: person }">
  {{ person.firstName }}
</current-user>

<current-user v-slot="{ user = { firstName: 'Guest' } }">
  {{ user.firstName }}
</current-user>
```

### 动态插槽名
- 动态指令参数也可以用在 v-slot 上，来定义动态的插槽名
```html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

### 具名插槽的缩写
- `v-slot` 也有缩写，把参数之前的所有内容 (v-slot:) 替换为字符 `#`
- 然而，和其它指令一样，该缩写只在其有参数的时候才可用。如果希望使用缩写的话，必须始终以明确插槽名取而代之
```html
<base-layout>
    <template #header>
        <h1>Here might be a page title</h1>
    </template>
    <!-- 这样会触发一个警告 -->
    <current-user #="{ user }">
    {{ user.firstName }}
    </current-user>
</base-layout>
```

## 动态组件
- 通过 Vue 的<component> 元素加一个特殊的 `is` attribute 来实现组件动态插入
- `is`的值可以是
  1. 已注册的组件的名字
  2. 一个组件的选项对象
- `is`可以用于常规 HTML 元素，但这些元素将被视为组件，这意味着所有的 attribute 都会作为 DOM attribute 被绑定。对于像 `value` 这样的 property，若想让其如预期般工作，你需要使用 `.prop` 修饰器
```html
<table>
  <tr is="'child-comp"></tr>
</table>
```
- 使用`is`切换显示的组件时，状态会丢失。如果想保持这些状态，可以使用`<keep-alive></keep-alive>`，以避免反复重新渲染导致的性能问题
- `<keep-alive>` 要求被切换到的组件都有自己的名字，不论是通过组件的 name 选项还是局部/全局注册

## 异步组件
- Vue 允许以一个工厂函数的方式定义组件，这个工厂函数会异步解析组件定义。
- Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染
```js
{
    components:{
        'my-component': () => import('./my-async-component')
    }
}
```
### 处理加载状态
- 异步组件工厂函数也可以返回一个如下格式的对象
```js
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```


## 解析 DOM 模板时的注意事项
- 有些 HTML 元素，诸如 <ul>、<ol>、<table> 和 <select>，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如 <li>、<tr> 和 <option>，只能出现在其它某些特定的元素内部。

## 组件注册
- 组件要注册后才能使用
- 分为`全局注册`和`局部注册`
  1. `全局注册` - 全局注册的组件可以用在其被注册之后的任何 (通过 new Vue) 新创建的 Vue 根实例，也包括其组件树中的所有子组件的模板中。
  2. `局部注册` - 只能在当前组件使用，在子组件中不可用。
- 全局注册往往是不够理想的，因为即便你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中
### 组件名
- 使用 kebab-case。当使用 kebab-case (短横线分隔命名) 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 <my-component-name>
- 使用 PascalCase。当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 <my-component-name> 和 <MyComponentName> 都是可接受的

### 基础组件的自动化全局注册
- 使用了 webpack (或在内部使用了 webpack 的 Vue CLI 3+)的前提下，使用 `require.context` 只全局注册这些非常通用的基础组件
- 全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建**之前**发生
```js
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```

## 自定义事件
### 事件名
- 不同于组件和 prop，事件名不存在任何自动化的大小写转换。而是触发的事件名需要**完全匹配**监听这个事件所用的名称
- 事件名不会被用作一个 JavaScript 变量名或 property 名，所以就没有理由使用 camelCase 或 PascalCase 了
- 推荐始终使用 kebab-case 的事件名。因为`v-on` 事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以 `v-on:myEvent` 将会变成 `v-on:myevent`——导致 myEvent 不可能被监听到。

### 自定义v-model
- 一个组件上的 `v-model` 默认会利用名为 value 的 prop 和名为 input 的事件
- 但是像单选框、复选框等类型的输入控件可能会将 value attribute 用于不同的目的
- `model` 选项可以用来避免这样的冲突
```html
<!-- prop1 的值将会传入这个名为 checked 的 prop -->
<base-checkbox v-model="prop1"></base-checkbox>
```
```js
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change' // 当 <base-checkbox> 触发一个 change 事件并附带一个新的值的时候，这个 checked 的 property 将会被更新
  },
  props: {
    checked: Boolean // 仍然需要在组件的 props 选项里声明 checked 这个 prop
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

### 将原生事件绑定到组件
- `$listeners` property，它是一个对象，里面包含了作用在这个组件上的所有监听器
- 通过`$listeners` property，配合 `v-on="$listeners"` 将所有的事件监听器指向这个组件的某个特定的子元素
```js
// 现在 <base-input> 组件是一个完全透明的包裹器了，也就是说它可以完全像一个普通的 <input> 元素一样使用了：
// 所有跟它相同的 attribute 和监听器都可以工作
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})
```

### .sync 修饰符
- 一种特殊的同步模式
- 带有 `.sync` 修饰符的 `v-bind` 不能和表达式一起使用 (例如 v-bind:title.sync=”doc.title + ‘!’” 是无效的)。取而代之的是，你只能提供你想要绑定的 property 名，类似 v-model。
- 当我们用一个对象同时设置多个 prop 的时候，也可以将这个 `.sync` 修饰符和 `v-bind` 配合使用
```html
<!--  子组件中：this.$emit('update:title', newTitle) -->
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>

<!-- 可简写成 -->
<text-document v-bind:title.sync="doc.title"></text-document>
<!-- 这样会把 doc 对象中的每一个 property (如 title) 都作为一个独立的 prop 传进去， -->
<!-- 然后各自添加用于更新的 v-on 监听器 -->
<text-document v-bind.sync="doc"></text-document>
```

## 处理边界情况
### 访问元素组件
- 绝大多数情况下，最好不要触达另一个组件实例内部或手动操作 DOM 元素
- 访问根实例：通过 `$root` property 进行访问
- 访问父级组件实例：`$parent` property 可以用来从一个子组件访问父组件的实例。可以在后期随时触达父级组件，以替代将数据以 prop 的方式传入子组件的方式
- 访问子组件实例或子元素：通过 `ref` 这个 attribute 为子组件赋予一个 ID 引用。当 `ref` 和 `v-for` 一起使用的时候，你得到的 ref 将会是一个包含了对应数据源的这些子组件的数组。$refs 只会在组件渲染完成之后生效，并且它们不是响应式的
```html
<base-input ref="usernameInput"></base-input>
<!-- js中使用 this.$refs.usernameInput -->
```

### 依赖注入
- `$parent` property 无法很好的扩展到更深层级的嵌套组件上
- 依赖注入解决更深层级的嵌套组件的通信上，提供`provide` 和 `inject`
- `provide` 选项允许指定想要提供给后代组件的**数据/方法**
- 在任何后代组件里，都可以使用 `inject` 选项来接收指定的我们想要添加在这个实例上的 property
```js
// 父组件中
provide: function () {
  return {
    getMap: this.getMap
  }
}

// 某个子组件中
inject: ['getMap']
```
- 负面影响：
  1. 应用程序中的组件与它们当前的组织方式耦合起来，使重构变得更加困难
  2. 所提供的 property 是非响应式的

### 程序化的事件侦听器
- `$emit` 可以被 `v-on` 侦听
- 通过 `$on(eventName, eventHandler)` 侦听一个事件
- 通过 `$once(eventName, eventHandler)` 一次性侦听一个事件
- 通过 `$off(eventName, eventHandler)` 停止侦听一个事件
- 需要在一个组件实例上手动侦听事件时，它们派得上用场，也可以用于代码组织工具
- `$emit`、`$on`, 和 `$off` 并不是 `dispatchEvent`、`addEventListener` 和 `removeEventListener` 的别名


### 循环引用
- 递归引用：组件是可以在它们自己的模板中调用自身的，请确保递归调用是条件性的
- 组件之间的循环引用：A，B两个组件相互依赖。使用一个模块系统依赖/导入组件会遇到，全局注册组件没这个问题。在本地注册组件的时候，可以使用 webpack 的异步 `import` 解决

### 模板定义的替代品
#### 内联模板
- 当 `inline-template` 这个特殊的 attribute 出现在一个子组件上时，这个组件将会使用其里面的内容作为模板，而不是将其作为被分发的内容。这使得模板的撰写工作更加灵活
- 内联模板需要定义在 Vue 所属的 DOM 元素内
- `inline-template` 会让模板的作用域变得更加难以理解
- 最佳实践: 请在组件内优先选择 template 选项或 .vue 文件里的一个 <template> 元素来定义模板。
```html
<my-component inline-template>
  <!-- 这些内容作为内联模板，将作为子组件将渲染的内容 -->
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
```
#### X-Template
- 另一个定义模板的方式是在一个`<script>` 元素中，并为其带上 `text/x-template` 的类型，然后通过一个 id 将模板引用过去
- `x-template` 需要定义在 Vue 所属的 DOM 元素外
- 这些可以用于模板特别大的 demo 或极小型的应用，但是其它情况下请避免使用，因为这会将模板和该组件的其它定义分离开。
```js
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>

Vue.component('hello-world', {
  template: '#hello-world-template'
})
```

### 控制更新
- 强制更新：如果发现在极少数的情况下需要手动强制更新，那么可以通过 `$forceUpdate` 来做这件事
- 通过 `v-once` 创建低开销的静态组件：当组件包含了大量静态内容，可在根元素上添加 `v-once` attribute 以确保这些内容只计算一次然后缓存起来