## form表单输入绑定
### 基础用法
- 可以用 `v-model` 指令在表单 <input>、<textarea> 及 <select> 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理
- `v-model` 会忽略所有表单元素的 value、checked、selected attribute 的**初始值**，而总是将 Vue 实例的数据作为数据来源
- `v-model` 在内部为不同的输入元素使用不同的 property 并抛出不同的事件
  1. `text` 和 `textarea` 元素使用 value property 和 input 事件；
  2. `checkbox` 和 `radio` 使用 checked property 和 change 事件；
  3. `select` 字段将 value 作为 prop 并将 change 作为事件。
```html
<!-- 文本 -->
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
<!-- 多行文本 -->
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
<!-- 单个复选框 -->
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
<!-- 多个复选框 -->
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
<br>
<span>Checked names: {{ checkedNames }}</span>
<!-- 单选按钮 -->
<div id="example-4">
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>Picked: {{ picked }}</span>
</div>
<!-- 选择框单选时 -->
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
<!-- 选择框多选时 -->
<div id="example-6">
  <select v-model="selected" multiple style="width: 50px;">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }}</span>
</div>
```
- 值绑定：对于单选按钮，复选框及选择框的选项，v-model 绑定的值通常是静态字符串 (对于复选框也可以是布尔值)。但是有时我们可能想把值绑定到 Vue 实例的一个动态 property 上，这时可以用 v-bind 实现，并且这个 property 的值可以不是字符串。
```html
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">
<input type="radio" v-model="pick" v-bind:value="prop1">

<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">

<!-- 当选中第一个选项时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
<select v-model="selected">
    <!-- 内联对象字面量 -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
```

### 修饰符
- `.lazy` - 在默认情况下，`v-model` 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 `.lazy` 修饰符，从而转为在 `change` 事件之后，进行同步
- `.number ` - 如果想自动将用户的输入值转为数值类型，可以给 `v-model` 添加 `.number` 修饰符。如果这个值无法被 parseFloat() 解析，则会返回原始的值
- `.trim` - 如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `.trim` 修饰符
```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg">

<input v-model.number="age" type="number">

<input v-model.trim="msg">
```