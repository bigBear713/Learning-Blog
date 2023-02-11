## XSS
- xss, Cross Site Script, 跨站脚本。原本是css，为了和样式css区分，改成了xss.
- 黑客通过一系列方法，将攻击脚本注入到html文件或者dom中，从而在用户访问页面时，对用户产生攻击（窃取密码等）
- xss主要分为`存储型xss`，`反射型xss`

### 存储型xss
- 存储型xss，是将攻击脚本存储到数据库中，这样每个访问需要用到该数据的页面都会被攻击。
- 黑客常通过可自由编写，或者输入富文本的地方，将恶意代码存储到数据库中，比如评论区、个性签名、留言等
- 造成的危害会更大，因为影响范围更大，而且是持久型的

### 反射型xss
- 反射型xss，是黑客通过特定手法，通过在url后带上一个参数或`script`，诱导用户去访问一个包含恶意代码的URL。当用户真的访问含有恶意脚本的网站时，恶意脚本会直接在用户主机上的浏览器运行。
- 常用来窃取浏览器的cookie,或进行钓鱼欺骗。常出现在网站搜索栏、用户登录口等

## 危害
- 修改dom结构，伪造页面，欺骗用户，获取账户密码等
- 在页面内生成浮窗广告，影响用户体验
- 监听用户行为，窃取用户信息
- 窃取cookie信息

## 防范
- 服务器对脚本进行过滤和转码
  1. 服务器对用户的输入应该永远不信任
  2. 普遍做法是：转义输入输出内容，对引号、尖括号、斜杠进行转义，把js变成不可识别、执行的字符串
- 充分利用CSP
  1. CSP，Content Security Policy, 是服务器的安全策略
  2. 本质上是建立白名单，明确告诉客户端，哪些外部资源是可加载和执行的
  3. 限制加载其它域下的资源文件、禁止向第三方提交数据
- 使用https
- 针对cookie使用`httpOnly`, 提升cookie的安全性。这样js就无法读取到cookie的信息
- 设置cookie中的`sameSize`。它有3种模式：`strict`,`lax`,`none`。
  1. strict: 严格模式，cookie不能被第三方网站获取
  2. lax：宽松模式，可以被第三方网站获取
  3. none：完全敞开式
  
### 预防存储型和反射型xss攻击
- 这两种攻击都是在服务器取到恶意代码后，插入到响应的HTML里面。
- 预防这两种漏洞主要有两种方式:
  1. 改成纯前端渲染，把代码和数据分隔开
  2. 对HTML做充分转义
#### 纯前端渲染
- 过程: 类似于SAP
  1. 浏览器先加载一个静态的HTML。HTML中不包含任何跟业务相关的数据 
  2. 浏览器执行HTML中的js
  3. js通过AJAX加载业务数据，调用DOM api更新到页面上
- 在纯前端渲染中，我们会明确告诉浏览器，接下来要设置的内容是文本(`.innerText`)，还是属性(`.setAttribute`)，还是样式(`.style`)。这样浏览器就不会轻易被欺骗，执行预期外的代码
- 纯前端渲染还需要注意`DOM`型的xss攻击，如`onload`事件和`href`中的`javascript:xxx`等
### 预防DOM型xss攻击
- dom型xss攻击，其实就是前端js本身不够严谨，把不可信的数据当作代码执行
- 使用`.innerHTML`，`.outerHTML`，`document.write()`时要尽量小心，避免将不可信任的数据作为HTML插入到页面中。尽量使用`.textContent`,`.setAttribute()`等
- 如果使用angular/react/vue等技术栈，并且不使用官方提供的功能时，就在前端代码阶段对数据进行处理，以避免`innerHTML`,`outerHTML`等的隐患
- DOM的内联事件监听器，如`location`，`onclick`，`onerror`，`onload`，`onmouseover`等，`a`标签的`href`属性，js的`eval()`，`setTimeout()`，`setInterval()`等，都能将字符串作为代码运行。如果不可信的数据拼接到字符串中，传递给这些API，很容易产生安全隐患
```html
<!-- 内联事件监听器中包含恶意代码 -->
<img onclick="UNTRUSTED" onerror="UNTRUSTED" src="data:image/png,">

<!-- 链接内包含恶意代码 -->
<a href="UNTRUSTED">1</a>
<script>
// setTimeout()/setInterval() 中调用恶意代码
setTimeout("UNTRUSTED")
setInterval("UNTRUSTED")

// location 调用恶意代码
location.href = 'UNTRUSTED'

// eval() 中调用恶意代码
eval("UNTRUSTED")
</script>
```

## 参考
- https://juejin.cn/post/7175919622179749947
- https://juejin.cn/post/6844903781704925191