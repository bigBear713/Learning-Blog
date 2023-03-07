## Extract
- 交集，即取两个类型共有的属性
```ts
type A = 1|2|3;
type B = 1|3|4|5;
type AExtractB = Extract<A,B>;
// 等价于
type AExtractB = 1|3;
```