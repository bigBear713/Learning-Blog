## Chain of Responsibility责任链模式
- 定义：避免请求的发送者和接收者耦合在一起，让多个对象都有可能接收请求。
- 将这些对象连接成一条链，并沿着这条链传递请求，直到有对象处理它位置。
```js
const Chain = function(fn) {
  this.fn = fn;
  
  this.setNext = function() {}

  this.run = function() {}
}

const applyDevice = function() {}
const chainApplyDevice = new Chain(applyDevice);

const selectAddress = function() {}
const chainSelectAddress = new Chain(selectAddress);

const selectChecker = function() {}
const chainSelectChecker = new Chain(selectChecker);

// 运用责任链模式实现上边功能
chainApplyDevice.setNext(chainSelectAddress).setNext(chainSelectChecker);
chainApplyDevice.run();
```

## 什么时候使用
- 负责的是一个完整流程，或只负责流程中的某个环节
- 各环节可复用
- 各环节有一定的执行顺序
- 各环节可重组