## Architectural
- 前端常见的软件架构设计模式有：`MVC`,`MVP`,`MVVM`
- 通过分类关注点改进代码的组织方式

## MVC
- MVC, Model-View-Controller。将软件系统分为三个部分：Model模型，View视图，Controller控制器
- Model模型，用于封装和程序的业务逻辑相关的**数据**以及对数据的处理**方法**。一旦数据发生改变，模型将通知有关视图
- View视图，负责数据的展示，以及响应用户操作
- Controller控制器，是Model和View之间的纽带。接收View传过来的用户事件，并传给Model；利用从Model传来的最新模型控制更新View

### 数据关系
- View接收用户的交互请求
- View将请求交给Controller
- Controller操作Model进行数据更新
- 数据更新后，Model通知View更新数据变化。还有一种是View作为Observer监听Model中的任意更新。一旦有更新事件发出，View会自动触发更新以展示最新的Model状态。这种方式提升整体效率，简化Controller功能，但是也导致View与Model之间的紧耦合
- View变化更新数据

### 方式
- 所有方式都是单向通信

### 结构实现
- View：使用Composite组合模式
- View和Controller：使用策略Strategy模式
- Model和View，使用观察者Observer模式同步信息

### 缺点
- View层过重。View强依赖于Model，且能直接访问Model。所以不可避免要包括一些业务逻辑，导致View过重，后期修改比较困难，复用程度底低
- View层与Controller层 也是耦合紧密。View，Controller经常是一一对应，捆绑起来作为一个组件使用，解耦程度不足。

## MVP
- MVP, Model-View-Presenter，是MVC模式的改良。
- 和MVC的区别：
  1. MVP中，View不直接使用Model，它们之间的通信都是通过Presenter进行的。所有的交互都发生在Presenter内部
  2. MVC中，View会直接读取Model中的数据，而不是通过Controller
- Model模型，仍然是业务逻辑相关的数据以及数据的相关处理方法
- View视图，依然负责数据展示和响应用户操作，但并不直接直接读取Model中的数据
- Presenter，是Model和View的中间人。View不能直接读取Model中的数据，而是通过Presenter提供接口，让Presenter更新Model。在通过Observer观察者模式更新View

### 数据关系
- View接收用户请求
- View将请求转给Presenter
- Presenter操作Model进行数据更新
- Model通知Presenter数据发生变化
- Presenter更新View数据

### 方式
- 各部门之间是双向通信

### 结构实现
- View使用Composite组合模式
- View和Presenter使用Mediator中介者模式
- Model和Presenter使用Command命令模式同步信息

### MVC和MVP的关系
- MVP是MVC的变种，在MVC的基础上改良而来
- 项目开发中，UI容易变化，且多样的，一样的数据可能会有多种展示方式。业务逻辑也是容易发生变化的。为了使应用具有较大的弹性，我们期望将UI，逻辑（UI的逻辑和业务逻辑）和数据隔离开来。MVP就是一个很好的选择
- Presenter代替了Controller，比Controller担当更多的任务，更复杂。Presenter处理事件，执行相应的逻辑。这些逻辑映射到Model操作View。处理UI如何工作的代码基本上都在Presenter中
- MVC中的Model和View之间使用Observer模式通信；MVP中的Model和View使用Mediator中介者模式进行通信，Presenter操作Model则使用Command模式进行
- 基本设计相同：Model存储数据，View对Model的展现，Presenter协调两者的通信。MVP中View接收到事件，会将其转给Presenter，如何实现这些事件，则由Presenter完成

### MVP优点
- Model和View完全分离，修改互不影响
- 更高效的使用。因为所有逻辑都在Presenter中
- 一个Presenter可以用于多个View，而不需要改变View的逻辑。因为View的变化总是比Model的变化频繁
- 更便于测试。将逻辑放在Presenter中，就可以脱离用户接口进行逻辑的单元测试

### MVP缺点
- Presenter中除了业务逻辑外，还有View -> Model, Model -> View的手动同步逻辑，造成Presenter比较笨重。一旦视图需要变更，那么Presenter也需要变更，维护起来比较麻烦

## MVVM
- MVVM，Model-View-ViewModel，由Microsoft提出。
- MVVM中，不再需要Presenter手动同步View和Model。View是通过数据驱动的，Model一旦改变，就会刷新相应的View；View如果改变，也会改变相应的Model。这种方式可以在业务处理中，只关心数据的流转，而无需直接和页面打交道。ViewModel只关心数据和业务的处理，不关系View如何处理数据。
- 这种方式下，View和Model可以独立出来，任何一方的改变也不一定需要改变另一方。并且将一些可复用的逻辑放在一个ViewModel中，让多个View复用这个ViewModel
- Model只关注数据本身，不关心任何行为（格式化数据由View负责）。可以理解成一个类似JSON的对象
- View通过模板语法来**声明式**的将数据渲染进DOM，当ViewModel对Model更新时，通过数据绑定更新到View
- ViewModel类似于Presenter，会对View层的声明进行处理。当ViewModel中的数据变化，View层会进行更新；如果是双向绑定，一旦View对绑定的数据进行操作，则ViewModel中数据也会自动进行更新

###  数据关系
- View接收用户请求
- View将请求转给ViewModel
- ViewModel操作Model进行数据更新
- Model更新完数据，通知ViewModel数据发生变化
- ViewModel更新View数据

### 方式
- 双向绑定。View/Model的变动，自动反应在ViewModel，反之亦然。

### 实现数据绑定的方式
- 数据劫持（vue）
- 发布-订阅模式（Knockout, Backbone）
- 脏值检查（angularjs）

### 使用
- 可以兼容当前使用的MVC/MVP框架
- 增加应用的可测试性
- 配合一个绑定机制效果最好

### 优点
- 低耦合。View可以独立于Model进行变化和修改，一个ViewModel可以绑定到不同的View上。当View变化时，Model可以不变；当Model变化时，View可以不变
- 可重用性。可以将一些视图逻辑放在ViewModel中，让很多View重用这段逻辑
- 独立开发。开发人员可以专注于业务逻辑和数据的开发（ViewModel），设计人员可以专注于页面的设计，生成xml代码
- 可测试。界面素来难以测试，而现在可以针对ViewModel进行单元测试

### 缺点
- 类会增多，ViewModel会越加庞大，调用的复杂度增加

## 参考
- https://juejin.cn/post/6844903782015303687