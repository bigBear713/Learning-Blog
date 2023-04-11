## service服务
- 服务是一个函数，或者对象，可在AngularJS应用中使用

---

## 常见服务
### $location
- 可以返回当前页面的URL
- 在AngularJS中，使用$location比使用window.location好

|                                           | window.location                    | $location                                            |
| ----------------------------------------- | ---------------------------------- | ---------------------------------------------------- |
| 目的                                      | 允许对当前浏览器的位置进行读写操作 | 同window.location                                    |
| API                                       | 暴露一个能被读写的对象             | 暴露jquery风格的读写器                               |
| 是否在AngularJS应用生命周期中，和应用整合 | 否                                 | 可获取到应用的生命周期的每一个阶段，并且和$watch整合 |
| 是否和HTML5 API无缝整合                   | 否                                 | 是（对低级浏览器优雅降级）                           |
| 和应用的上下文是否关联                    | 否                                 | 是                                                   |

```js
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $location) {
    $scope.myUrl = $location.absUrl();
});
```

### $http
- 向服务器发送http请求，并响应传过来的数据
- 具体见http章节
```js
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $http.get("welcome.htm").then(function (response) {
        $scope.myWelcome = response.data;
    });
});
```

### $timeout
- 对应window.setTimeout
```js
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $timeout) {
    $scope.myHeader = "Hello World!";
    $timeout(function () {
        $scope.myHeader = "How are you today?";
    }, 2000);
});
```

### $interval
- 对应window.setInterval函数
```js
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $interval) {
    $scope.theTime = new Date().toLocaleTimeString();
    $interval(function () {
        $scope.theTime = new Date().toLocaleTimeString();
    }, 1000);
});
```

---

## 自定义服务
- 使用`.service()`创建自定义服务
- 使用自定义服务，需要在定义controller的时候，独立添加，设置依赖。
- 还能在过滤器、指令或其它服务中使用
```js
var app = angular.module('myApp', []);

app.service('hexafy', ['hexafy', function() {
	this.myFunc = function (x) {
        return x.toString(16);
    }
}]);

app.controller('myCtrl', ['hexafy', function($scope, hexafy) {
  $scope.hex = hexafy.myFunc(255);
}]);

app.filter('myFormat',['hexafy', function(hexafy) {
    return function(x) {
        return hexafy.myFunc(x);
    };
}]);
```