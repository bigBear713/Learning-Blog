## 原型prototype
- 每个对象都会在内部初始化一个prototype，即原型，存储这共享的属性和方法。

## 原型链
- 一个对象本身，对象的prototype，对象父级的prototype......一直到Object, Function等的prototype，这些组成了一个链条，就是原型链。
- 访问一个对象的属性或者调用一个对象的方法时，会在原型链上寻找，从对象本身开始，到对象的prototype，逐级往上直到找到为止。

## __proto__, constructor,prototype的关系
### 三者含义
- __proto__在每个对象中都存在，指向对象的constructor的prototype。即父级的prototype
- prototype只存在构造函数中，用于存储共享属性和方法。
- constructor只存在于构造函数的prototype中，指向构造函数本身。const a = new A()，此时A是一个构造函数。所以a.__proto__===A.prototype.
```js
const obj = {};
const arr = [];
const fn = function() {}

obj.__proto__ === Object.prototype  
arr.__proto__ === Array.prototype  
fn.__proto__ == Function.prototype 
```

### 关系
- 一个对象或者构造函数的隐式原型__proto__的属性值指向其构造函数的显式原型prototype属性值。即`instance.__proto__===instance.constructor.prototype`。
- 除了Object，所有对象或构造函数的prototype都继承于Object.prototype。原型链的顶层指向null。`Object.prototype.__proto__===null`
- Object.prototype中也有constructor:`Object.prototype.constructor===Object`,即`Object`自己。
- 构造函数创建的对象（Object, Function, Array, 普通对象等）都是Function的实例，他们的__proto__均指向Function.prototype

## instanceof
- instanceof 运算符用于测试构造函数的 prototype 属性是否出现在对象原型链中的任何位置。