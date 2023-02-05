## 节流
- 控制事件函数触发执行的频率，每隔一段时间触发执行一次

## 手写节流实现
```js
function throttle(fn, internalTime=0, immediate=false){
    let lastTime = new Date().getTime();
    let isFirstTime = true;

    return function(...args){
        const nowTime = new Date().getTime();
        
        // 首次立即执行
        if(isFirstTime && immediate){
            lastTime = 0;
            isFirstTime = false;
        }
        
        const remainTime = nowTime-lastTime;
        if(remainTime >= internalTime){
            fn.apply(this,args);
            lastTime = new Date().getTime();
            isFirstTime = false;
        }
    }
}

function logStr(){
    // ...
}

window.addEventListener('click',throttle(logStr,1000));
```
- 如果需要获取返回结果，可以增加回调函数参数。

## 参考
- https://juejin.cn/post/7032905194736189477