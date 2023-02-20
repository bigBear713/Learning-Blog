## hook
- 在不编写 `class` 的情况下（即函数组件中）使用 `state` 以及其他的 React 特性。
- Hook 是一些可以让你在**函数组件**里“钩入” **React state 及生命周期**等特性的函数
- Hook 不能在 class 组件中使用 
- 使用规则
  1. 只能在函数**最外层**调用 Hook。不要在循环、条件判断或者子函数中调用。
  2. 只能在 React 的**函数组件**中调用 Hook。不要在其他 JavaScript 函数中调用。还有一个地方可以调用 Hook —— 就是自定义的 Hook 中
- hook 的结构是**链表**结构，上述操作会打断这种结构，导致取指错误等问题
- Hook 是一种复用状态逻辑的方式，它不复用 state 本身。事实上 Hook 的每次调用都有一个完全独立的 state —— 因此你可以在单个组件中多次调用同一个自定义 Hook。

---

## useState
- 通过在函数组件里调用它来给组件添加一些内部 state
- React 会在**重复渲染**时保留这个 state
- useState 会返回一对值：当前状态和一个让你更新它的函数
- useState 唯一的参数就是初始 state

---

## useEffect
- 给函数组件增加了操作副作用的能力
- 它跟 class 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，只不过被合并成了一个 API
- 告诉 React 在完成对 DOM 的更改后运行你的“副作用”函数
- 默认情况下，React 会在**每次**渲染后调用副作用函数 —— 包括第一次渲染的时候
- 可以通过**返回**一个函数来指定如何“清除”副作用
- 通过使用 Effect Hook，你可以把组件内相关的副作用组织在一起，而不要把它们拆分到不同的生命周期函数里。
- 第二个可选参数是一个数组，传入依赖值。此时，只有当依赖值变化时，Effect Hook才会执行
```jsx
 useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // 返回一个函数，指定如何清除副作用
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

---

## useContext
- 接收一个 `context` 对象（`React.createContext` 的返回值）并返回该 `context` 的当前值
- `context` 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` prop 决定
- 当组件上层最近的 `<MyContext.Provider>` 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext `provider` 的 context `value` 值
- 即使祖先使用 `React.memo` 或 `shouldComponentUpdate`，也会在组件本身使用 `useContext` 时重新渲染。

---

## useCallback
- 返回一个 `memoized` **回调函数**
- 把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 `memoized` 版本，该回调函数仅在某个依赖项改变时才会更新。即类似于Vue中的`computed`
- 当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 `shouldComponentUpdate`）的子组件时，它将非常有用
- `useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。
- 依赖项数组不会作为参数传给回调函数

---

## useMemo
- 返回一个 `memoized` **值**
- 把“创建”函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 `memoized` 值。即类似于Vue中的`computed`
- 有助于避免在每次渲染时都进行高开销的计算
- 传入 `useMemo` 的函数会在渲染期间执行。请不要在这个函数内部执行**不应该**在渲染期间内执行的操作，诸如**副作用**这类的操作属于 `useEffect` 的适用范畴，而不是 `useMemo`。
- 如果没有提供依赖项数组，`useMemo` 在每次渲染时都会计算新的值。

---

## useRef
- `useRef` 返回一个可变的 `ref` 对象，其 `.current` 属性被初始化为传入的参数（initialValue）。
- 返回的 `ref` 对象在组件的整个生命周期内持续存在。
- `useRef` 就像是可以在其 `.current` 属性中保存一个可变值的“盒子”
- 当 `ref` 对象内容发生变化时，`useRef` 并不会通知你
- 变更 `.current` 属性不会引发组件重新渲染
- 如果想要在 React 绑定或解绑 DOM 节点的 `ref` 时运行某些代码，则需要使用回调 `ref` 来实现。即 `ref` 的回调函数是一个 `useCallback`
```jsx
function MeasureExample() {
  const [height, setHeight] = useState(0);

  // ref回调是一个useCallback
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
}
```

---

## 自定义Hook
- 通过自定义 Hook，可以将组件逻辑提取到可重用的函数中
- 自定义 Hook 是一个函数，其名称以 “`use`” 开头，函数内部可以调用其他的 Hook