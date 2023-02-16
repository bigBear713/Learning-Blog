## component组件

## 结构
- Options API
```html
<template>
  <!-- template content -->
</template>
<script>
  import AAAComponent from './aaa.component.vue';
  export default {
      name:'DemoComp',
      components:{
          'comp-a':AAAComponent,
          'comp-b':BBBComponent
      },
      directives: {
        focus: {
          // 指令的定义
          inserted: function (el) {
            el.focus()
          }
        }
      },
      // inheritAttrs: false,
      props:['prop1','prop2'],
      // 声明哪些为抛出事件
      emits:[],
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
          prop2:{
            immediate: true,
            deep: true,
            handler(to, from) {
              // ...
            }
          }
      },
      created:function(){},
      methods:{
          fetchList(){}
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
</script>
<style lang="scss">
  /* style content for global */
</style>
<style lang="scss" scoped>
  .demo{
    /* style content for the current component */
  }
  
  .demo ::v-deep {
    /* set style fo children comp */
  }
</style>
```
- Composition API
```html
<script setup>
import { ref, onMounted,reactive } from 'vue'

// 响应式状态
const count = ref(0)
const obj = reactive({count:0});

// 用来修改状态、触发更新的函数
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
<style lang="scss">
  /* style content for global */
</style>
<style lang="scss" scoped>
  .demo{
    /* style content for the current component */
  }
  
  .demo ::v-deep {
    /* set style fo children comp */
  }
</style>
```

## 响应式
- 响应式代理VS原始值：vue3中，因为使用了`Proxy`实现响应式，所以会有这样的情况，因为Proxy代理返回的是一个代理实例
- 状态都是默认深层响应式的。这意味着即使在更改深层次的对象或数组，你的改动也能被检测到。
```js
// Options API
export default {
  data() {
    return {
      someObject: {},
      obj: {
        nested: { count: 0 },
        arr: ['foo', 'bar']
      }
    }
  },
  mounted() {
    const newObject = {}
    this.someObject = newObject

    console.log(newObject === this.someObject) // false
  },
  methods: {
    mutateDeeply() {
      // 以下都会按照期望工作
      this.obj.nested.count++
      this.obj.arr.push('baz')
    }
  }
}
```
```html
<!-- 组合式API -->
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })

function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
```
- `reactive`的局限：
  1. 仅对**引用类型**有效（对象、数组和 Map、Set 这样的集合类型），而对 string、number 和 boolean 这样的 **原始类型** 无效
  2. 因为 Vue 的响应式系统是通过属性访问进行追踪的，因此我们必须**始终保持**对该响应式对象的相同引用
```js
let state = reactive({ count: 0 })

// 上面的引用 ({ count: 0 }) 将不再被追踪（响应性连接已丢失！）
state = reactive({ count: 1 })
```
- Vue 提供了一个 `ref()` 方法来允许我们创建可以使用**任何值类型**的响应式 `ref`
- `ref()` 将传入参数的值包装为一个带 `.value` 属性的 `ref` 对象
- `ref`在模板中会自动解包，所以不需要使用 `.value`。
- 仅当 `ref` 是模板渲染上下文的顶层属性时才适用自动“解包”
- 需要注意的是，如果一个 `ref` 是文本插值（即一个 {{ }} 符号）计算的最终值，它也将被解包。这只是文本插值的一个方便功能，相当于 {{ object.foo.value }}。
```html
<script setup>
import { ref } from 'vue'

const count = ref(0)
const object = { foo: ref(1) }

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }} <!-- 无需 .value -->
    {{ object.foo + 1 }} <!-- 不会自动解包，因为object.foo不是顶层属性 -->
    {{ object.foo }} <!-- 会被解包 -->
  </button>
</template>
```


