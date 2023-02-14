## pluck
- 用于选出每个数据对象上的指定属性值的便捷操作符
```js
of({name: '张三'}, {name: '李四'}).pipe(
    pluck('name')
).subscribe(data=>console.log(data));
```