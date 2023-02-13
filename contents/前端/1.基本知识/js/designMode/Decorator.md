## Decorator装饰器模式
- 给对象动态添加职责的方式
- 传统给对象添加功能常使用集成的方式，但这种方式不灵活。装饰器模式相比更灵活
```js
// AOP 装饰函数:
Function.prototype.before = function(fn) {
  const self = this
  return function() {
    fn.apply(new(self), arguments)  // https://github.com/MuYunyun/blog/pull/30#event-1817065820
    return self.apply(new(self), arguments)
  }
}

Function.prototype.after = function(fn) {
  const self = this
  return function() {
    self.apply(new(self), arguments)
    return fn.apply(new(self), arguments)
  }
}

```

## 参考
- https://juejin.cn/post/6844903861606416397
