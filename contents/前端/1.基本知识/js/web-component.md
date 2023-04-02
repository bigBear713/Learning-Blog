## 定义
- webcomponent是一种不依赖于Angular等前端框架，使用原生API实现组件化的解决方案

---

## 组成
- HTML Template and Slots - 可复用的HTML标签，提供了和用户自定义标签相结合的接口
- Shadow DOM - 对标签和样式的一层DOM包装
- Custom Elements - 带有特定行为且用户自命名的HTML元素

---

## template和slots
### template模板
- 支持度最高的特性，可以说是web component规范最直观的体现
- 允许开发者定义一个直到被复制使用时才会进行渲染的HTML标签块

### slots插槽
- 允许开发者通过特定接入点，动态替换模板中的HTML内容。
- 用`name`属性来作为唯一识别标志

---

## Shadow DOM
- 允许开发者将一些节点放到独立的子树上，实现隔离。
- 根本上来说，Shadow DOM提供一种健壮的封装方式来在做到页面节点的隔离。这也是web component的核心优势
- Shadow DOM并不对css的类名做处理，而是直接作为原生特性来支持。将部分DOM节点隔离，使得网站和程序少了更多不可预知的变化，更稳定。
- `attachShadow()`接收一个含`mode`的对象作为参数。`mode`的值可控制shadow dom的`打开`和`关闭`。`打开`时，使用`element.shadowRoot`可拿到DOM子树，反之如果`关闭`，则会拿到`null`。接着创建一个Shadow DOM就会创建一个shadow边界，在封装节点的同时，也封装样式。
- 默认情况下，该节点内部的所有样式都会被限制在这个shadow树里生效。
- Shadow DOM通常可以跟HTML模板结合使用。
```js
//  将Shadow DOM附加到一个节点上
const shadowRoot = element.attachShadow({mode:'open'});
shadowRoot.appendChild(templateContent.cloneNode(true));
```

---

## 通过custom element进一步封装
- template和slot提供复用性和灵活性，Shadow DOM提供封装方法。
- Custom Element更进一步，将这些特性打包在一起成为有自己名字的，可反复使用的节点，让它可以像常规html节点一样用起来。

### 定义Custom Element
- 依赖ES2015+的class特性，用class作为其声明模式，通常是从HTMLElement或它的子类继承而来。
```js
class CustomElement extends HTMLElement{
    // ...
}
// 将CustomElement注册，才可以在DOM中使用
customElements.define('custom-element',CustomElement);
```

### Custom Element的种类
- Autonomous custom elements - 独立自定义元素。只要在页面定义，就可以像常规HTML节点那样使用，包括通过`document.createElement()`创建。
```html
<body>
<my-text></my-text>

<script>
class MyText extends HTMLElement{
    constructor(){
        super();
        this.append('element content')
    }
    connectedCallback(){
        // ...
    }
}
window.customElements.define('my-text',MyText);
</script>
</body>
```
- Customized built-in elements - 内置自定义元素。当HTML定义节点时，传一个`is`属性到标准节点上，如`<button is="special-button">xxx</button>`，又或者使用`document.createElement()`时，传一个`is`属性作为参数，比如`document.createElement("button", { is: "special-button" }`。custom element的名称必须包含一个**短横线**
```html
<body>
<p is="color-p" color="green"></p>

<script>
class ColorP extends HTMLParagraphElement {
    constructor(){
        super();
        this.style.color = this.getAttribute('color');
    }
    connectedCallback(){
        // ...
    }
}
window.customElements.define('color-p',ColorP,{extends:'p'});
</script>
</body>
```

### Custom Element的声明周期
- 也有一系列声明周期，用于管理组件连接和脱离DOM
  1. `coonnectedCallback` - 连接到DOM。并不是一个一次性的初始化事件，每次将节点连接到DOM上时都会被调用。因此，在`constructor`这个API接口调用时做一次性初始化工作会更加合适。此外，还有一个`attributeChangedCallback`事件可以用来监听节点属性的变化，然后通过这个变化来更新内部状态。但要使用它，需先在节点类里面定义一个`observedAttributes`的getter
  2. `disconnectedCallback` - 从DOM上脱离。
  3. `adoptedCallback` - 跨文档移动

```js
constructor(){
    super();
    // ...
    this.observedAttributes();
}

get observedAttributes(){ return ['someAttributes'] }

attributeChangedCallback(attributeName, oldValue, newValue) {
    if (attributeName==="someAttribute") {
        console.log(oldValue, newValue)
        // 根据属性变化做一些事情
    }
}
```

---

## demo
### template
```html
<body>
  <!-- template -->
  <template id="tpl-product-item">
    <img class="img" src="https://misc.360buyimg.com/lib/skin/e/i/error-jd.gif" />
    <div class="name"></div>
    <div class="price"></div>
  </template>

  <product-item
    name="关东煮"
    img="//img10.360buyimg.com/seckillcms/s200x200_jfs/t1/121953/18/20515/175357/61e7dc79Ee0acbf20/4f4f56abd2ea2f75.jpg!cc_200x200.webp"
    price="49.8"
  ></product-item>

  <script>
    class ProductItem extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        const content = document.getElementById("tpl-product-item").content.cloneNode(true);
        // 插入克隆的模板内容
        this.append(content);
        this.querySelector(".img").src = this.getAttribute("img");
        this.querySelector(".name").innerText = this.getAttribute("name");
        this.querySelector(".price").innerText = this.getAttribute("price");
      }
    }

    window.customElements.define("product-item", ProductItem);
  </script>
</body>
```

### slot
```html
<body>
  <template id="tpl-test">
    <style>
      .title {
        color: green;
      }
    </style>
    <div class="title">标题</div>
    <slot name="slot-des">默认内容</slot>
  </template>

  <test-item>
    <div slot="slot-des">不是默认内容</div>
  </test-item>

  <script>
    class TestItem extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        const content = document.getElementById("tpl-test").content.cloneNode(true);
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(content);
      }
    }

    window.customElements.define("test-item", TestItem);
  </script>
</body>
```

---

## 参考
- https://juejin.cn/post/6844903661403897870
- https://juejin.cn/post/7203351367313489957