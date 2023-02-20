## 防抖
- 防抖是让事件函数推迟一段时间后，才触发执行
- 只有设定的时间段内没有新的触发执行请求，达到设定的时间后才会真正触发执行事件函数
- 如果设定的时间段内有新的触发执行请求，则仍不会执行，且推迟时间会重新计算

## 手写防抖实现
```js
function debounce(fn, delay=0, immediate=false){
    let timer;
    let isFirstTime = true;

    return function(...args){
        if(timer){
            clearTimeout(timer);
        }

        const callFn = ()=>{
            fn.apply(this,args);
            isFirstTime = false;
        };
        
        // 首次立即执行
        if(isFirstTime && immediate){
            callFn();
        }

        timer = setTimeout(()=>{
            callFn();
        }, delay);
    };
}

function ajaxReq(){
    // ...
}

window.addEventListener('click',debounce(ajaxReq,1000));
```
- 如果需要获取返回结果，可以增加回调函数参数。


## 参考
- https://juejin.cn/post/7032905194736189477