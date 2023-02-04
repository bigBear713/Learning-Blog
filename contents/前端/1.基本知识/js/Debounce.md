## 防抖
- 防抖是让事件函数推迟一段时间后，才触发执行
- 如果设定的时间段内有新的触发请求，则推迟时间会重新计算
- 只有设定的时间段内没有新的触发请求，达到设定的时间后才会真正触发事件函数

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

## 参考
- https://juejin.cn/post/7032905194736189477