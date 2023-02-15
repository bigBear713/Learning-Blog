## computed计算属性
- 对于任何复杂逻辑，都应使用computed
- 有利于性能的优化
- 计算属性默认只有一个`getter`，如果有需要，也可提供一个`setter`
```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

### 计算属性VS方法
- 计算属性会根据响应式依赖缓存函数的返回值。它能分析函数中的依赖属性。只有当依赖属性的值发生改变时，才会重新计算更新函数的返回值
- 方法则在每次触发重新渲染时，总会重新执行

### 计算属性VS侦听属性
- 大部分清空下，使用计算属性computed比使用侦听属性watch好，优先使用computed