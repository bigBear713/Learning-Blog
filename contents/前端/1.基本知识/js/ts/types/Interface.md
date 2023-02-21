## Interface

---

## Type和Interface的区别
### 相同点：
- 都可以描述一个对象或函数
- 都可拓展
```ts
// interface extends interface
interface Name { firstName:string }
interface User extends Name{ }
// type extends type
type Name={firstName:string};
type User = Name & {age:number}
// interface extends type
type Name = { firstName:string }
interface User extends Name
// type extends interface
interface Name { firstName:string }
type User = Name & { age:number };
```

### 不同点
- `type` 可以，`interface`不可以
  1. `type`可以声明基本类型别名、联合类型、元组等
  2. 可以使用`typeof`获取实例的类型进行赋值
  3. 其它骚操作
```ts
// 基本类型别名
type MyString = string;
// 联合类型
interface Cat{}
interface Dog{}
type Pet = Cat | Dog
// 定义数组中，每个位置的元素的类型
type PetList = [Dog, Cat]

// 使用typeof获取实例的类型进行赋值
const div = document.createElement('div');
type DivType = typeof div;

// 骚操作
type StringOrNumber = string | number;  
type Text = string | { text: string };  
type NameLookup = Dictionary<string, Person>;  
type Callback<T> = (data: T) => void;  
type Pair<T> = [T, T];  
type Coordinates = Pair<number>;  
type Tree<T> = T | { left: Tree<T>, right: Tree<T> };
```
- `interface`可以，`type`不行
  1. `interface`能够声明合并
```ts
interface User {
    name:string;
    age:number;
}
interface User{
    sex:string;
}
// interface User最后的结果为
// {
//     name:string;
//     age:number;
//     sex:string;
// }
```

---

## 参考
- https://juejin.cn/post/6844903749501059085