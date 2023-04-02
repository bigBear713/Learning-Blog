## 核心特征
- 只有`pending`（初始化）,`fulfilled`（操作成功）,`rejected`（操作失败）3种状态。
- 状态一旦改变无法再被更改。
- 执行`resolve()`时，状态会从`pending`变为`fullfilled`。执行`reject()`时，状态会从`pending`变为`rejected`。
- Promise中有`throw`时，状态会变成`rejected`。
- 必须给Promise传入一个可执行函数，否则会报错，变成`rejected`状态.

## 常用方法
- `new  Promise((resolve,reject)=>{}).then(fulfilledFn,rejectedFn).catch(err=>{})`: 创建一个Promise实例,并传入一个可执行函数.`.then`接收"成功时"和"失败时"的回调函数,建议只传入成功时的回调函数,失败时的回调统一在`.catch`中处理.`.catch`是处理失败时的回调.
- `Promise.all([promise1,promise2]).then(results=>{})`: 传入promise实例数组,会全部执行.等到全部有结果后才会有回调.回调函数会传入结果数组.
- `Promise.race([promise1,promise2]).then(result=>{})`: 传入promise实例数组,只要有一个有结果,会立即执行回调,不再管其它promise实例的结果.

## 手写Promise的实现
```js
class MyPromise{
    static PENDING = 'pending';
    static FULFILLED = `fulfilled`;
    static REJECTED = 'rejected';

    constructor(fn){
        this.PromiseState = MyPromise.PENDING;
        this.PromiseResult = null;

        this.onFulFilledCallbacks=[];
        this.onRejectedCallbacks=[];

        try{
            fn(this.resolve.bind(this),this.reject.bind(this));
        }catch(err){
            this.reject(err);
        }
    }

    resolve(result) {
        if(this.PromiseState!==MyPromise.PENDING) return;

        this.PromiseState = MyPromise.FULFILLED;
        this.PromiseResult = result;
        this.onFulFilledCallbacks.forEach(callback=>callback(result));
    }

    reject(reason) {
        if(this.PromiseState!==MyPromise.PENDING) return;

        this.PromiseState = MyPromise.REJECTED;
        this.PromiseResult = reason;
        this.onRejectedCallbacks.forEach(callback=>callback(reason));
    }

    then(onFulfilled, onRejected) {
        const isOnFulfilledFn = typeof onFullfilled === 'function';
        const isOnRejectedFn = typeof onRejected === 'function';

        const doFulfilledFn = (promise2,resolve,reject)=>{
            setTimeout(()=>{
                if(!isOnFulfilledFn){
                    return resolve(this.PromiseResult);
                }

                try {
                    const x = onFulfilled(this.PromiseResult);
                    resolvePromise(promise2,x,resolve,reject);
                } catch (err){
                    reject(err);
                }
            });
        };
        const doRejectedFn = (promise2,resolve,reject)=>{
            setTimeout(()=>{
                if(!isOnRejectedFn){
                    return reject(this.PromiseResult);
                }

                try {
                    const x = onRejected(this.PromiseResult);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (err){
                    reject(err);
                }
            });
        };

        const promise2 =  new MyPromise((resolve,reject)=>{
            switch(this.PromiseState){
                case MyPromise.FULFILLED:
                    doFulfilledFn();
                    break;
                case MyPromise.REJECTED:
                    doRejectedFn();
                    break;
                case MyPromise.PENDING:
                    this.onFulfilledCallbacks.push(() => doFulfilledFn(promise2,resolve,reject));
                    this.onRejectedCallbacks.push(() => doRejectedFn(promise2,resolve,reject));
                    break;
            }
        });
        return promise2;
    }
}

function resolvePromise(promise2, x, resolve, reject){
    if(promise2===x) throw new TypeError('Chaining cycle detected for promise');

    if(x instanceof MyPromise){
        x.then(
            y=>resolvePromise(promise2,y,resolve,reject),
            reject
        );
    } else if(x!==null && (typeof x==='object' || typeof x==='function')){
        let then;
        try{
            then = x.then;
        }catch(err){
            return reject(err);
        }

        if(typeof then !== 'function'){
            resolve(x);
            return;
        } 
        let called = false;
        try {
            then.call(
                x,
                result=>{
                    if(called) return;
                        called = true;
                        resolvePromise(promise2,result,resolve,reject);
                },
                reason=>{
                    if(called) return;
                    called = true;
                    reject(reason);
                }
            );
        } catch (err){
            if(called) return;
            called = true;
            reject(err);
        }
    } else {
        resolve(x);
    }
}

```

## 参考
- https://juejin.cn/post/7043758954496655397