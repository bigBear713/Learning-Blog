## template模板
- 负责渲染view视图

## 插值
### 文本
- 使用`{{ [prod name] }}`显示普通文本
- 当属性值改变时，view上的文本也会同步更新。如果只想更新一次时，可用指令`v-once`
```html
<!-- msg的值改变时，此处会同步更新 -->
<p>{{ msg }}</p>

<!-- 只会同步更新一次，后续msg不管怎么改变，此处都不会改变 -->
<p v-once>{{ msg }}</p>
```

### html
- `{{}}`会将内容都以文本处理。
- 如果想通过属性值，插入html，需要用`v-html`指令
- 用`v-html`指令可能会导致xss攻击，使用时需要小心
```html
<span v-html="rawHtml"></span>
```

### Attribute
- 设置dom上的属性值，使用`v-bind`
```html
<button v-bind:disabled="isButtonDisabled">Button</button>
```

### js表达式
- 对所有的数据绑定，vuejs都提供完全的js表达式支持
- 每个绑定都只能包含单个表达式
```html
{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

## 指令
- 指令 (Directives) 是带有 `v-` 前缀的特殊 attribute
- 指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM

### 参数
- 一些指令能接收一个参数，在指令名称后使用`:`表示
```html
<a v-bind:href="url">...</a>
<a v-on:click="doSomething">...</a>
```

### 动态参数
- 用`[]`方括号括起来的 JavaScript 表达式作为一个指令的参数
```html
<a v-bind:[attributeName]="url"> ... </a>
<a v-on:[eventName]="doSomething"> ... </a>
```
- 对动态参数的值的约束：
  1. 预期会求出一个字符串，异常情况下值为 null
  2. 这个特殊的 null 值可以被显性地用于移除绑定
  3. 任何其它**非字符串**类型的值都将会触发一个警告
- 对动态参数表达式的约束:
  1. 使用没有空格或引号的表达式，或用计算属性替代这种复杂表达式
  2. 在 DOM 中使用模板时 (直接在一个 HTML 文件里撰写模板)，还需要避免使用**大写字符**来命名键名，因为浏览器会把 attribute 名全部**强制**转为小写

### 修饰符
- 是以半角句号 `.` 指明的特殊后缀
- 用于指出一个指令应该以特殊方式绑定
```html
<form v-on:submit.prevent="onSubmit">...</form>
```

### 缩写
- `v-` 前缀作为一种视觉提示，用来识别模板中 Vue 特定的 attribute
- `w-bind`的缩写：`:`
```html
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a :[key]="url"> ... </a>
```
- `v-on`的缩写：`@`
```html
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a @[event]="doSomething"> ... </a>
```

## class和inline-style绑定
- 操作元素的 class 列表和内联样式是数据绑定的一个常见需求
- 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。
  
### class
- 可以给`:class`传一个对象，方便动态切换
- 可以给`:class`传一个数组
- 在数组语法中也可以使用对象语法
```html
<!-- 对象语法 -->
<div class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
<div v-bind:class="classObject"></div>
<!-- 数组语法 -->
<div v-bind:class="[activeClass, errorClass]"></div>
<!-- 在数组语法中使用对象语法 -->
<div v-bind:class="[{ active: isActive }, errorClass]"></div
```

### inlineStyle内联样式
- 可以给`:style`传一个对象，属性名用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名
- 可以给`:style`传一个数组，含有多个样式对象
- 当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS property 时，如 transform
- 为 style 绑定中的 property 提供一个包含多个值的数组，常用于提供多个带前缀的值, 这样写只会渲染数组中最后一个被浏览器支持的值
```html
<!-- 对象语法 -->
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<div v-bind:style="styleObject"></div>
<!-- 数组语法 -->
<div v-bind:style="[baseStyles, overridingStyles]"></div>

<!-- 只会渲染display: flex -->
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

## v-if条件渲染
- `v-if` 指令用于条件性地渲染一块内容
- 只会在指令的表达式返回 `truthy` 值的时候被渲染
- 也可以用 `v-else` 添加一个“else 块”
- 可在 <template> 元素上使用 v-if 条件渲染分组
- `v-else-if`充当 v-if 的“else-if 块”，可以连续使用
- `v-else` 元素必须紧跟在带 `v-if` 或者 `v-else-if` 的元素的后面，否则它将不会被识别。
```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>

<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>

<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

### 用 key 管理可复用的元素
- vuejs默认会尽量复用已有元素，而不是从头开始渲染，创建新的元素
- 当不想复用已有元素时，可给元素的`key`属性添加唯一值

### v-show
- 另一个用于根据条件展示元素的选项，和`v-if`用法类似
- 不同的是带有 `v-show` 的元素**始终**会被渲染并保留在 DOM 中。
- `v-show` 只是简单地切换元素的 CSS property `display`。
- `v-show` 不支持 `<template>` 元素，也不支持 `v-else`
- `v-if` VS `v-show`
  1. `v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建
  2. `v-if` 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
  3. `v-show`不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
  4. `v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销
  5. 如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好
```html
<div v-show="type === 'A'">
  A
