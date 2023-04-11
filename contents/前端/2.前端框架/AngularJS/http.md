## http服务
- AngularJS的一个核心服务，用于向远程服务器请求数据
```js
// 简单的 GET 请求，可以改为 POST
$http({
    method: 'GET',
    url: '/someUrl'
}).then(
    function successCallback(response) {
        // 请求成功执行代码
    }, 
    function errorCallback(response) {
        // 请求失败执行代码
    }
);
// 简写方法
$http.get('/someUrl', config).then(successCallback, errorCallback);
$http.post('/someUrl', data, config).then(successCallback, errorCallback);
```
- 简写方法：
  1. $http.get
  2. $http.head
  3. $http.post
  4. $http.put
  5. $http.delete
  6. $http.jsonp
  7. $http.patch