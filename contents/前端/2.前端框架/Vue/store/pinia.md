## Pinia
- 是Vue的存储库，允许跨组件/页面共享状态
- 核心概念
  1. store - 数据仓库，可以将一些要共享的数据放在仓库中。可以设置**不同的**store给**不同的**功能模块
  2. state - 数据状态，存储`store`中的元数据
  3. getters - 等同于vue中的`computed`，有缓存的效果
  4. actions - 操作`store`中的数据，可以进行**异步**操作

---

## store
### 创建
- 使用`defineStore(name, options)`方法，创建一个数据仓库。
- 参数：
  1. name - 仓库名称，为pinia中的唯一id
  2. options - 配置项，配置了该`store`中的`state`，`getters`，`actions`

### 使用
- `store`被实例化后，可以直接在store上访问`state`，`getters`，`actions`
- store是一个用 `reactive` 包裹的对象，这意味着不需要在 `getter` 之后写 `.value`
- 不能对`store`进行解构。如果想提取store中的属性的同时，保持响应式的话，需要使用`storeToRefs()`，它将为响应式属性创建refs
```ts
// src/store/formInfo.js
import { defineStore } from 'pinia';
​
// 第一个参数是应用程序中 store 的唯一 id
const useFormInfoStore = defineStore('formInfo', {
  // state, getters, actions
})
const { name, age } = formInfoStore; // ❌ 此时解构出来的name和age不具有响应式
​
const { name, age } = storeToRefs(formInfoStore); // ✅ 此时解构出来的name和age是响应式引用
```

---

## state
- 定义store时，在`options.state`中设置，推荐使用完整类型推断的箭头函数
- 可使用通过store直接**读取**和**写入**state中的属性
- 几种额外的方法操作`state`:
  1. `$reset` - 将state重置为初始值
  2. `$patch` - 一次性设置state中的多个属性值。设置时，是将新值和旧值合并，将新设置的值覆盖旧的值，没有设置的值不变
  3. `$state` - 更新state的初始值。这样下次通过`$reset`恢复初始值时，就是此次新设置的值。设置时，也是新值和旧值合并，而不是直接替换原本的整个state
  4. `$subscribe` - 订阅 `$patch`和`$state` 操作引起的变化，直接通过store修改state的值则不会订阅到
```ts
const useFormInfoStore = defineStore('formInfo', {
   state: () => {
      return {
        name: 'Hello World',
        age: 18,
        isStudent: false
      }
   }
})
​// 通过store直接读取state中的属性值
console.log(formInfoStore.name); // 'Hello World'
// 直接修改state中的属性
formInfoStore.age++;  // 19
​
// 1.$reset 重置状态，将状态重置成为初始值
formInfoStore.$reset();
console.log(formInfoStore.age); // 18
  
// 2.$patch 支持对state对象的部分批量修改
formInfoStore.$patch({
    name: 'hello Vue',
    age: 198
});
  
// 3.$state 通过将其 $state 属性设置为新对象来替换 Store 的整个状态
formInfoStore.$state = {
  name: 'hello Vue3',
  age: 100,
  gender: '男'
}
​
// 4.$subscribe 订阅store中的状态变化
formInfoStore.$subscribe((mutation, state) => {
  // 监听回调处理
}, {
  detached: true  // 💡如果在组件的setup中进行订阅，当组件被卸载时，订阅会被删除，通过detached:true可以让订阅保留
})
```

---

## getters
- 定义`store`时，在`options`中定义，可以定义多个`getters`
- 通过`this`访问其它`getters`，此时**不能**用箭头函数
- 通过getters不允许额外传参，但可以从getters返回一个函数的方式接收参数，但使用这种方式后，该getters将不再具有缓存性
```ts
const useFormInfoStore = defineStore('formInfo', {
    state: () => {
        return {
            age: 18,
            gender: '男'
        };
    },
    getters: {
        // 仅依赖state，通过箭头函数方式
        isMan: (state) => {
            return state.gender === '男';
        },
        isWoman() {
            // 通过this访问其他getter，此时不可以用箭头函数
            return !this.isMan;
        },
        isLargeBySpecialAge: (state) => {
          return (age) => {
             return state.age > age
          }
        }
    }
});
// 此时该getters不具有缓存行
useFormInfoStore.isLargeBySpecialAge(18)
```

---

## actions
- 定义`store`时，在`options`中定义。
- 常用于定义业务逻辑用
- 可以是**异步**的，可以在其中`wait`任何api甚至其它操作
- `$onAction()` - 
  1. 可用于订阅action及其结果。
  2. 回调函数在action执行**前**执行。回调函数接收`after`参数，处理Promise，并允许在action执行**后**执行。`onError`参数用于处理action过程中抛出的错误
  3. 和`$subscribe`类似，在组件中使用时，组件卸载，订阅也会被删除，如果希望保留的话，需要传入true作为第二个参数。
```ts
const unsubscribe = formInfoStore.$onAction(
  ({
    name, // action 的名字
    store, // store 实例
    args, // 调用这个 action 的参数
    after, // 在这个 action 执行完毕之后，执行这个函数
    onError, // 在这个 action 抛出异常的时候，执行这个函数
  }) => {
    // 记录开始的时间变量
    const startTime = Date.now()
    // 这将在 `store` 上的操作执行之前触发
    console.log(`Start "${name}" with params [${args.join(', ')}].`)
​
    // 如果 action 成功并且完全运行后，after 将触发。
    // 它将等待任何返回的 promise
    after((result) => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      )
    })
​
    // 如果 action 抛出或返回 Promise.reject ，onError 将触发
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  },
  // 如果在组件卸载后还希望保留，传入true作为第二个参数
  true
)
​
// 手动移除订阅
unsubscribe()
```
---

## 参考
- https://juejin.cn/post/7207848485856100410