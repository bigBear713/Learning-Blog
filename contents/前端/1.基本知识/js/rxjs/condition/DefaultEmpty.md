## defaultIfEmpty
- 没有值的 `of` 的默认值
- `EMPTY`的默认值
```js
of().pipe(defaultIfEmpty('of() Empty!')).subscribe(data=>console.log(data));
EMPTY().pipe(defaultIfEmpty('EMPTY()!')).subscribe(data=>console.log(data));
```