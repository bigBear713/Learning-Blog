## 组件
- 组件，从概念上类似于 JavaScript 函数。
- 接受任意的入参（即 “`props`”），并返回用于描述页面展示内容的 React 元素

### 函数组件与 class 组件
- 函数组件 - 本质上就是 JavaScript 函数。接收唯一带有数据的 “`props`”（代表属性）对象与并返回一个 React 元素
- class组件 - 使用ES6的class来定义组件。必须要有一个返回React元素的`render()`方法

---

## 组件渲染
- 当 React 元素为用户**自定义**组件时，它会将 JSX 所接收的属性（attributes）以及子组件（children）转换为单个对象传递给组件，这个对象被称之为 “`props`”
- React 会将以小写字母开头的组件视为原生 DOM 标签，所以自定义组件名称必须以大写字母开头以便区分
- `children`是一个特殊的prop，用于传递一个组件值到当前组件中渲染。类似于angular中的`<ng-content></ng-content>`和vue中的`<slot></slot>`。但这只适合于只有一个内容的情况
- 如果当前组件需要多个子组件，且这几个子组件在当前组件的不同位置渲染，则不能使用`children`，而是自定义`props`变量
```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
// 
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

### 组合组件
- 组件可以在其输出中引用其他组件
- 可以将组件拆分、提取、组合

---

## Props的只读性
- 组件无论是使用函数声明还是通过 class 声明，都绝**不能修改**自身的 `props`
- 纯函数 - 不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果
- 所有 React 组件都**必须像**纯函数一样保护它们的 props 不被更改。

---

## State
- 组件内的一些数据需要长时间存在，且需要在原来的基础上变化。这便是数据的state
- 在class组件中，在构造函数中，通过`this.state`对象初始化设置相应的属性，构造函数是唯一可以给 this.state 赋值的地方。
- 通过`this.setState()`更新要更新的属性，只有通过`this.setState()`更新属性，页面上的数据才会被更新
- State的更新可能是**异步**的。出于性能考虑，React会将多个`setState()` 调用**合并**成一个调用。所以可以用让`setState()`接收一个函数而不是一个对象
```js
  constructor(props) {
    super(props);
    this.state = {date: new Date()};

    // this.setState({date: new Date()});

    // Correct
    this.setState((state, props) => ({
    counter: state.counter + props.increment
    }));
  }
 ```
- 在函数组件中，通过`useState`等hook，实现属性的状态化
```js
export const DemoComp = (props)=>{
    const [date, setDate] = useState(()=>new Date());
    return (<div>{date}</div>);
}
```

### 生命周期
 - class组件才有生命周期
 - componentDidMount - 挂载，组件第一次渲染到DOM中的时候
 - componentDidMount - 卸载，从DOM中删除组件时

### 数据流是向下流动的
- 组件可以选择把它的 `state` 作为 `props` 向下传递到它的子组件中
- 任何的 `state` 总是所属于特定的组件，而且从该 `state` 派生的任何数据或 UI 只能影响树中“低于”它们的组件

---

## 事件处理
- React 事件的命名采用小驼峰式（camelCase），而不是纯小写
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串
- 在 React 中另一个不同点是你不能通过返回 `false` 的方式阻止默认行为，必须显式地使用 `preventDefault`
- 在class组件中，`this`: 谨慎对待 JSX 回调函数中的 `this`，在 JS 中，`class` 的方法默认不会绑定 `this`。可以使用`()=>{}`箭头函数，或者`.bind()`
```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

---

## 条件渲染
- React 中的条件渲染和 JS 中的一样，使用 JS 运算符 `if` 或者**条件运算符**去创建元素来表现当前的状态，然后让 React 根据它们来更新 UI
- 使用与运算符 `&&` 也能实现条件渲染。当前一个条件为 true 时，才会执行渲染后面的内容。这是因为在 JS 中，`true && expression` 总是会返回 `expression`, 而 `false && expression` 总是会返回 `false`
- 三目运算符 `condition ? true : false`。

