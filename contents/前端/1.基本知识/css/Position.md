## Position
- `static` - 静态定位，position属性的默认值
- `absolute` - 绝对定位
- `relative` - 相对定位
- `fixed` - 固定定位
- `sticky` - 粘性定位

---

## static静态定位
- `position`的默认值。
- 此时`top`，`bottom`，`left`，`right`，`z-index`等没有效果
- 归属于常规文档流

---

## absolute绝对定位
- 相对于某一级的position为非`static`(relative, absolute, fixed)的父元素为参照，通过设置`top`，`bottom`，`left`，`right`，`z-index`等进行元素位置的移动
- 如果往上一直没有position为非`static`的父元素，则追溯到`body`为止
- 脱离文档流
- 不再保留在常规文档中的位置
- 是相对于非`static`的父元素或者`body`的padding的左上角进行定位的

---

## relative相对定位
- 相对于自身在常规文档流中的位置，通过设置`top`，`bottom`，`left`，`right`，`z-index`等进行的位置调整
- 归属于常规文档流
- 常规文档流中的位置仍保留

---

## fixed固定定位
- 相对于整个浏览器窗口的绝对定位，通过设置`top`，`bottom`，`left`，`right`，`z-index`等进行元素位置的移动
- 当页面出现滚动条时，不会随着页面滚动而变化位置
- 脱离文档流

---

## sticky粘性定位
- 根据用户的滚动进行定位，在`relative`定位和`fixed`定位之间进行切换
- 一开始会以`relative`定位，在滚动到设定的位置时，会转成`fixed`定位
- 通过设置`top`，`bottom`，`left`，`right`，`z-index`等设定位置
- 属于常规文档流

---

## Stack Context 堆叠上下文
### Stack Level 堆叠层级
- 堆叠层级顺序如下**递增**
  1. 创建堆叠上下文的元素的背景和边框
  2. 拥有**负** z-index的，并创建堆叠上下文的子元素。负的越高，堆叠层级越低
  3. 常规流布局中，非行内级，无position定位（static除外）的子元素
  4. 无position定位（static除外）的float浮动的子元素
  5. 常规流布局中，行内级，无position定位（static除外）的子元素
  6. stack level为 `0` 的position定位（除static外）的子元素
  7. stack level 为正值的position定位(static除外)的子元素。z-index正值越大，层级越高

### z-index
- `z-index`属性用于表示一个具有position属性的元素及其子代元素在Z轴上的层级。它指定了
  1. 元素在当前堆叠上下文中的堆叠层级
  2. 元素是否创建一个新的本地堆叠上下文
- 取值：
  1. `auto`：堆叠层级为0，且不会创建一个新的堆叠上下文，除非为`fixed`或者`根元素`。
  2. `<integer>`：数值就是该该元素在当前堆叠上下文中的堆叠层级。同时该元素会创建一个新的堆叠上下文，其子元素的堆叠层级将根据新的堆叠上下文进行排序。
- auto 和 0 的区别：虽然它们最终的stack level都是 0 ,但是`auto`不会创建新的堆叠上下文（除非fixed或根元素），而`0`则会创建新的堆叠上下文。
- 在创建新的堆叠上下文之后，其子元素的堆叠顺序就相对于父元素计算，不会于外部其它元素进行比较

---

## 参考
- http://layout.imweb.io/article/z-index.html