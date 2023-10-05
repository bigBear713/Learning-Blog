## 变量类型
- js中变量类型分为两种: `原始类型`和`引用类型`.

## 原始类型（基本数据类型）
- 值是原始值，不可改变。每一次操作，其实都是创建新的变量值。
- 值存储在`栈`中。
- 类型包括：
  1. `undefined`，只包含一个值:undefined
  2. `null`，只包含一个值：null
  3. `boolean`，只包含true和false
  4. `string`，一串表示文本值的字符串
  5. `number`，包含整数和浮点数，以及一些特殊的字符：`-Infinity`，`+Infiniti`,`NaN`
  6. `Symbol`(es6)，一种实例是唯一，且不可改变的数据类型
  7. `bigInt`(es10)，一种可操作超大数字的数据类型，目前在chrome中已支持

## 引用类型(对象类型)
- 实际的值是存储在`堆`中，`栈`中存储的其实是指向`堆`中实际值的内存地址
- 类型是`Object`，具体还可包括`Object`，`Array`，`Date`，`Function`等

## 原始类型和引用类型的区别
- 栈内存：存储的值长度固定，空间较小，可以直接操作保存的值，运行效率高，系统自动分配存储空间
- 堆内存：存储的值的长度不固定，可动态调整，空间较大，运行效率较低，无法直接操作其内部存储值，需要通过引用地址读取，通过代码分配存储空间

### 不可变性
- 原始类型的值是直接存在`栈内存`中，值具有不可变性。每一次操作，都是创建新的值，再将变量指向它。
- 引用类型的实际值是存在`堆内存`中，`栈内存`中存储的是指向堆内存中的值的内存地址。所以当多个变量指向同一内存地址时，通过其中一个变量操作引用类型的值，通过另一个变量读取时，得到的是改变后的值

### 复制
- 新建一个变量，复制一个原始类型的值时，其实是在`栈内存`中创建了一个具有相同值的新值，再将新变量指向这个新值。所以对于原始类型变量，复制时，两个变量其实指向的是不同份数据，只是数据的值相同
- 新建一个变量，复制一个引用类型的值时，其实是在`栈内存`中创建一个具有相同内存地址的新值，同样是指向`堆内存`中的值的内存地址，再将新变量指向这个新值。所以对于引用类型变量，复制时，两个变量其实指向的是同一份数据

### 比较
- 两个原始类型的变量比较时，比较的是值。只要值相等，这两个变量就相等。
- 两个引用类型的变量比较时，比较的是内存地址。只要内存地址相等，它们就是相等的。如果内存地址不相等，就算它们的结构和值都一样，也是不相等的。

### 值传递
- 调用函数传参时，都是值传递，不存在引用传递。
- 对于原始数据类型，传参时，是将值传递进去。因为原始类型的值具有不可变性，所以传到函数中的值其实是一个新值，因此对传进去的变量进行各种操作，都不会影响原来的值
- 对于引用类型数据，传参时，是将指向实际值的内存地址传进去，所以函数内得到的值同样是指向`堆内存`中的那一份值。

## null和undefined
### null
- null表示有值，变量已经被赋值，这个值就是null
- null转为数字是`0`
### undefined
- undefined表示没值，变量还没被赋值
- undefined转为数字时是`NaN`

## Symbol
- 创建时是像函数一样调用，而不是通过`new`
```js
let a = Symbol('a'); // right
let b = new Symbol('b'); // wrong
```

### 唯一性
- Symbol变量具有唯一性，就算通过相同字符串创建的两个Symbol变量也是不相等的。
- 如果想让两个Symbol变量相等，创建时应调用`Symbol.for(key)`方法, 因为这个方法会优先查找是否存在这样一个Symbol值，有的话返回，没有的话创建
```js
Symbol('a') === Symbol('a') //  false

Symbol.for('a') === Symbol.for('a')
```

### 不可枚举
- 将Symbol值作为Object的属性时，无法通过`Object.keys()`，`Object.getOwnPropertyNames()`等获取到，也无法通过`for...in`将其枚举出来
- 可以使用专门的函数方法`Object.getOwnPropertySymbols()`

### 应用场景
- 防止`xxs`攻击。假设服务器允许用户存储任何JSON对象，但客户端代码需要一个字符串，这可能导致问题发生。而JSON中不能存储Symbol类型变量，可以有效防止xss攻击。
- 私有属性。因为Symbol变量无法被枚举，所以可以利用其定义私有属性，避免被外部读取
- 防止属性污染。因为Symbol变量具有唯一性，所以可以避免属性被覆盖

## Number
### 精度丢失
- 数字计算时，先换算成`二进制`计算，然后再转成`十进制`。
- 小数在转成二进制计算时发生精度丢失，导致转成十进制时结果也不准确
- js使用64位双精度浮点数编码，其中`符号位`占`1`位，`指数位`占`11`位，`尾数位`占`52`位。
  1. `符号位`：标识正负，1表示正，0表负
  2. `指数位`：存储科学计数法的指数
  3. `位数法`: 存储科学计数法后的有效数字
