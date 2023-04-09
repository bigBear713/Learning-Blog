
## 常用指令
- ng-app: 声明一个module，应用程序的所有者
- ng-controller: 声明一个controller
- ng-model: 将输入域的值绑定到应用程序变量上
- ng-bind: 将应用程序的变量，绑定到某个html的innerHTML上
- ng-init: 初始化应用程序的变量，比较少使用，一般通过controller来初始化变量
- ng-repeat: 重复一个html元素片段，数据类型可以是 Array 和 Object，使用关键字`in`。

## 应用
- 应用也称为module
- 会有多个controller。controller可以定义赋值一些变量，挂载在`$scope`上
- 一个页面一般只有一个`ng-app`，用于定义应用程序的**根元素**
```html
<div ng-app="myApp" ng-controller="myCtrl">
名: <input type="text" ng-model="firstName"><br>
姓: <input type="text" ng-model="lastName"><br>
<br>
姓名: {{firstName + " " + lastName}}
</div>
 
<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";
});
</script>
```

## 表达式
- 使用`{{ expression }}`
- 和Angular中的插值表达式相同