### ref 在响应式对象中的解包
- 当一个 `ref` 被嵌套在一个响应式对象中，作为属性被访问或更改时，它会自动解包，因此会表现得和一般的属性一样
```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```
### 数组和集合类型的 ref 解包
- 跟响应式对象不同，当 `ref` 作为响应式数组或像 `Map` 这种原生集合类型的元素被访问时，不会进行解包。
```js
const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count').value)
```

## 生命周期
- 对于Options API来说，生命周期和Vue2.0的一样
- 对于Composition API来说，多了一个`setup`，最早执行
- 组合式API中，钩子应当在组件**初始化**时被同步注册，如果`setTimeout`等异步注册时当前组件实例已丢失，这将不会正常工作
- 组合式API中，`onMounted()` 也可以在一个外部函数中调用，只要调用栈是同步的，且最终起源自 `setup()` 就可以

## watch侦听器
- 和Vue2.0中的属性基本相同
- 新增`flush`属性，用于让处理函数能够获取Vue更新后的DOM。此时需要设置`flush: 'post'`
- 组合式API中，也是使用`watch()`实现监听，第一个参数可以是不同形式的“数据源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组，但你不能直接侦听响应式对象的属性值
```js
const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})

const obj = reactive({ count: 0 })

// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})
```
- 侦听器必须用同步语句创建：如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏
- 需要异步创建侦听器的情况很少，请尽可能选择同步创建。如果需要等待一些异步数据，你可以使用条件式的侦听逻辑
```js
import { watchEffect } from 'vue'

// 它会自动停止
watchEffect(() => {})

// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)

const unwatch = watchEffect(() => {})
// ...当该侦听器不再需要时
unwatch()

// 需要异步请求得到的数据
const data = ref(null)
watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
})
```

### 深层侦听器
- 直接给 `watch()` 传入一个响应式对象，会隐式地创建一个**深层侦听器**——该回调函数在所有嵌套的变更时都会被触发
- 相比之下，一个返回响应式对象的 `getter` 函数，只有在返回不同的对象时，才会触发回调
- `immediate: true` 选项来强制侦听器的回调立即执行
```js
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
})

obj.count++

watch(
  () => state.someObject,
  () => {
    // 仅当 state.someObject 被替换时触发
  }
)

watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // *除非* state.someObject 被整个替换了
  },
  { deep: true } // 强制转成深层侦听器
)
```

### watchEffect()
- 侦听器的回调使用与源完全相同的响应式状态是很常见的，可以用 `watchEffect` 函数 来简化
- `watchEffect()` 允许我们自动跟踪回调的响应式依赖
- 回调会立即执行，不需要指定 `immediate: true`
```js
const todoId = ref(1)
const data = ref(null)

watch(todoId, async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
}, { immediate: true })
// 等价于，其中todoId依赖被省略
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```
- 对于有**多个**依赖项的侦听器来说，使用 `watchEffect()` 可以消除手动维护依赖列表的负担
- 如果你需要侦听一个**嵌套数据结构**中的几个属性，`watchEffect()` 可能会比深度侦听器更有效，因为它将**只跟踪**回调中被使用到的属性，而不是递归地跟踪所有的属性。
- `watchEffect` 仅会在其**同步**执行期间，才追踪依赖。在使用异步回调时，只有在**第一个 await 正常工作前**访问到的属性才会被追踪。
- 后置刷新的 `watchEffect()` 有个更方便的别名 `watchPostEffect()`

### watch vs. watchEffect
- `watch` 和 `watchEffect` 都能响应式地执行有副作用的回调
- 主要区别是追踪响应式依赖的方式
  1. `watch` 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实**改变**时才会触发回调。`watch` 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机
  2. `watchEffect`，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。



