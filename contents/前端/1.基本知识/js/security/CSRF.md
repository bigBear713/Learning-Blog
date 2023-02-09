## csrf
- csrf - Cross Site Request Forgery, 跨站点请求伪造，也被称为one-click attack或者session riding
- 是一种挟制用户在已登录的Web应用程序上，执行非本意的操作的攻击方法

## 攻击流程
- 用户登录网站A，并获取cookie
- 用户被诱导访问有问题的网站B
- 网站B返回有问题的代码
- 浏览器执行有问题的代码，偷偷向网站A发送恶意请求
- 网站A不知这是恶意请求，按照用户的权限进行操作，导致用户遭受损失

### 攻击的前提
- 用户登录网站A，并在本地生成cookie
- 在不登出网站A的前提下，访问有问题的网站B

## 常见的攻击类型
### GET类型的CSRF
- GET类型的CSRF很简单，只需要一个HTTP请求。一般会这样利用
```html
<img src="http://bank.example/withdraw?amount=10000&for=hacker">
```
- 用户在访问含有该图片的网页后，浏览器就会自动向`http://bank.example/withdraw?amount=10000&for=hacker`发送一次HTTP请求。bank.example就会收到包含用户登录信息的一次跨域请求

### POST类型的CSRF
- 这种类型的CSRF通常是一个自动提交的表单
```html
<form action="http://bank.example/withdraw" method=POST>
    <input type="hidden" name="account" value="xiaoming" />
    <input type="hidden" name="amount" value="10000" />
    <input type="hidden" name="for" value="hacker" />
</form>
<script> document.forms[0].submit(); </script> 
```
- 访问该页面后，表单会被自动提交，相当于模拟用户完成一次POST操作
- 任何个人网站、博客，被黑客上传页面的网站都有可能是发起攻击的来源。
- 后端接口不能将安全都寄托在仅允许POST上

### 链接类型的CSRF
- 这种类型并不常见
- 比起其它两种访问页面就立即中招的情况，链接类型的CSRF需要用户点击才行
- 这种类型通常是在论坛中发布的图片中嵌入恶意链接，或者以广告的形式诱导用户中招
- 攻击者通常会以较夸张的词语诱骗用户点击
```html
<a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">重磅消息！！</a>
```

## CSRF的特点
- 攻击一般是在第三方网站发起，而不是被攻击的网站。被攻击网站无法阻止
- 攻击**利用用户在被攻击网站的登录凭证，冒充用户提交操作**，而不是直接窃取数据
- 整个过程中并不能获取用户的登录凭证，只能**冒用**
- 跨站请求可以用各种方式，图片URL，超链接，CORS，Form提交等。
- 部分请求可以嵌入在第三方论坛、文章中，难以被发现追踪
- CSRF通常是跨域的，因为外域通常更容易被黑客掌控。如果本域下有容易被利用的功能，比如可以发图片、链接的论坛和评论区，攻击者可以直接在本域下运行。而且这种攻击更加危险

## CSRF和XSS的区别
- 通常来说，CSRF就是通过XSS实现的，CSRF也被称为XSRF
- 本质上讲，XSS是代码注入问题，CSRF是HTTP问题
- XSS是因为内容没有过滤导致浏览器将攻击者的输入当正常代码执行
- CSRF是因为HTTP请求时会自动带上cookie。而一般网站的session都存在cookie里面。Token验证可以避免

## 防御
- 验证码：强制用户必须与页面进行交互，才能完成最终请求。这种方式能很好的遏制CSRF，但用户体验较差
- Referer check：请求来源限制。这种方法成本低，但并不能保证100%有效。因为服务器并不是什么时候都能取到Referer。而且低版本的浏览器存在伪造Referer的风险
- Token：token验证的CSRF防御机制是公认的最合适方案。但如果网站同时存在XSS漏洞，这个方法也是空谈


## 参考
- https://juejin.cn/post/6844903781704925191
