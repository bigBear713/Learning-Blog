## 防抖
- 防抖是让事件函数推迟一段时间后，才触发执行
- 只有设定的时间段内没有新的触发执行请求，达到设定的时间后才会真正触发执行事件函数
- 如果设定的时间段内有新的触发执行请求，则仍不会执行，且推迟时间会重新计算

## 手写防抖实现
```js
function debounce(fn, delay=0,immediate =false){
    let timer;
    let isImmediateInvoke = false;
    return function(...args){
        if(timer){
            clearTimeout(timer);
        }
        if(!isImmediateInvoke && immediate){
            fn.apply(this,args);
            isImmediateInvoke = true;
        }
        timer = setTimeout(()=>{
            fn.apply(this,args);
            isImmediateInvoke = true;
        },delay);
    };
}

function ajaxReq(){
    // ...
}

debounce(agayReq(),1000);
```
- 如果需要返回结果，则需要传入结果回调函数。

## 参考
- https://juejin.cn/post/7032905194736189477