## 对组件的引用
- 可以使用`ref`对组件进行引用
- 引用组件后，可访问组件内的属性，通过在子组件中设置`expose`属性和方法（Options API）
```js
// 子组件
export default {
    expose: ['publicData', 'publicMethod'],
    data() {
        return {
            publicData: 'foo',
            privateData: 'bar'
        }
    },
    methods: {
        publicMethod() {
            /* ... */
        },
        privateMethod() {
            /* ... */
        }
    }
}
```
- 组合式API，模板中的名字和脚本中的变量名一致
- `<script setup>` 的组件是默认私有的：一个父组件无法访问到一个使用了 `<script setup>` 的子组件中的任何东西，除非子组件在其中通过 `defineExpose` 宏显式暴露
```html
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])
// 模板中的ref的值也为itemRefs
const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

// 像 defineExpose 这样的编译器宏不需要导入
defineExpose({
  a,
  b
})
</script>
```

### 自定义v-model
- 不同于vue2中的`model`属性，vue3中通过特定的事件+属性就可以实现自定义v-model
- `v-model`默认情况：属性设置为`modelValue`，事件为`update:`+属性名
- 多个`v-model`：属性根据需求设置，事件为`update:`+属性名
- `v-model`的修饰符，通过在props中声明属性名+`Modifiers`。如果是`modelValue`，则为`modelModifiers`
```html
<!-- v-model -->
<CustomInput v-model="searchText" />
<!-- CustomInput.vue -->
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>
<template>
  <input v-model="value" />
</template>

<!-- 多个v-model -->
<CustomInput v-model:title="title" v-model:desc="desc" />
<!-- CustomInput.vue -->
<script>
export default {
  props: ['title','desc'],
  emits: ['update:title','update:desc'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>
<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
  <input
    type="text"
    :value="desc"
    @input="$emit('update:desc', $event.target.value)"
  />
</template>


<!-- v-model修饰符 -->
<CustomInput v-model:title.capitalize="title" />
<!-- CustomInput.vue -->
<script>
export default {
  props: ['title','titleModifiers'],
  emits: ['update:title'],
  computed: { },
  methods: {
    emitValue(e) {
      let value = e.target.value
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:modelValue', value)
    }
  }
}
</script>
<template>
  <input type="text" :value="title"  @input="emitValue" />
</template>
```

## 依赖注入
### 选项式API
- 依赖，提供，跟vue2一样，通过`provide`属性提供
- 注入，获取，跟vue2一样，通过`inject`属性获取。此外还能注入别名
- 注入还能设置默认值
```js
export default {
  inject: {
    /* 本地属性名 */ localMessage: {
      from: /* 注入来源名 */ 'message', // 当与原注入名同名时，这个属性是可选的
      default: 'default value'
    },
    user: {
      // 对于非基础类型数据，如果创建开销比较大，或是需要确保每个组件实例
      // 需要独立数据的，请使用工厂函数
      default: () => ({ name: 'John' })
    }
  }
}
```
- 和响应式数据配合使用：为保证注入方和供给方之间的响应性链接，我们需要使用 `computed()` 函数提供一个计算属性：
```js
import { computed } from 'vue'

export default {
  data() {
    return {
      message: 'hello!'
    }
  },
  provide() {
    return {
      // 显式提供一个计算属性
      message: computed(() => this.message)
    }
  }
}
```
### 组合式API
- `provide()`为子组件提供属性
- 如果不使用 `<script setup>`，请确保 `provide()` 是在 `setup()` 同步调用的
- `provide()` 函数接收两个参数。第一个参数被称为注入名，可以是一个字符串或是一个 Symbol
```html
<script setup>
import { provide } from 'vue'

provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
</script>
<!-- 不使用<script setup> -->
<script >
import { provide } from 'vue'

export default {
  setup() {
    provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
  }
}
</script>
```
- 要注入上层组件提供的数据，需使用 `inject()` 函数
- 如果提供的值是一个 `ref`，注入进来的会是该 `ref` 对象，而不会自动解包为其内部的值。这使得注入方组件能够通过 ref 对象保持了和供给方的响应性链接。
- 如果没有使用 `<script setup>`，`inject()` 需要在 `setup()` 内同步调用
```html
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
<!-- 不使用<script setup> -->
<script >
import { inject } from 'vue'

export default {
  setup() {
    const message = inject('message')
    return { message }
  }
}
</script>
```
```js
// 如果没有祖先组件提供 "message"
// `value` 会是 "这是默认值"
const value = inject('message', '这是默认值')
// 为了避免在用不到默认值的情况下进行不必要的计算或产生副作用，可以使用工厂函数来创建默认值
const value = inject('key', () => new ExpensiveClass())
```
### 和响应式数据配合使用
- 建议尽可能将任何对响应式状态的变更都保持在供给方组件中
- 可以确保所提供状态的声明和变更操作都内聚在同一个组件内，使其更容易维护。
- 有的时候，我们可能需要在注入方组件中更改数据。在这种情况下，我们推荐在供给方组件内声明并提供一个更改数据的方法函数
- 如果你想确保提供的数据不能被注入方的组件更改，你可以使用 `readonly()` 来包装提供的值
```html
<!-- 在供给方组件内 -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>

<!-- 在注入方组件 -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>

<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
// 让提供的值不被修改
provide('read-only-count', readonly(count))
</script>
```

