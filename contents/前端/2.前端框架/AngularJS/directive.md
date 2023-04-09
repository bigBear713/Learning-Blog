
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

