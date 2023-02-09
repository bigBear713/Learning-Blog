## 几个布局的定义
### 常规文档流
- box 一个接一个排列
- 在`BFC`里，box竖值方向排列
- 在`IFC`里，box横向方向排列
- 当`position:static/relative`或`float:none`时，为常规文档流
- 当`position:static`时，box的位置是常规文档流里的位置
- 当`position:relative`时，box的位置是相对于原有位置进行偏移，通过`top`,`bottom`,`left`,`right`等调整偏移位置。偏移后，元素在常规文档流中的位置仍存在，其它元素不能占据它

### 浮动
- 浮动下，box为float box
- 位于当前行的开头或结尾
- 会导致常规文档流会环绕在它四周。除非设置`clear`属性
- 脱离常规文档流

### 绝对定位
- box从常规文档流中脱离，不影响常规文档流的布局。
- 当`position:absolute`时，位置相对于离它最近的且position为非`static`的父元素进行偏移，没有这样的父元素，则相对于`body`进行偏移
- 当`position:fixed`时，位置相对于整个浏览器窗口进行偏移


## BFC
- BFC, Block Formatting Context，块级格式化上下文，是一个独立的容器。
- 容器内的元素不会影响外部
- 每一个BFC容器只包含其子元素，**不包含**子元素的子元素
- 每一个BFC容器都是相互独立、隔离的，互不影响
- 一个元素不能同时存在于多个BFC容器中

### 特性
- `BFC`容器就是一个块级元素，因此会在竖直方向上一个接一个排列
- 属于同一个`BFC`容器的两个相邻元素，上下间距由`margin`决定。如果同时设置两个相邻元素的上下`margin`，会发生重叠，间距由最大的那个`margin`值决定
- 计算`BFC`高度时，`float`元素等脱离文档流的元素也会参与计算
- `BFC`容器不会与`float`元素发生重叠

### 根据特性解决问题
1. 解决相邻两个块级元素的`margin`塌陷的问题
   - 两个相邻元素设置都设置`margin`后，最终间距只取决于`margin`最大的那个值。这是因为它们处于同一个`BFC`容器中
   - 让它们在不同的`BFC`容器中就可解决。比如新建一个BFC容器，并将其中一个元素放入其中。因为BFC容器内的元素不会影响外部
2. 解决使用`float`或者`绝对定位`后，父元素高度塌陷的问题
   - 使用`float`或者`绝对定位`后，因为会让元素脱离文档流，这就导致计算时，父元素被当作没有子元素而没有高度
   - 将父元素设置为`BFC`容器(如`overflow:hidden`)，利用“计算`BFC`高度时，`float`元素等脱离文档流的元素也会参与计算”从而计算出父元素的高度
3. 解决使用`float`后内容重叠环绕的问题
   - 使用`float`后变成浮动布局，会导致常规文档流会环绕在float box的四周
   - 通过将另一个非float box元素设置成`BFC`容器，利用“`BFC`容器不会与`float`元素发生重叠”避免内容重叠环绕的问题


### 生成BFC容器
- 根元素(html)，或者包含body的元素
- 设置`float`脱离文档流，即不为`none`的（left或者right）
- 设置`position`脱离文档流，即不为`static`,`relative`
- 设置`display`为这些值：`inline-block`,`flex`,`grid`,`table`,`table-cell`,`table-caption`
- 设置`overflow`，且值不为`visible`(auto, scroll, hidden)

### FFC, GFC
- FFC, Flex Formatting Context, 弹性格式上下文。通过设置`display:flex/inline-flex`触发
- FFC通常用于弹性布局
- GFC, Grid Formatting Context, 网格格式上下文。通过设置`display:grid/inline-grid`触发
- GFC通常用于二维网格布局
- FFC能做的GFC也能做，GFC能做的FFC也能做
- FFC，GFC也是一个BFC，在遵循自己的规范的时候，向下兼容BFC规范

## IFC
- IFC, Inline Formatting Context, 行内格式化上下文

### 特性
- `IFC`容器中的元素会在水平方向，一个接一个排列。
- 同一行的元素会形成一个行框。如果元素太多，会换行。换行后，新的一行仍会形成一个行框
- 行框的高度由该行中，高度最高的元素决定。且该最高的元素的border/padding/margin的`top`，`bottom`不会影响行框的高度。
- 行框中所有的元素的border/padding/margin的`left`，`right`会被计算，影响行框内能容纳的元素个数
- 浮动元素不会在行框中
- 行框内的元素遵循`text-align`和`vertical-align`
- 在`IFC`中是不能存在块级元素的。如果将块级元素插入到`IFC`环境中，那么它会被破坏称为`BFC`.而块级元素前的元素或文本和块级元素后的元素或文本将会各自自动产生一个匿名块盒其包围。


## 参考
- https://juejin.cn/post/7147928538811727880
- https://juejin.cn/post/6950082193632788493
- https://juejin.cn/post/7072174649735381029
