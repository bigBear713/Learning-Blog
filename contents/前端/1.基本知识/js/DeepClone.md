## 深拷贝
- 深拷贝常见的就是用JSON.parse(JSON.stringify(value))。但是这个方法有一些缺点。

## JSON.parse(JSON.stringify(value))
- 常用的深拷贝方式，但是有一些缺点。
1. 但数据存在循环引用时会报错
2. funtion的数据会丢失
3. Date的数据会自动转成字符串
4. Set,Map,正则,Error对象的数据，会转成空对象字面量{}
5. 如果存在undefined的值，会被忽略造成丢失。


## 数据类型
- 基本数据类型(原始类型)：Number String Boolean Symbol undefined null BigInt(es10), 存储在`栈`当中，存储的值比较固定，空间较小，可直接操作其保存的变量值、运行效率高，系统自动分配存储空间。
- 引用数据类型(对象类型)：Object(Array, Function), `堆`中存储地址，自动分配内存空间

## 深拷贝递归实现
```js
function clone(target, map = new Map()){
  if(typeof target!=='object'){
    return target;
  }
  let cloneTarget = Array.isArray(target)?[]:{};
  if(map.get(target)){
    return map.get(target);
  }
  map.set(target,cloneTarget);
  for(const key in target){
    cloneTarget = clone(target[key],map);
  }
  return cloneTarget;
}
```