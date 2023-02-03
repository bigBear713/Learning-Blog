## 信息存储
- 浏览器上的信息存储主要有几种方式：cookie, localStorage, sessionStorage，indexDB等。

## 区别
- indexDB是浏览器上的一种数据库，用的比较少。不进行此次比较
- cookie: 默认保存在内存中，浏览器关闭时失效，或者超过过期时间；大小最大为4KB；存储在浏览器上，每次http请求时都会带上
- localStorage: 理论上永久存在，只能手动清除；大小最大为5MB，部分浏览器可能有所差异；存储在浏览器上，http请求时不会带上
- sessionStorage: 当前页面会话下有效，关闭页面或浏览器后会被自动清除；大小最大为5MB，部分浏览器可能有所差异；存储在浏览器上，http请求时不会带上
- 适用场景：localStorage适合持久化缓存数据，比如页面的默认偏好等；sessionStorage适合存储临时的数据

## web storage注意事项
- localStorage存储的数据超出容量大小时会报错.之前存储的信息不会丢失
- localStorage存储的容量快满时,getItem的性能会急剧下降
- web storage存储复杂数据时依赖`JSON.stringify`,在移动端性能问题比较明显

## 参考资料
- https://juejin.cn/post/6844903989096497159