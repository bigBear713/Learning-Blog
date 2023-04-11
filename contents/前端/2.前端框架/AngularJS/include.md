## include包含
- AngularJS中，可以在HTML中，包含另一个HTML文件
- 使用 ng-include 指令包含HTML内容
```html
<body ng-app="">
    <div ng-include="'runoob.htm'"></div>
</body>
```
- ng-include 除了包含HTML内容外，还能包含AngularJS代码
```html
<!-- site.html -->
<table>
<tr ng-repeat="x in names">
<td>{{ x.Name }}</td>
<td>{{ x.Url }}</td>
</tr>
</table>

<div ng-app="myApp" ng-controller="sitesCtrl"> 
  <div ng-include="'sites.html'"></div>
</div>
 
<script>
var app = angular.module('myApp', []);
app.controller('sitesCtrl', function($scope, $http) {
    $http.get("sites.php").then(function (response) {
        $scope.names = response.data.records;
    });
});
</script>
```

### 跨域包含
- 默认情况下，ng-include不允许包含其它域名的文件
- 如果需要包含其它域名的文件，需要设置域名访问白名单, 此外，你还需要设置服务端允许跨域访问
```html
<body ng-app="myApp">
 
<div ng-include="'https://c.runoob.com/runoobtest/angular_include.php'"></div>
 
<script>
    var app = angular.module('myApp', [])
    app.config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'https://c.runoob.com/runoobtest/**'
        ]);
    });
</script>
 
</body>
```