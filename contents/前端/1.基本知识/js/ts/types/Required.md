## Required
- 所有属性都需要
- 和`Partial`相反
```ts
interface IUser{
    name?:string;
    sex?:number;
}

type MyUser = Required<IUser>;
// 此时，MyUser中的name，sex都变成必需属性
```