## v-model双向数据绑定
- 双向数据绑定是指，属性值从父组件传递给子组件。子组件在改变了该值后，能自动同步给父组件
- 双向，就是数据从父组件到子组件，以及子组件到父组件两个方向

### 语法
- `v-model`其实只是`value`+`change`的语法糖，监听输入并触发改变。
- 在子组件中，设置`model`属性的值来实现双向绑定。其中`prop`的值就是指定要监听的值的属性名，来自`props`中定义的属性；`event`指定要触发的事件名，将被用于`$emit`
```js
export default{
    props:{
        // ...
        value:String,
    },
    model:{
        prop:'value',
        event:'change'
    },
    methods:{
        changeValue(val){
            this.$emit('change',val);
        }
    }
}
```
- 使用`model`只能实现一个属性的双向绑定。如果要实现多个属性的双向绑定，可以使用`.sync`来实现。此时的事件名统一为`'update:'+[prop name]`
```js
// 父组件
<template>
    <Child :value.sync="prop1"></Child>
</template>

// 子组件
export default{
    props:{
        value:String
    },
    methods:{
        changeValue(val){
            this.$emit('update:value',val);
        }
    }
}

```