</div>
```

### v-if和v-for一起使用
- 不推荐同时使用 `v-if` 和 `v-for`
- 当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级

## v-for列表渲染
- `v-for` 指令时基于一个数组来渲染一个列表
- 需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的别名
- `v-for` 块中，可以访问所有父作用域的 property
- 还支持一个可选的第二个参数，即当前项的索引
- 可以用 `of` 替代 `in` 作为分隔符，因为它更接近 JavaScript 迭代器的语法
- `v-for` 也可以接受整数。在这种情况下，它会把模板重复对应次数
- 可以利用带有 `v-for` 的 `<template>` 来循环渲染一段包含多个元素的内容
```html
<ul id="example-1">
  <li v-for="(item, index) in items" :key="item.message">
    {{ item.message }} - {{ index }}
  </li>
</ul>

<div v-for="item of items"></div>

<span v-for="n in 10">{{ n }} </span>

<template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
```

### v-for里使用对象
- 用 `v-for` 来遍历一个对象的 property
- 提供第二个的参数为 property 名称 (也就是键名)
- 第三个参数为索引。遍历对象时，会按 `Object.keys()` 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下都一致。
```html
<ul id="v-for-object" class="demo">
  <li v-for="(value, name, index) in object">
    {{ index }}.{{ name }}: {{ value }}
  </li>
</ul>
```

### 维护状态
- 使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染
- 这个默认的模式是高效的，但是**只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出**
- 为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` attribute
- 建议尽可能在使用 `v-for` 时提供 `key` attribute，**除非**遍历输出的 DOM 内容非常简单，或者是**刻意**依赖默认行为以获取性能上的提升。
- 提供 `key` attribute是 Vue 识别节点的一个通用机制，key 并不仅与 v-for 特别关联

## 事件处理
- 监听事件: 可用`v-on`指令监听dom事件，并在触发时运行一些js代码
- 事件处理方法：`v-on` 还可以接收一个需要调用的方法名称
- 内联处理器中的方法：也可以在内联 JavaScript 语句中调用方法。有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 `$event` 把它传入方法
```html
<div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>

<div id="example-2">
  <!-- `greet` 是在js中定义的方法名 -->
  <button v-on:click="greet">Greet</button>
</div>

<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```

### 事件修饰符
- 方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。
- 为此，vuejs提供了事件修饰符。修饰符是由点开头的指令后缀来表示的：`.stop`,`.prevent`,`.capture`,`.self`,`.once`,`.passive`
- 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。比如用 `v-on:click.prevent.self` 会阻止所有的点击，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。
```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

### 按键修饰符
- Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符：
- 可直接将 `KeyboardEvent.key` 暴露的任意有效按键名转换为 `kebab-case` 来作为修饰符
- 通过全局 `config.keyCodes` 对象自定义按键修饰符别名
- 按键码别名：`.enter`,`.tab`,`.delete` (捕获“删除”和“退格”键),`.esc`,`.space`,`.up`,`.down`,`.left`,`.right`
- 可以用这些修饰符来实现：**仅在**按下相应按键时，才触发鼠标或键盘事件的监听器：`.ctrl`,`.alt`,`.shift`,`.meta`.
- 在 Mac 系统键盘上，`meta` 对应 `command` 键 (⌘)。在 Windows 系统键盘 `meta` 对应 `Windows` 徽标键 (⊞)。在 Sun 操作系统键盘上，`meta` 对应`实心宝石键` (◆)。在其他特定键盘上，尤其在 MIT 和 Lisp 机器的键盘、以及其后继产品，比如 Knight 键盘、space-cadet 键盘，meta 被标记为“META”。在 Symbolics 键盘上，meta 被标记为“META”或者“Meta”
```html
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">

<input v-on:keyup.page-down="onPageDown">

<!-- Alt + C -->
<input v-on:keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div v-on:click.ctrl="doSomething">Do something</div>
```

### .exact 修饰符
- `.exact` 修饰符允许你控制由**精确**的系统修饰符组合触发的事件
```html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>
```

### 鼠标按钮修饰符
- `.left`,`.right`,`.middle`。这些修饰符会限制处理函数仅响应特定的鼠标按钮