- 计算时，当结果超过53位时，超出部分无法存储，此时遵循的原则：如果第53位是`1`，就向前进`1`位，如果是`0`则舍弃。而`0.1+0.2`的结果就是一个超过52位的结果，遵循原则后导致结果不准确
```js
// 0.1的二进制
0.0001100110011001100110011001100110011001100110011001101
// 0.2的二进制
0.001100110011001100110011001100110011001100110011001101

// 计算后的结果理论上应该是
0.0100110011001100110011001100110011001100110011001100111
// 遵循原则后的结果,因为后3位数字被处理，进1了
0.0100110011001100110011001100110011001100110011001101
```

### js能表示的最大数
- `指数位`能表示的最大数的十进制的值是`1023`，即二进制下的11位1
- `尾数位`能表示的最大数即53位1
- js能表示的最大数为`1.11111......`*2的1023次方，即`Number.MAX_VALUE`
- `Number.MAX_SAFE_INTEGER`为js能表示的最大安全整数，在这个范围内不会发生精度丢失问题，这个数实际上是`1.11111`*2的52次方
- es10中，使用`bigInt`可以操作大于最大安全整数的数字

## 包装类型
- `String`，`Boolean`，`Number`等也是引用类型，同时又被称为`包装类型`
- 是为了更方便的操作基本类型而存在，与`string`，`boolean`，`number`等一一对应

### 基本类型和包装类型的区别
- 生命周期不同。
- 基本类型只存在一行代码的执行瞬间，然后会立即被销毁释放。因此无法在运行时给基本类型添加属性和方法
```js
let str = 'color';
str.color='red';
console.log(str.color); // undefined
```
- 包装类型则在执行流离开当前作用域之前，实例会一直存在于内存中。
- 包装类型的实例是使用`new`操作符创建。

### 装箱和拆箱
#### 装箱
- 装箱：将基本类型转成包装类型
- 每当`操作`一个基本类型变量时，会自动生成一个包装类型的对象实例。调用方法和属性时，其实调用的是该基本类型变量对应的包装类型的对象实例上的方法和属性

#### 拆箱
- 拆箱：将包装类型转成基本类型
- 转化过程中，遵循ECMAScript规定的`toPrimitive`原则，一般会调用引用类型的`valueOf`和`toString`方法，我们也可以重写`toPrimitive`方法。
- 一般转换成不同类型的值遵循的规则不同
  1. 包装类型转成`number`类型时，先调用`valueOf`方法，再调用`toString`方法
  2. 包装类型转成`string`类型时，先调用`toString`方法，再调用`valueOf`方法
- 如果`valueOf`和`toString`都不存在，或者都没有返回基本类型，会报`TypeError`错误
```js
const obj = {
  valueOf:()=>{console.log('call valueOf'); return 123;},
  toString:()=>{console.log('call toString'); return 'object string';}
};
console.log(obj - 1); // call valueOf 122
console.log(obj+'!'); // call toString object string!

const obj2 = {
  [Symbol.toPrimitive]:()=>{console.log('call toPrimitive');return 123;}
};
console.log(obj2-1); // call toPrimitive 122
```

## 类型转换
- js是弱语言类型，类型转化容易且频繁。
- 装箱和拆箱就是一种类型转换
- 类型转化分为`隐式转换`和`强制转换`
  1. `隐式转换`是客户端自动进行的类型转换
  2. `强制转换`是开发人员手动进行的类型转换

### 类型转换规则
| 转换前类型 | 转换前值 | 转为Boolean后的值 | 转为Number后的值 | 转为String后的值 |
| --- | --- | --- | --- | --- |
| Boolean | true | - | 1 | 'true' |
| Boolean | false | - | 0 | 'fase' |
| Number | 1 | true | - | '1' |
| Number | 0 | false | - | '0' |
| Number | Infinity | true | - | 'Infinity' |
| Number | NaN | false | - | 'NaN' |
| String | '' | false | 0 | - |
| String | '123' | true | 123 | - |
| String | '123abc' | true | NaN | - |
| String | 'abc' | true | NaN | - |
| Symbol | Symbol() | true | TypeError | TypeError |
| Null | null | false | 0 | 'null' |
| Undefined | undefined | false | NaN | 'undefined' |
| Function | function(){} | true | NaN | 'function(){}' |
| Object | {} | true | NaN | '{}' |
| Array | [] | true | 0 | '' |
| Array | ['abc'] | true | NaN | 'abc' |
| Array | ['abc','123'] | true | NaN | 'abc,123' |

