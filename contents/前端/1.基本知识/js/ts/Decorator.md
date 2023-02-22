
## Decorator装饰器
- 是一种特殊类型的声明，能够被附加到类声明、方法、访问符、属性或参数上。
- 是一种在不改变原来类和使用继承的情况下，动态拓展对象功能
- 本质是一个函数，`@expression`的形式是`Object.defineProperty`的语法糖
- `expression`求值后必须也是一个函数，会在运行时被调用，被装饰的声明信息将作为参数传入

### 类装饰
- 会将构造函数作为参数传入
```ts
function addAge(constructor:Function){
    constructor.prototype.age = 18;
}

@addAge
class Person{
    name:string;
    age!:number;
    constructor(){
        this.name='person';
    }
}
let person = new Person();
console.log(person.age); // 18
// 等价于
Person = addAge(function Person(){...})
```
### 方法/属性装饰
- 当装饰器用于修饰类的方法和属性时，参数就变成：
  1. target - 对象原型
  2. propertyKey - 方法\属性名称
  3. descriptor - 方法的属性描述符（如果是属性，则没有此参数）
- 这3个参数就是`Object.defineProperty()`的3个参数
```ts
// 声明装饰器修饰方法/属性
function method(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(target);
  console.log("prop " + propertyKey);
  console.log("desc " + JSON.stringify(descriptor) + "\n\n");
  descriptor.writable = false;
};

function property(target: any, propertyKey: string) {
  console.log("target", target)
  console.log("propertyKey", propertyKey)
}

class Person{
 @property
 name: string;
 constructor() {
   this.name = 'huihui';
 }

 @method
 say(){
   return 'instance method';
 }

 @method
 static run(){
   return 'static method';
 }
}

const xmz = new Person();

// 修改实例方法say
xmz.say = function() {
 return 'edit'
}
```

### 参数装饰
- 接收3个参数
  1. target - 当前对象的原型
  2. propertyKey - 参数的名称
  3. index - 参数数组中的位置
```ts
function logParameter(target: Object, propertyName: string, index: number) {
  console.log(target);
  console.log(propertyName);
  console.log(index);
}

class Employee {
  greet(@logParameter message: string): string {
      return `hello ${message}`;
  }
}
const emp = new Employee();
emp.greet('hello');
```

### 执行顺序
- 当多个装饰器应用于同一个声明上，将由上至下依次对装饰器表达式求值，执行的结果会被当作函数，由下至上依次调用