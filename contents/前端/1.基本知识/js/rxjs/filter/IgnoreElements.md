## ignoreElements
- 忽略所有发出的数据流，只响应error和complete
```js
of(1,2,3).pipe(
    ignoreElements()
).subscribe(
    data=>console.log('next'),
    err=>console.log('error'),
    ()=>console.log('complete'),
)
```