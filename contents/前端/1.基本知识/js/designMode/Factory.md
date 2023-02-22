## Factory工厂模式
- 不暴露创建对象的逻辑，而是封装在一个函数中。这个函数就可被称为 `Factory` 工厂
- 分类
  1. Simple Factory - 简单工厂模式
  2. Factory Method - 工厂方法模式
  3. Abstract Factory - 抽象工厂模式

### Simple Factory
- 也叫静态工厂模式，用一个工厂函数创建一类对象类的实例
```js
function Factory(career) {
    function User(career, work) {
        this.career = career 
        this.work = work
    }
    let work
    switch(career) {
        case 'coder':
            work =  ['写代码', '修Bug'] 
            return new User(career, work)
            break
        case 'hr':
            work = ['招聘', '员工信息管理']
            return new User(career, work)
            break
        case 'driver':
            work = ['开车']
            return new User(career, work)
            break
        case 'boss':
            work = ['喝茶', '开会', '审批文件']
            return new User(career, work)
            break
    }
}
let coder = new Factory('coder')
console.log(coder)
let boss = new Factory('boss')
console.log(boss)
```

### 工厂方法模式
- 跟简单工厂模式差不多，差别是将具体的产品放到工厂函数的 `prototype` 中
- 这样当拓展产品类时，就不必修改工厂函数，核心类就变成抽象类，也可以随时修改某种具体的产品
- 工厂方法关键核心代码是工厂里面的判断this是否属于工厂，也就是做了分支判断，这个工厂只做我能做的产品
```js
// 工厂方法
function Factory(career){
    if(this instanceof Factory){
        var a = new this[career]();
        return a;
    }else{
        return new Factory(career);
    }
}
// 工厂方法函数的原型中设置所有对象的构造函数
Factory.prototype={
    'coder': function(){
        this.careerName = '程序员'
        this.work = ['写代码', '修Bug'] 
    },
    'hr': function(){
        this.careerName = 'HR'
        this.work = ['招聘', '员工信息管理']
    },
    'driver': function () {
        this.careerName = '司机'
        this.work = ['开车']
    },
    'boss': function(){
        this.careerName = '老板'
        this.work = ['喝茶', '开会', '审批文件']
    }
}
let coder = new Factory('coder')
console.log(coder)
let hr = new Factory('hr')
console.log(hr)
```

### 抽象工厂模式
- 抽象工厂模式并不直接生成实例， 而是用于对产品类簇的创建
- 主要分为4部分
  1. 用于创建抽象类的函数
  2. 抽象类
  3. 具体类
  4. 实例化具体类
```js
let CareerAbstractFactory = function(subType, superType) {
  // 判断抽象工厂中是否有该抽象类
  if (typeof CareerAbstractFactory[superType] === 'function') {
    // 缓存类
    function F() {}
    // 继承父类属性和方法
    F.prototype = new CareerAbstractFactory[superType]()
    // 将子类的constructor指向父类
    subType.constructor = subType;
    // 子类原型继承父类
    subType.prototype = new F()
  } else {
    throw new Error('抽象类不存在')
  }
}
```

---

## 应用场景
- 简单工厂模式：有构造函数的地方，就应该考虑简单工厂。但如果函数构建太多与复杂，会导致工厂函数变得复杂，所以不适合复杂情况
- 抽象工厂模式：一般用于严格要求用面向对象思想开发的大型项目中，常规开发一般简单工厂模式和工厂方法模式用得多一些
- 如果**不想**让某个子系统与较大的那个对象之间形成强耦合，而是想运行时从许多子系统中进行挑选的话，那么工厂模式是一个不错的选择
- 将`new`操作符简单封装，遇到new的时候就应该考虑工厂模式
- 需要依赖具体环境创建不同实例，这些实例都有相同行为，这时候可以使用工厂模式，简化实现过程，同时也可减少每种对象所需的代码量，有利于消除对象间的耦合，提供更大灵活性