## this指针
- this指针一般在运行调用时才确定，指向最后调用它的那个对象。
```js
1. 
var name = "windows name";
function a() {
    var name = "innerName";
    console.log(this.name); // windows name
}
a(); // 此时等价于windows.a(); 最后调用a()的是windows，所以this指向的是windows

2.
var name = "windows name";
var a = {
    name:'a name',
    fn:function(){
        console.log(this.name); // a name
    }
};
a.fn(); // 最后调用fn()的是对象a，所以this指向的是对象a
windows.a.fn(); // 最后调用fn()的是对象a，所以this指向的是对象a

3. 
var name = "windows name";
var a = {
    name:'a name',
    fn:function(){
        console.log(this.name); // windows name
    }
};
const fn = a.fn;
fn(); // 等价于windows.fn()，最后调用fn()的是windows，所以this指向的是windows

4.
var name = "windows name";
function a(){
    var name = "innerName";
    function innerFn(){
        console.log(this.name); // windows name
    }
    innerFn();
}
a(); // 等价于windows.a()，最后调用a()的是windows，所以a()内部的this是指向windows

5. 
var name = "windows name";
var a = {
    name:'a name',
    fn:function(){
        setTimeout(function(){
            console.log(this.name); // windows name
        });
        
    }
};
a.fn(); // setTimeout是在windows下，所以此时this指向的是windows

```
- 箭头函数比较特殊，在定义时就已经确定this指向谁。

---

## call, apply, bind
- 这3个都可以改变方法函数内的this指针指向。
- bind是返回一个改变后的新方法函数；call，apply则是直接调用执行。
- call在传参时是将参数展开，一个一个的传入；apply在传参时是将所有参数合为一个数组传入。
```js
const obj1 = {name:'obj1'};
const obj2 = {name:'obj2'};
const obj3 = {name:'obj3'};
const obj = {name:'obj',getName:function(arg1,arg2){console.log(`this name is ${this.name}, arg1 is ${arg1}, arg2 is ${arg2}`)}};

obj.getName('obj-arg1','obj-arg2'); // this name is obj, arg1 is obj-arg1, arg2 is obj-arg2

const obj1GetName = obj.getName.bind(obj1);

obj1GetName('obj1-arg1','obj1-arg2'); // this name is obj1, arg1 is obj1-arg1, arg2 is obj1-arg2
obj.getName.call(obj2,'obj2-arg1','obj2-arg2'); // this name is obj2, arg1 is obj2-arg1, arg2 is obj2-arg2
obj.getName.apply(obj3,['obj3-arg1','obj3-arg2']); // this name is obj3, arg1 is obj3-arg1, arg2 is obj3-arg2
```

---

## new
- 通过 `new` 关键字创建的实例，`this` 总是指向它本身
```js
function newFn(...args) {
  const constructor = args.shift();
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);
  return typeof result === "object" && result !== null ? result : obj;
}

function Person(name) {
  this.name = name;
}

const p = newFn(Person, "person");

console.log("p.name : ", p.name); // p.name :  person
```

---

## 箭头函数
- 箭头函数自身不会创建`this`，只会从上一级继承`this`。
- 箭头函数的`this`在定义的时候就已经确定，之后不会再改变。
- 箭头函数不能作为构造函数使用，没有自身的`prototype`，也没有`arguments`