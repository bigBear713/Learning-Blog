## DI依赖注入
- AngularJS提供很好的依赖注入机制，以下5个核心组件作为依赖注入
  1. value
  2. factory
  3. service
  4. provider
  5. constant

---

## value
- 是一个简单的js对象，用于向控制器传递值（配置阶段）

```js
// 定义一个模块
var mainApp = angular.module("mainApp", []);

// 创建 value 对象 "defaultInput" 并传递数据
mainApp.value("defaultInput", 5);
...

// 将 "defaultInput" 注入到控制器
mainApp.controller('CalcController', function($scope, CalcService, defaultInput) {
   $scope.number = defaultInput;
   $scope.result = CalcService.square($scope.number);
   
   $scope.square = function() {
      $scope.result = CalcService.square($scope.number);
   }
});
```

---

## factory
- 是一个函数，用于返回值，在 service 和 controller 需要时创建
- 通常使用factory函数来计算或返回值
```js
// 定义一个模块
var mainApp = angular.module("mainApp", []);

// 创建 factory "MathService" 用于两数的乘积 provides a method multiply to return multiplication of two numbers
mainApp.factory('MathService', function() {
   var factory = {};
   
   factory.multiply = function(a, b) {
      return a * b
   }
   return factory;
}); 

// 在 service 中注入 factory "MathService"
mainApp.service('CalcService', function(MathService){
   this.square = function(a) {
      return MathService.multiply(a,a);
   }
});
```

---

## provider
- 通过 provider 创建一个 service 或 factory 等（配置阶段）
- provider 提供了一个 factory 方法 get(), 它用于返回 value/service/factory 等
```js
// 定义一个模块
var mainApp = angular.module("mainApp", []);

// 使用 provider 创建 service 定义一个方法用于计算两数乘积
mainApp.config(function($provide) {
   $provide.provider('MathService', function() {
      this.$get = function() {
         var factory = {};  
         
         factory.multiply = function(a, b) {
            return a * b; 
         }
         return factory;
      };
   });
});
```

---

## constant
- 用来在配置阶段传递数值。
- 注意这个值在配置阶段是不可用的
```js
mainApp.constant("configParam", "constant value");
```