### if语句和逻辑语句
- 在if语句和逻辑语句中，如果只是单个变量，都会先被转成`Boolean`类型
- 值基本都是转成`true`
- 只有这几种情况值会被转成`false`：`''`，`0`，`NaN`，`null`，`undefined`，`false`

### 各种数学运算符
- 在对各种非`number`类型变量使用数学运算符（-,*,/）时，会先将变量值转成`Number`类型
- 运算符`+`是个例外，因为它对于字符串也有特殊含义。
  1. 当其中一方是`string`类型时，作为字符串拼接处理，优先将另一方转为`String`处理
  2. 当其中一方是`number`类型，且另一方是除`string`外的其它原始类型时，将原始类型变量转为`Number`处理
  3. 当其中一方是`number`类型，且另一方是引用类型时，会将`number`类型和引用类型都转成`String`类型后拼接处理
```js
123+'abc' = '123abc'
123+true = 124
123+null = 123
123+{} = '123[object Object]'
123+[123,'abc'] = '123123,abc'
```

### ==
- 使用`==`时，如果两侧的类型相同，结果和`===`一样
- 如果两侧类型不同，会发生隐式转换

#### NaN
- NaN和任何值比较都是`false`，包括它自己
```js
NaN==NaN // false
```

#### Boolean
- Boolean和其它类型比较，Boolean首先转成`Number`类型
- Boolean中的`false`和`null`，`undefined`比较的结果是`false`，因为`false`先被转成`Number`的`0`，即最后是`null`,`undefined`和`0`的比较
```js
true == 1 // true
true == 2 // false
false == 0 // true
false == -1 // false
true == ['1'] // true
true == '2' // false
true == ['2'] // false

null == false // false
undefined == false // false
```

#### String和Number
- `String`和`Number`比较时，先将`String`转成`Number`再进行比较
```js
123 == '123'; // true
'' == 0; // true
```

#### null和undefined
- `null`, `undefined`除了彼此比较时为`true`外，和其它类型比较都是false
```js
null == undefined // true
null == '' // false
null == 0 // false
null == false // false
undefined == '' // false
undefined == 0 // false
undefined == false // false
```

#### 原始类型和引用类型
- 原始类型和引用类型做比较时，引用类型会遵循`toPrimitive`规则先转成原始类型
```js
'[object Object]' == {}; // true
[123] == 123; // true
```
- `!`的优先级高于`==`，所以带有`!`的变量会先进行转化
```js
[] == ![] // true. 因为[]被转成0, ![]先转成false，再转成0
```

#### 数组中的null和undefined
- 根据数组的`toPrimitive`规则，数组中有`null`,`undefined`时会被当作空字符串处理
```js
[null] == false // true
[undefined] == false // true
```

## 判断数据类型的方式
### typeof 
- `typeof`可以用于准确判断是否为这几种原始类型：`string`，`number`，`boolean`，`symbol`，`undefined`
- 还可以用于判断函数类型`function`
```js
typeof '123' // string
typeof 123 // number
typeof true // boolean
typeof Symbol(1) // symbol
typeof undefined // undefined
typeof function(){} // function
```
- `typeof`不适合用于判断引用类型和`null`。判断时结果都是'object'.

### instanceof
- 能判断引用类型变量具体属于什么类型的对象
- 但其实不是很准确，因为所有引用类型最终都指向`Object`，这也不是它设计的初衷
- 它也不能用于检测原始数据类型

### toString
- 每个引用类型都有一个`toString`方法，它存在于`Object`上。
- 默认情况下，即`toString`未被重写覆盖的前提下，会返回`[object Type]`, 其中Type是对象的类型
- 很多引用类型都重写了`toString`方法，比如`Array`，`Date`等
- 可直接调用原型Object上的`toString`方法，使用call来改变this的指向，便可解决在引用类型上被重写的问题

| 调用 | 结果 | 
| --- | --- |
| Object.prototype.toString.call({}) | [object Object] | 
| Object.prototype.toString.call(true) | [object Boolean] | 
| Object.prototype.toString.call(123) | [object Number] | 
| Object.prototype.toString.call('abc') | [object String] | 
| Object.prototype.toString.call(Symbol('a')) | [object Symbol] | 
| Object.prototype.toString.call(null) | [object Null] | 
| Object.prototype.toString.call(undefined) | [object Undefined] | 
| Object.prototype.toString.call(function(){}) | [object Function] | 
| Object.prototype.toString.call([]) | [object Array] | 
| Object.prototype.toString.call(new Error()) | [object Error] | 
| Object.prototype.toString.call(new RegExp()) | [object RegExp] | 
| Object.prototype.toString.call(Math) | [object Math] | 
| Object.prototype.toString.call(JSON) | [object JSON] | 
| Object.prototype.toString.call(window) | [object Window] | 


## 参考资料
- https://juejin.cn/post/6844903854882947080