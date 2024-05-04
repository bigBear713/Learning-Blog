## v-model双向绑定

### 语法
- 第一种语法，只能绑定一个属性，即为`modelValue`属性
```html
<!-- 父组件 -->
<template>
    <Child v-model="prop1" />
</template>
<!-- 子组件 -->
<script setup lang="ts">
const props = defineProps({modelValue:string});
const emits = defindEmits(['update:modelValue']);

const changeModelValue = (val:string)=>{
    emits('update:modelValue',val);
}
</script>
```
- 如果要绑定多个属性的话，直接 update 对应的属性名就行，而不是 update modelValue
```html
<!-- 父组件 -->
<template>
    <Child v-model:prop1="prop1" v-model:prop2="prop2" />
</template>
<!-- 子组件 -->
<script setup lang="ts">
const props = defineProps({prop1:string,prop2:string});
const emits = defindEmits(['update:prop1','update:prop2']);

const changeProp1 = (val:string)=>{
    emits('update:prop1',val);
}
const changeProp2 = (val:string)=>{
    emits('update:prop2',val);
}
</script>
```
- 使用专属的`defineModel`
```html
<!-- 父组件 -->
<template>
    <Child v-model:prop1="prop1" v-model:prop2="prop2" />
</template>
<!-- 子组件 -->
<template>
    {{prop1}}
    {{prop2}}
</template>
<script setup lang="ts">
const prop1 = defineModel();
const prop2 = defineModel();

const changeProp1 = (val:string)=>{
    prop1.value = value;
}
const changeProp2 = (val:string)=>{
    prop2.value = value;
}
</script>
```