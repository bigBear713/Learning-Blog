## Exclude
- 差集，即A中去除B的属性
```ts
type A = 1|2|3;
type B = 1|3|4|5;
type AExcludeB = Exclude<A,B>;
// 等价于
type AExcludeB = 2;
```