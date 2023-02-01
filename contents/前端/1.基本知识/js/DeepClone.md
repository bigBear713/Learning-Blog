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
function clone(target, map = new WeakMap()){
  if(!isObject(target)){
    return target;
  }

  const type = getType(target);
  let cloneTarget;
  const cloneValue = cloneByType(target,type);
  if(cloneValue){
    cloneTarget = cloneValue;
  }

  if(map.get(target)){
    return map.get(target);
  }
  map.set(target,cloneTarget);

  // clone set
  if(type==='Set'){
    target.forEach((value)=>{
      cloneTarget.add(
        clone(value, map)
      );
    });
    return cloneTarget;
  }

  // clone map
  if(type==='Map'){
    target.forEach((value,key)=>{
      cloneTarget.set(key,clone(value,map));
    });
    return cloneTarget;
  }

  const isArray = Array.isArray(target);
  if(type==='Array'){
    target.forEach((value,index)=>{
      cloneTarget[index]=value;
    });
    return cloneTarget;
  if(type==='Object'){
    Object.keys(target).forEach((key)=>{
      cloneTarget[key]=target[key];
    });
    return cloneTarget;
  }
  return cloneTarget;
}

function isObject(target){
  const type = typeof target;
  return target!==null && (type==='object'||type==='function');
}

function getType(target){
  return Object.prototype.toString.call(target).slice(8,-1);
}

function getInit(target){
  const Constructor = target.constructor;
  return new Constructor();
}

function cloneByType(targe, type) {
    const Ctor = targe.constructor;
    switch (type) {
        case 'Object':
        case 'Array':
        case 'Map':
        case 'Set':
          return getInit(target);
        case 'Boolean':
        case 'Number':
        case 'String':
        case 'Error':
        case 'Date':
            return new Ctor(targe);
        case 'RegExp':
            return cloneReg(targe);
        case 'Symbol':
            return cloneSymbol(targe);
        default:
            return null;
    }
}
function cloneSymbol(targe) {
    return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneReg(targe) {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}
```