### 阻止组件渲染
- `return null`能阻止组件渲染
- 在组件的 `render` 方法中返回 `null` 并不会影响组件的生命周期

---

## 列表
- 使用数组操作(`.map()`等)能生成渲染组件列表，
- 此时需要给每个组件项一个`key`属性
- `key` 值在兄弟节点之间必须唯一

---

## Context
- `Context` 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。
- 何时使用：为了共享那些对于一个组件树而言是“**全局**”的数据，请谨慎使用，因为这会使得组件的**复用性变差**。
- 如果你只是想避免层层传递一些属性，组件组合（`component composition`）有时候是一个比 `context` 更好的解决方案。即将一个组件通过参数的形式传到子组件中
- API
  1. `React.createContext` - 创建一个 `Context` 对象。当 React 渲染一个订阅了这个 `Context` 对象的组件，这个组件会从组件树中**离自身最近**的那个匹配的 `Provider` 中读取到当前的 `context` 值。只有当组件所处的树中没有匹配到 `Provider` 时，其 `defaultValue` 参数才会生效。将 `undefined` 传递给 `Provider` 的 `value` 时，消费组件的 `defaultValue` 不会生效。在class组件中，通过`this.context`获取值，在函数组件中，可通过`Context.Consumer`
  2. `Context.Provider` - 每个 `Context` 对象都会返回一个 `Provider` React 组件，它允许消费组件订阅 `context` 的变化。`Provider` 接收一个 `value` 属性，传递给消费组件。一个 `Provider` 可以和多个消费组件有对应关系。多个 `Provider` 也可以嵌套使用，里层的会**覆盖**外层的数据。当 `Provider` 的 `value` 值发生变化时，它内部的所有消费组件都会**重新渲染**。通过新旧值检测来确定变化，使用了与 `Object.is` 相同的算法。
  3. `Class.contextType` - 挂载在 class 上的 `contextType` 属性可以赋值为由 `React.createContext()` 创建的 `Context` 对象。此属性可以让你使用 `this.context` 来获取最近 `Context` 上的值。你可以在任何生命周期中访问到它，包括 `render` 函数中。
  4. `Context.Consumer` - 一个 React 组件可以订阅 `context` 的变更，此组件可以让你在函数式组件中可以订阅 `context`
  5. `Context.displayName` - `context` 对象接受一个名为 `displayName` 的 property，类型为字符串。`React DevTools` 使用该字符串来确定 `context` 要显示的内容。
```jsx
<MyContext.Consumer>
  {context => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>

const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';
<MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中

``` 

---

## React.lazy
- `React.lazy` 函数能让你像渲染常规组件一样处理动态引入（的组件）
- `React.lazy` 接受一个函数，这个函数需要动态调用 `import()`。
- 它必须返回一个 `Promise`，该 `Promise` 需要 `resolve` 一个 `default export` 的 React 组件
- `fallback`用于在组件加载完成前的显示
- 如果模块加载失败（如网络问题），它会触发一个错误。可以通过异常捕获边界（Error boundaries）技术来处理这些情况，以显示良好的用户体验并管理恢复事宜
    - React.lazy 目前只支持默认导出（default exports）。如果你想被引入的模块使用命名导出（`named exports`），你可以创建一个中间模块，来重新导出为默认模块
```jsx
import React, { Suspense } from 'react';
// 使用前
// import OtherComponent from './OtherComponent'; 
// 使用后，在组件首次渲染时，自动导入包含 OtherComponent 组件的包
const OtherComponent = React.lazy(() => import('./OtherComponent')); 

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}

import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
// MyErrorBoundary.jsx
class MyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

// 和React Router结合使用
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);
```

---

## HOC高阶组件
- 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧
- HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式
- 高阶组件是**参数**为组件，**返回值**为新组件的函数，即将一个组件转成另一个组件
- HOC **不会修改**传入的组件，也不会使用继承来复制其行为
- HOC 通过将组件包装在**容器组件**中来组成新组件。HOC 是纯函数，没有副作用。
- `Refs` 不会被传递