## 计算属性
- 选项式API中，还是在`computed`属性中提供计算属性
- 在组合式API中，通过`computed()`设置计算属性
- 想对计算属性进行写操作时，选项式API还是跟之前一样，组合式API也差不多，直接一个对象
```js
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const now = computed(() => Date.now())

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
```

## 自定义组件
- 选项式API，和vue2的语法一样
### 组合式API
- 通过 `<script setup>`，导入的组件都在模板中直接可用。
- 定义输入props:`defineProps([])`
- 定义抛出事件`defineEmits([])`
```html
<script setup>
import ButtonCounter from './ButtonCounter.vue'
const props = defineProps({
// 基础类型检查
  // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
  propA: Number,
  // 多种可能的类型
  propB: [String, Number],
  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true
  },
  // Number 类型的默认值
  propD: {
    type: Number,
    default: 100
  },
  // 对象类型的默认值
  propE: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // 自定义类型校验函数
  propF: {
    validator(value) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // 函数类型的默认值
  propG: {
    type: Function,
    // 不像对象或数组的默认，这不是一个工厂函数。这会是一个用来作为默认值的函数
    default() {
      return 'Default function'
    }
  }
})
const emit = defineEmits({
  // 没有校验
  click: null,
  'enlarge-text':null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})
emit('enlarge-text')
</script>

<template>
  <h1>Here is a child component!</h1>
  <ButtonCounter />
</template>
```

## Attributes 继承
- 禁用 Attributes 继承: 组合式API中，使用了 `<script setup>`，需要一个额外的 `<script>` 块来书写这个选项声明`inheritAttrs: false`
```html
<script>
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
}
</script>
<script setup>
// ...setup 部分逻辑
</script>
```
- `$attrs` 对象包含了除组件所声明的 `props` 和 `emits` 之外的所有其他 attribute，有几点需要注意：
  1. 和 `props` 有所不同，透传 attributes 在 JavaScript 中保留了它们原始的大小写，所以像 `foo-bar` 这样的一个 attribute 需要通过 $attrs['foo-bar'] 来访问。
  2. 像 `@click` 这样的一个 `v-on` 事件监听器将在此对象下被暴露为一个函数 `$attrs.onClick`
- 在 JavaScript 中访问透传 Attributes：可以在 `<script setup>` 中使用 `useAttrs()` API 来访问一个组件的所有透传 attribute
- 虽然这里的 `attrs` 对象总是反映为最新的透传 attribute，但它并不是响应式的
```html
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
<script>
  export default {
  setup(props, ctx) {
    // 透传 attribute 被暴露为 ctx.attrs
    console.log(ctx.attrs)
  }
}
</script>
```