## scope作用域
- scope是应用在 HTML view 和 JS controller之间的纽带
- 是一个对象，有可用的属性和方法
- 可应用在视图和控制器上

---

## 使用
- 在创建controller时，传入`$scope`参数
- 控制器中的属性名，和视图中的属性名一致
- 视图中，不再需要添加`$scope`前缀

---
 
 ## 作用范围
 - 当使用`ng-repeat`时，每个重复项都访问当前的重复对象
 - 根作用域：所有应用都有一个`$rootScope`根作用域，可以作用在ng-app指令包含的所有HTML元素中。是各个controller中scope的桥梁，用`$rootScope`定义的属性和方法，可以在各个controller中使用
 - 创建控制器时，可将参数`$rootScope`传入
