## dataType数据类型（基础类型）
- boolean - 布尔类型
- number - 数值类型，和js一样，都是浮点数，可支持二进制、八进制、十进制和十六进制
- string - 字符串类型
- array - 数组类型
- tuple - 元组类型
- enum - 枚举类型，能为一组数值赋予更易读的名字
- any - 任意类型
- null 和 undefined 类型
- void 类型
- never 类型
- object 对象类型

### tuple元组类型
- 允许表示一个已知元素**数量和类型**的的数组，各元素类型**不必相同**
- 赋值的类型、位置、个数需要和定义声明的类型、位置和个数一致
```ts
let tupleArr：[number,string,boolean];
tupleArr = [1,'a',true]; // ok
tupleArr = [1,true,'a']; // error
```

### enum 
- 是一个可能取值的集合，并为这些值赋予更易读的名字
- 分为
  1. 数字枚举 - 没给赋值时，默认是数字类型，且是从 `0` 开始，依次累加。如果对第一个赋值，则后面的值会在此基础上进行累加1
  2. 字符串枚举 - 给一个变量赋值为字符串后，后续字符串也需赋值为字符串，否则报错
  3. 异构枚举 - 将数字枚举和字符串枚举混合起来使用
```ts
// 数字枚举
enum NumberEnum {
    Up,         // 默认值为0
    Download,   // 默认值为1
    Left,       // 默认值为2
    Right,      // 默认值为3
}
enum NumberEnum {
    Up = 10,        // 默认值为0
    Download,       // 默认值为11
    Left,           // 默认值为12
    Right,          // 默认值为13
}
// 字符串枚举
enum StringEnum {
    Up = 'Up',
    Down = 'Down',  
    Left = 'Left',  // 后续的字段也需要赋值字符串
    Right           // error TS1061: Enum member must have initializer
}
console.log(Direction['Left'], Direction.Up); // Left Up
// 混合枚举
enum ChoiceEnum {
    No = 0,
    Yes = "YES",
}
```

### any
- 可以指定任何类型的值
- 使用`any`类型允许被赋值为任意类型，甚至可以调用其属性、方法

### unknown
- 是 `any` 类型对应的安全类型
- 和 `any` 的区别是，`unknown`更严格：对 `unknown` 类型的值进行某种操作前，必须进行某种形式的检查；而对 `any` 类型的值执行操作前，不用进行任何检查

### void
- 标识方法的返回值类型，表示该方法没有返回值

### never
- 是其它类型(null, undefined)的子类型，可以赋值给任何类型，代表从不会出现的值。
- 但是没有类型是 `never` 的子类型，这意味着 `never` 的变量只能被 `never` 类型所赋值
- `never` 一般用来指定那些总是会抛出异常、无限循环的情况
```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
```

### interface接口
- 一系列抽象属性和方法的声明，需要具体的`class`去实现，，描述的是一个对象相关的属性和方法，当并不提供创建此对象实例的方法

### class类
- 是面向对象程序设计，实现信息封装的基础
- 是一种用户定义的引用数据类型，又被称为类类型
- 包含几个模块：属性字段、构造函数、方法
- `abstract`抽象类：作为其它派生类的基类使用，一般不会被直接实例化。不同于接口，抽象类可以包含成员的实现细节，即方法实现

---

## 高级类型
- 交叉类型`&`
- 联合类型`|`
- 类型别名`type`
- 类型索引`keyof`
- 类型约束`entends`
- 类型映射`in`
- 条件类型`?:`

### 交叉类型
- 通过 `&` 将多个类型合并成一个类型，包含所需的所有类型的特性，本质上是一个**并**操作，即将所有类型的属性合并在一起，得到一个新的类型

### 联合类型
- 逻辑和逻辑 `或` 的规则一致，表示为多个类型中的任意一个，如`string|number|boolean`，表示只能是`string`，或者`number`，或者`boolean`

### 类型别名
- 给一个类型起新的名字
- 类型别名`type`有时候和`interface`很像，但是可以用于原始类型、联合类型、元组以及其它任何需要你手写的的类型
- 和`interface`的区别：
  1. `interface`只能用于定义对象类型；
  2. `type`除了可以定义对象类型外，还能定义交叉类型、交叉类型、联合类型、原始类型等，类型的声明方式和适用范围更广泛
  3. `interface`能合并声明，即定义两个同名接口，最后只得到一个接口，且该接口含有两个接口的所有属性方法 
- 使用 `type SomeName = someValidTypeAnnotation` 的语法来创建类型别名
```ts
// 原始类型
type StringType = string;
// 联合类型
type SomeType = string|number|boolean;
// 元组类型
type TupleType = [string, number, boolean];
// 可以是泛型
type Container<T> = {value:T};
// 可以使用类型别名，在属性里引用自己
type Tree<T> = {
    value: T;
    node: Tree<T>;
};
```

### 类型索引
- `keyof`是类型索引，能获取`interface`中的联合类型（即属性），类似于`Object.keys()`
```ts
interface Button{
    type:string;
    text:string;
}
type ButtonKyes = keyof Button;
// 等效于
type ButtonKeys = 'type' | 'text'
```

### 类型约束
- 使用关键字`extends`对泛型进行类型约束
- 通常和索引类型`keyof`一起使用
```ts
function getValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

const obj = { a: 1 }
const a = getValue(obj, 'a')
```

### 映射类型
- 通过`in`关键词做类型的映射，遍历已有接口的`key`或是遍历联合类型
```ts
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

interface Obj {
  a: string
  b: string
}

type ReadOnlyObj = Readonly<Obj>
// 等价于
interface ReadOnlyObj {
    readonly a: string;
    readonly b: string;
}
```

### 条件类型
- 规则和三元表达式一样，经常用于一些不确定的情况
```ts
T extends U? X : Y;
```

---

## function 函数
- 定义时，ts的function需要定义参数的类型或者声明返回值的类型
- ts在参数中，可添加可选参数供使用者选择
- ts中能进行函数重载，使用者只需要通过查看函数的声明方式，就可知道函数传递的参数个数以及类型

---

## T泛型
- 编写代码时，允许定义一个以后使用时才指定的类型，在实例化时作为参数指明这些类型。
- 可在函数、接口、类中使用
