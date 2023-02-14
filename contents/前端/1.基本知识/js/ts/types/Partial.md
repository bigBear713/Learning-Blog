## Partial
- 将原始类型中的属性变成可选属性
```ts
interface IUser{
    name:string;
    sex:number;
}

type MyUser = Partial<IUser>;
// 此时，MyUser中的name，sex都变成可选属性
```