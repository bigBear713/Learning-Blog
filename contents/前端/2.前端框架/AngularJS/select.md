## select 选择框
- AngularJS中，有针对select定义特殊的指令： ng-options
```html
<div ng-app="myApp" ng-controller="myCtrl">
    <select ng-init="selectedName = names[0]" ng-model="selectedName" ng-options="x for x in names"></select>
    
</div>
 
<script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.names = ["Google", "Runoob", "Taobao"];
    });
</script>
```
- 使用对象作为数据源, x 为键(key), y 为值(value)
- 在下拉菜单也可以不使用 key-value 对中的 key , 直接使用对象的属性  
```html
<select ng-model="selectedSite" ng-options="x for (x, y) in sites"></select>
<select ng-model="selectedCar" ng-options="y.brand for (x, y) in cars"></select>

<h1>你选择的值是: {{selectedSite}}</h1>

<script>
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.sites = {
            site01 : "Google",
            site02 : "Runoob",
            site03 : "Taobao"
        };

        $scope.cars = {
            car01 : {brand : "Ford", model : "Mustang", color : "red"},
            car02 : {brand : "Fiat", model : "500", color : "white"},
            car03 : {brand : "Volvo", model : "XC90", color : "black"}
        };
    });
</script>

```

## ng-options和ng-repeat对比
- ng-repeat 的选项是一个字符串，有局限性
- ng-options 的选项是一个对象
- ng-options 指令更适合创建下拉列表