## distinctUntilChanged
- 只有当最新值和之前最后一个有效值不同时，才发出数据
```js
of(1,2,3,1,1,2,3,3,4).pipe(
    distinctUntilChanged()
).subscribe(data=>console.log(data))
// 1
// 2
// 3
// 1
// 2
// 3
// 4
```

## 和distinct的不同
- `distinct`是会让结果都不会重复。比如上述例子如果使用distinct,则结果是：1，2，3，4
- `distinctUntilChanged`只对当前值和前一个有效值进行比对，无法保证有效值之前是否有当前值，所以可能重复