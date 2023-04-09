## 过滤器
- 可以使用一个管道字符（|）添加到表达式和指令中，和Angular中的管道使用方式一样
- 过滤器可用于转换数据
- 使用`:`添加更多参数
- 使用`|`使用多个过滤器

| 过滤器 | 描述 |
| --- | --- |
| currency | 格式化数字为货币格式 |
| filter | 从数组项中选择一个子集 |
| lowercase | 格式化字符串为小写 |
| orderBy | 根据某个表达式排列数组 |
| uppercase | 格式化字符串为大写 |

---

## 自定义过滤器
- 使用`.filter()`自定义过滤器，返回一个函数
```js
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.msg = "Runoob";
});
app.filter('reverse', function() { //可以注入依赖
    return function(text) {
        return text.split("").reverse().join("");
    }
});
```