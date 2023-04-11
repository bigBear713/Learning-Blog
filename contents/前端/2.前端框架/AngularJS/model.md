## 模型
- ng-model用于绑定应用程序数据到html控制器的值

### 双向绑定
- 在修改输入域的值时，AngularJS属性的值也将修改

### 数据状态
- 可以为应用数据提供状态值（invalid(非法),dirty(填写过值),touched(触碰过),error(错误),pristine(原始状态，没有被填写过)）
```html
<form ng-app="" name="myForm">
    Email:
    <input type="email" name="myAddress" ng-model="text">
    <span ng-show="myForm.myAddress.$error.email">不是一个合法的邮箱地址</span>

    <h1>状态</h1>
    <p>Valid: {{myForm.myAddress.$valid}} (如果输入的值是合法的则为 true)。</p>
    <p>Dirty: {{myForm.myAddress.$dirty}} (如果值改变则为 true)。</p>
    <p>Touched: {{myForm.myAddress.$touched}} (如果通过触屏点击则为 true)。</p>
</form>
```

### CSS类
- 能基于数据的状态，为html元素自动添加或移除相应的css类
  1. `.ng-empty`
  2. `.ng-not-empty`
  3. `.ng-touched`
  4. `.ng-untouched`
  5. `.ng-valid`
  6. `.ng-invalid`
  7. `.ng-dirty`
  8. `.ng-pending`
  9. `.ng-pristine`
