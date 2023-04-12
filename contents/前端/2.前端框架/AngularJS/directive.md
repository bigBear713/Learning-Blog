## 内置指令
### ng-repeat 
- 重复一个html元素片段，数据类型可以是 Array 和 Object，使用关键字`in`。
- 在作用域内，可以使用`$index`获取索引
- 在作用域内，可以使用`$even`和`$odd`获取当前项是否为奇数，或者偶数
```html
<table>
  <tr ng-repeat="x in names">
    <td>{{ $index + 1 }}</td>
    <td>{{ x.Name }}</td>
    <td>{{ x.Country }}</td>
  </tr>
</table>

<table>
  <tr ng-repeat="x in names">
    <td ng-if="$odd" style="background-color:#f1f1f1">{{ x.Name }}</td>
    <td ng-if="$even">{{ x.Name }}</td>
    <td ng-if="$odd" style="background-color:#f1f1f1">{{ x.Country }}</td>
    <td ng-if="$even">{{ x.Country }}</td>
  </tr>
</table>
```

### ng-if
- 根据条件判断是否显示某个html片段
```html
<div ng-if="condition">test</div>
```

---

## 创建自定义指令
- 使用 `.directive` 函数来添加自定义的指令
- 使用**驼峰法**来命名一个指令，但在**使用**它时需要以 `-` 分割
- 可以通过以下方式调用指令
  1. 元素名：<runoob-directive></runoob-directive>
  2. 属性：<div runoob-directive></div>
  3. 类名：<div class="runoob-directive"></div>
  4. 注释：<!-- directive: runoob-directive -->
- 限定只能通过特定的方式来调用：添加 restrict 属性，属性值分以下几种，默认值为`EA`
  1. E:作为元素名使用
  2. A:作为属性使用
  3. C:作为类名使用
  4. M:作为注释使用
```js
var app = angular.module("myApp", []);
app.directive("runoobDirective", function() {
    return {
        restrict : "A",
        template : "<h1>自定义指令!</h1>"
    };
});
```

---

## 创建独立作用域isolate scope
- 自定义的指令，默认会从父级的controller得到scope，但这样会导致每次使用都需要创建一个controller，比较繁琐
```html
<!doctype html>
<html ng-app="docsScopeProblemExample">
  <head>
    <script src="http://code.angularjs.org/1.2.25/angular.min.js"></script>
    <script src="script.js"></script>
  </head>
  <body>
    <div ng-controller="NaomiCtrl">
      <my-customer></my-customer>
    </div>
    <hr>
    <div ng-controller="IgorCtrl">
      <my-customer></my-customer>
    </div>

    <script>
      angular.module('docsScopeProblemExample', [])
      .controller('NaomiCtrl', function($scope) {
        $scope.customer = {
          name: 'Naomi',
          address: '1600 Amphitheatre'
        };
      })
      .controller('IgorCtrl', function($scope) {
        $scope.customer = {
          name: 'Igor',
          address: '123 Somewhere'
        };
      })
      .directive('myCustomer', function() {
        return {
          restrict: 'E',
          templateUrl: 'my-customer.html'
        };
      });
    </script>
  </body>
</html>
```
- 通过创建独立作用域(isolate scope)，把指令的作用域与外部的作用域隔离开来，然后映射外部的作用域到指令内部的作用域会比较好
- 独立作用域可以绑定不同数据到指令内部的作用域
- 指令的独立作用域能隔离除了添加到`scope:{}`中的数据模型之外的一切东西
- 普通的作用域都使用原型方式继承自父作用域。但是独立作用域没有这样的继承关系

### 定义输入属性
- 独立作用域内的属性名也遵循驼峰命名规范，即如果在作用域中定义 '=bindProp' ，在模板中使用时，就应写成 '<div bind-prop="" />'
- 如果想属性名和绑定的值的名字一样，可使用快捷语法 '='
```html
<!doctype html>
<html ng-app="docsIsolateScopeDirective">
  <head>
    <script src="http://code.angularjs.org/1.2.25/angular.min.js"></script>
    <script src="script.js"></script>
  </head>
  <body>
    <div ng-controller="Ctrl">
      <my-customer info="naomi"></my-customer>
      <hr>
      <my-customer info="igor"></my-customer>
    </div>

    <script>
      angular.module('docsIsolateScopeDirective', [])
      .controller('Ctrl', function($scope) {
        $scope.naomi = { name: 'Naomi', address: '1600 Amphitheatre' };
        $scope.igor = { name: 'Igor', address: '123 Somewhere' };
      })
      .directive('myCustomer', function() {
        return {
          restrict: 'E',
          scope: {
            customerInfo: '=info',
            bindProp:'=' // 等价于 bindProp:'bindProp'
          },
          template: 'Name: {{customerInfo.name}} Address: {{customerInfo.address}}'
        };
      });
    </script>
  </body>
</html>
```

### 操作DOM
- 指令修改 DOM 通常是在 `link` 选项中，`link` 选项接收一个函数：`function link(scope,element,attrs){}`
  1. scope: 是一个AngularJS的scope对象
  2. element: 匹配的jqLite封装的元素(angular内部实现的类jquery的库) 
  3. attrs: 带有规范化后属性名字和相应值的对象
- destroy事件：注册一个监听事件`element.on('$destroy',...)`，当一个被angularjs编译过的DOM元素被移除时，会触发一个destroy事件。
- 同样的，当一个angular作用域被移除时，它会向下广播destroy事件到所有下级作用域，使用`scope.$on('$destroy', ...)`

### 创建包含其它元素的指令
- 有时需要传进整个模板，而不是字符串或者对象。此时需要使用`transclude`选项
- `transclude`使带有这个选项的指令，所包裹的内容能够访问指令外部的作用域
- 如果指令不创建自己的scope(就是说scope:false，或省略)，然后在link函数里执行对scope 属性的修改，会影响外部的scope对象，因此此时指令的scope是继承了外部的scope
- 仅当你要创建一个包裹任意内容的指令的时候使用`transclude: true`

### 定义输出事件
- 定义输入属性时，使用 **`=`+属性名**
- 定义输出事件时，则使用 **`&`+事件名**


```html
<!doctype html>
<html ng-app="docsIsoFnBindExample">
  <head>
    <script src="http://code.angularjs.org/1.2.25/angular.min.js"></script>
    <script src="script.js"></script>
  </head>
  <body>
    <div ng-controller="Ctrl">
      <my-dialog ng-hide="dialogIsHidden" on-close="hideDialog()">
        Check out the contents, !
      </my-dialog>
    </div>

    <script>
      angular.module('docsIsoFnBindExample', [])
        .controller('Ctrl', function($scope, $timeout) {
          $scope.name = 'Tobias';
          $scope.hideDialog = function () {
            $scope.dialogIsHidden = true;
            $timeout(function () {
              $scope.dialogIsHidden = false;
            }, 2000);
          };
        })
        .directive('myDialog', function() {
          return {
            restrict: 'E',
            transclude: true,
            scope: {
              'close': '&onClose'
            },
            templateUrl: 'my-dialog-close.html'
          };
        });
    </script>
  </body>
</html>

<!-- my-dialog-close.html -->
<div class="alert">
  <a href class="close" ng-click="close()">&times;</a>
  <div ng-transclude></div>
</div>

```


---

## 参考
- https://www.angularjs.net.cn/tutorial/5.html
