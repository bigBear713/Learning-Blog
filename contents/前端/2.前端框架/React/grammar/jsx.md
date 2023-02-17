## JSX
- JSX是一个 JavaScript 的语法扩展
- JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 camelCase（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。如`class` 变成了 `className`，而 `tabindex` 则变为 `tabIndex`
- JSX 仅仅只是 `React.createElement(component, props, ...children)`函数的语法糖

### 嵌入表达式
- 使用`{}`插入表达式
- 大括号内放置任何有效的 JavaScript 表达式
- 建议将内容包裹在`()`括号中，虽然这样做不是强制要求的，但是这可以避免遇到自动插入分号陷阱
```jsx
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
const element = (
  <h1>
    Hello, {name}!
  </h1>
);
```

### JSX也是一个表达式
- 编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后，得到 JavaScript 对象。
- 可以在 `if` 语句和 `for` 循环的代码块中使用 JSX，将 JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX

### JSX中指定属性
- 通过引号`""`,将属性值指定为字符串变量
- 也可使用大括号`{}`在属性值中插入一个js表达式
- 在属性值中插入js表达式式，外围不用加引号`""`
- 对于同一属性，不能同时使用`""`,`{}`这两种符号

### JSX防止注入攻击
- 可以放心的在jsx中插入用户的输入内容。因为React DOM在渲染所有输入内容时，默认会进行**转义**。
- 它可以确保在应用中，永远不会注入那些非自己明确编写的内容。所有内容在渲染前都被转成**字符串**
- 这样可以有效防止xss攻击

### JSX表示对象
- Babel会将JSX转译成一个`React.createElement()`函数调用
- `React.createElement()` 会预先执行一些检查，避免代码粗无，然后创建了一个“React 元素”对象
- React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新。

---

## 元素渲染
- React DOM负责更新DOM，以保证和React元素一致
- React 元素是不可变对象。一旦被创建，你就**无法更改**它的子元素或者属性
- 更新 UI 唯一的方式是创建一个全新的元素
- React 只更新它**需要更新**的部分
- `false`, `null`, `undefined`, and `true` 是合法的子元素。但它们并不会被渲染。有一些 “falsy” 值，如数字 `0`，仍然会被 React 渲染
```jsx
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
```

---

## refs转发
- `Ref` 转发是一项将 `ref` 自动地通过组件传递到其一子组件的技巧，来实现通过 `ref` 获取子组件中的dom的效果
- `Ref` 转发是一个可选特性，其允许某些组件接收 `ref`，并将其向下传递（换句话说，“转发”它）给子组件。
- `ref` 不是 `prop` 属性，就像 `key` 一样，其被 React 进行了特殊处理
- 使用 `React.forwardRef` API 明确地将 `refs` 转发到内部的组件。`React.forwardRef` 接受一个渲染函数，其接收 `props` 和 `ref` 参数并返回一个 React 节点。
- 默认情况下，不能在**函数组件**上使用 ref 属性，因为它们没有实例，即`ref`不能在一个函数组件上。但可以在函数组件内的Html元素上或者class组件上
```jsx
// FancyButton 使用 React.forwardRef 来获取传递给它的 ref
const FancyButton = React.forwardRef((props, ref) => (
  // 然后转发到它渲染的 DOM button
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
)); //使用 FancyButton 的组件可以获取底层 DOM 节点 button 的 ref ，并在必要时访问，就像其直接使用 DOM button 一样

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

---

## Fragments
- React 中的一个常见模式是一个组件返回多个元素。`Fragments` 允许你将子列表分组，而无需向 DOM 添加额外节点
- 短语法`<></>` - 一种新的，且更简短的语法来声明 `Fragments`
- `key` 是唯一可以传递给 `Fragment` 的属性
```jsx
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
// 等价于
render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
}
```

---

## 属性 
### 默认值为 “True”
- 如果没给 `prop` 赋值，它的默认值是 `true`
- **不建议**不传递 value 给 `prop`，因为这可能与 ES6 对象简写混淆，{foo} 是 {foo: foo} 的简写，而不是 {foo: true}
```jsx
<MyTextBox autocomplete />
// 等价于
<MyTextBox autocomplete={true} />
```
### 属性展开
- 如果已经有了一个 `props` 对象，可以使用展开运算符 `...` 来在 JSX 中传递整个 props 对象
- 还可以选择只保留当前组件需要接收的 props，并使用展开运算符将其他 `props` 传递下去
```jsx
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}
// 等价于
function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}

const Button = props => {
  // 使用...获取其它props，以便继续传入子组件
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...other} />;
};
```

---

## Portals
- Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。比如渲染到`body`下
- `ReactDOM.createPortal(child, container)` - 第一个参数（child）是任何可渲染的 React 子元素，第二个参数（container）是一个 DOM 元素

### 通过 Portal 进行事件冒泡
- 尽管 portal 可以被放置在 DOM 树中的任何地方，但在任何其他方面，其行为和普通的 React 子节点行为一致
- 由于 portal 仍存在于 React 树， 且与 DOM 树 中的位置无关，那么无论其子节点是否是 portal，像 context 这样的功能特性都是不变的。这包含事件冒泡
- 一个从 portal 内部触发的事件会一直冒泡至包含 React 树的祖先，即便这些元素并不是 DOM 树 中的祖先