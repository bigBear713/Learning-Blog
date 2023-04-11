## router 路由
- 通常的 URL 形式为 http://runoob.com/first/page，但在单页 Web 应用中 AngularJS 通过 **`#!` + 标记** 实现: http://runoob.com/#!/first
- 当点击以上的链接时，向服务端请的地址都是一样的。因为 #! 号之后的内容在向服务端请求时会被浏览器忽略掉
- AngularJS 路由就通过 **#! + 标记** 帮助我们区分不同的逻辑页面并将不同的页面绑定到对应的控制器上。
- AngularJS 模块的 config 函数用于配置路由规则。通过使用 configAPI，把$routeProvider注入到我们的配置函数，并且使用$routeProvider.whenAPI来定义我们的路由规则
- $routeProvider 提供了 `when(path,object) & otherwise(object)` 函数按顺序定义所有路由，函数包含两个参数
  1. 第一个参数是 URL 或者 URL 正则规则
  2. 第二个参数是路由配置对象。
- 
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>AngularJS 路由实例 - 菜鸟教程</title>
<script src="https://cdn.bootcss.com/angular.js/1.7.0/angular.min.js"></script>
<!-- 载入了实现路由的 js 文件：angular-route.js -->
<script src="https://cdn.bootcss.com/angular.js/1.7.0/angular-route.min.js"></script>
</head>
<body ng-app='routingDemoApp'>
 
    <h2>AngularJS 路由应用</h2>
    <ul>
        <li><a href="#!/">首页</a></li>
        <li><a href="#!/computers">电脑</a></li>
        <li><a href="#!/printers">打印机</a></li>
        <li><a href="#!/blabla">其他</a></li>
    </ul>
     <!-- 使用 ngView 指令，该 div 内的 HTML 内容会根据路由的变化而变化。 -->
    <div ng-view></div>
    <script>
        // 包含了 ngRoute 模块作为主应用模块的依赖模块。
        angular.module('routingDemoApp',['ngRoute'])
        // 配置 $routeProvider，AngularJS $routeProvider 用来定义路由规则
        .config(['$routeProvider', function($routeProvider){
            $routeProvider
            .when('/',{template:'这是首页页面'})
            .when('/computers',{template:'这是电脑分类页面'})
            .when('/printers',{template:'这是打印机页面'})
            .otherwise({redirectTo:'/'});
        }]);
    </script>
</body>
</html>
```

---

## 路由设置对象
- AngularJS的路由也可通过不同的模板来实现
- 路由配置对象规则如下
```js
$routeProvider.when(url, {
    // 如果我们只需要在 ng-view 中插入简单的 HTML 内容，则使用该参数
    template: string, 
    // 如果我们只需要在 ng-view 中插入 HTML 模板文件，则使用该参数，最终会从服务端获取 views/computers.html 文件内容插入到 ng-view 中
    templateUrl: string,
    // 在当前模板上执行的controller函数，生成新的scope
    controller: string | function | array,
    // 为controller指定别名
    controllerAs: string,
    // 重定向的地址。
    redirectTo: string, function,
    // 指定当前controller所依赖的其他模块。
    resolve: object<key, function>
});
```
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>AngularJS 路由实例 - 菜鸟教程</title>
<script src="https://cdn.bootcss.com/angular.js/1.7.0/angular.min.js"></script>
<script src="https://cdn.bootcss.com/angular.js/1.7.0/angular-route.min.js"></script>
<script type="text/javascript">
angular.module('ngRouteExample', ['ngRoute'])
.controller('HomeController', function ($scope, $route) { $scope.$route = $route;})
.controller('AboutController', function ($scope, $route) { $scope.$route = $route;})
.config(function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'embedded.home.html',
        controller: 'HomeController'
    }).
    when('/about', {
        templateUrl: 'embedded.about.html',
        controller: 'AboutController'
    }).
    otherwise({
        redirectTo: '/home'
    });
});
</script>
 
  
</head>
 
<body ng-app="ngRouteExample" class="ng-scope">
  <script type="text/ng-template" id="embedded.home.html">
      <h1> Home </h1>
  </script>
 
  <script type="text/ng-template" id="embedded.about.html">
      <h1> About </h1>
  </script>
 
  <div> 
    <div id="navigation">  
      <a href="#!/home">Home</a>
      <a href="#!/about">About</a>
    </div>
      
    <div ng-view="">
    </div>
  </div>
</body>
</html>
```