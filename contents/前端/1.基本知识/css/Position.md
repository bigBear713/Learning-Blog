## Position
- `static` - 静态定位，position属性的默认值
- `absolute` - 绝对定位
- `relative` - 相对定位
- `fixed` - 固定定位
- `sticky` - 粘性定位

## static静态定位
- `position`的默认值。
- 此时`top`，`bottom`，`left`，`right`，`z-index`等没有效果
- 归属于常规文档流

## absolute绝对定位
- 相对于某一级的position为非`static`(relative, absolute, fixed)的父元素为参照，通过设置`top`，`bottom`，`left`，`right`，`z-index`等进行元素位置的移动
- 如果往上一直没有position为非`static`的父元素，则追溯到`body`为止
- 脱离文档流
- 不再保留在常规文档中的位置
- 是相对于非`static`的父元素或者`body`的padding的左上角进行定位的

## relative相对定位
- 相对于自身在常规文档流中的位置，通过设置`top`，`bottom`，`left`，`right`，`z-index`等进行的位置调整
- 归属于常规文档流
- 常规文档流中的位置仍保留

## fixed固定定位
- 相对于整个浏览器窗口的绝对定位，通过设置`top`，`bottom`，`left`，`right`，`z-index`等进行元素位置的移动
- 当页面出现滚动条时，不会随着页面滚动而变化位置
- 脱离文档流

## sticky粘性定位
- 根据用户的滚动进行定位，在`relative`定位和`fixed`定位之间进行切换
- 一开始会以`relative`定位，在滚动到设定的位置时，会转成`fixed`定位
- 通过设置`top`，`bottom`，`left`，`right`，`z-index`等设定位置
- 属于常规文档流