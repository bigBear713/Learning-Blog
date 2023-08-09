## package.json
- 基于node上的npm的项目的依赖文件
- 主要包含
  1. 描述配置
  2. 文件配置
  3. 脚本配置
  4. 依赖配置
  5. 发布配置
  6. 系统配置
  7. 第三方配置

---

## 描述配置
- 主要是项目的基本信息，包括名称，版本，描述，仓库，作者等。如果发布成npm包，部分信息会展示在npmjs上

### name
- 项目名称。如果发布成npm包，可通过该名字被下载引用
- 都是小写字母，支持 `-` 连接不同单词
- 可使用`@xxx/`定义命名空间。同样`@xxx/`下的其它npm包会归属于同一个组织，通过`npm install`时，会下载在同一个文件夹中

### version
- 项目版本号，遵循semver语义化规范：`A.B.C-beta.1-meta`
  1. `A` - Major(主版本)，一般在涉及重大功能更新，产生了破坏性变更时会更新此版本号
  2. `B` - Minor(次版本)，一般在引入了新功能，但未产生破坏性变更，依然向下兼容时会更新此版本号
  3. `C` - Patch(补丁版本)，一般在修复了一些问题，也未产生破坏性变更时会更新此版本号
  4. `-beta.1-meta` - Pre-release(先行版本)，字符串由**大小写**的字母、数字、句点组成。三个常见的**先行命名**方式：`-alpha.1` - 内测的第一个版本，`-beta.1` - 灰度测试的第一个版本，`-rc.1` - 生产候选的第一个版本

### repository
- 项目的仓库地址，以及描述信息
```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/angular/angular.git",
    "directory": "packages/*"
  }
}
```

### description
- 项目的描述，如果发布成npm包，会展示在 npm 官网，让别人能快速了解该项目。

### keywords
- 一组项目的技术关键词
- 好的关键词可以帮助别人在 npm 官网上更好地检索到此项目，增加曝光率。

### homepage
- 项目主页的链接，通常是项目 github 链接，项目官网或文档首页。

### bugs
- 项目 bug 反馈地址，通常是 github issue 页面的链接。

### license
- 项目的开源许可证
- 项目的版权拥有人可以使用开源许可证来限制源码的使用、复制、修改和再发布等行为
- 常见的开源许可证有 BSD、MIT、Apache 等

### author
- 项目作者

---

## 文件配置
- 包括项目所包含的文件，以及入口等信息。

### files
- 项目在进行 npm 发布时，可以通过 files 指定需要跟随一起发布的内容来控制 npm 包的大小，避免安装时间太长。
- 发布时默认会包括 `package.json`，`license`，`README` 和`main` 字段里指定的文件。忽略 `node_modules`，`lockfile` 等文件。
- 可以指定更多需要一起发布的内容。可以是单独的文件，整个文件夹，或者使用通配符匹配到的文件。
- 一般情况下，files 里会指定构建出来的产物以及类型文件，而 src，test 等目录下的文件不需要跟随发布
```json
"files": [
  "filename.js",
  "directory/",
  "glob/*.{js,json}"
 ]
```

### type
- 在 node 支持 ES 模块后，要求  **ES** 模块采用 `.mjs` 后缀文件名。只要遇到 `.mjs` 文件，就认为它是 ES 模块
- 如果不想修改文件后缀，就可以在 `package.json`文件中，指定 type 字段为 `module`。这样所有 `.js` 后缀的文件，node 都会用 **ES** 模块解释。
- 如果还要使用 `CommonJS` 模块规范，那么需要将 `CommonJS` 脚本的后缀名都改成`.cjs`

### main
- 项目发布时，默认会包括 `package.json`，`license`，`README` 和`main` 字段里指定的文件，因为 `main` 字段里指定的是项目的入口文件，在 `browser` 和 `Node` 环境中都可以使用。
- 如果不设置 main 字段，那么入口文件就是根目录下的 index.js。

### browser
- `main` 字段里指定的入口文件在 `browser` 和 `Node` 环境中都可以使用
- 如果只想在 `web` 端使用，不允许在 `server` 端使用，可以通过 `browser` 字段指定入口。
```json
{ "browser": "./browser/index.js" }
```

### module
- 项目也可以指定 **ES** 模块的入口文件，这就是 `module` 字段的作用
- 当一个项目同时定义了 `main`，`browser` 和 `module`，像 `webpack`，`rollup` 等构建工具会感知这些字段，并会根据环境以及不同的模块规范来进行不同的入口文件查找。
```json
{
    "main": "./index.js", 
    "browser": "./browser/index.js",
    "module": "./index.mjs"
}
```
- 比如 webpack 构建项目时默认的 target 为 'web'，也就是 Web 构建。它的 resolve.mainFeilds 字段默认为 ['browser', 'module', 'main']。
```js
module.exports = {
  // 此时会按照 browser -> module -> main 的顺序来查找入口文件。
  resolve: {
    mainFields: ['browser', 'module', 'main'],
  },
};
```

### exports
- node 在 `14.13` 支持在 package.json 里定义 exports 字段，拥有了**条件导出**的功能。
- exports 字段可以配置**不同环境**对应的模块入口文件，并且当它存在时，它的优先级最高。
```js
{
  "exports": {
    // 使用 require 和 import 字段根据模块规范分别定义入口：
    // 这样的配置在使用 import 'xxx' 和 require('xxx') 时会从不同的入口引入文件
    "require": "./index.js",
    "import": "./index.mjs"
  }
}
```
- exports 也支持使用 browser 和 node 字段定义 browser 和 Node 环境中的入口。
- exports 除了支持配置包的默认导出，还支持配置包的子路径。
- exports 还限制了使用者不可以访问未在 "exports" 中定义的任何其他路径。
```js
"exports": {
  "./style": "./dist/css/index.css"
},

import `packageA/dist/css/index.css`;
// 变成
import `packageA/style`;
```

### workspaces
- 项目的工作区配置，用于在本地的根目录下管理多个子项目
- 可以自动地在 npm install 时将 workspaces 下面的包，软链到根目录的 node_modules 中，不用手动执行 npm link 操作。
- 接收一个数组，数组里可以是文件夹名称或者通配符
```js
{
    "workspaces": [
        "workspace-a" // 表示在 workspace-a 目录下还有一个项目，它也有自己的 package.json。
    ]
}

// 通常子项目都会平铺管理在 packages 目录下，所以根目录下 workspaces 通常配置为：
{
    "workspaces": [
        "packages/*"
    ]
}
```

---

## 脚本配置
### scripts
- 指定项目的一些内置脚本命令，这些命令可以通过 `npm run` 来执行。通常包含项目开发，构建 等 CI 命令
- 除了指定基础命令，还可以配合 `pre` 和 `post` 完成命令的前置和后续操作
- 但是这样的隐式逻辑很可能会造成执行工作流的混乱，所以 `pnpm` 和 `yarn2` 都已经**废弃掉**了这种 pre/post 自动执行的逻辑
- 如果需要手动开启，`pnpm` 项目可以设置 `.npmrc enable-pre-post-scripts=true`。
```json
"scripts": {
  "build": "webpack",
  "prebuild": "xxx", // build 执行之前的钩子
  "postbuild": "xxx" // build 执行之后的钩子
  // 执行顺序 prebuild -> build -> postbuild
}
```

### config
- config 用于设置 scripts 里的脚本在运行时的参数
```json
"config": {
  "port": "3001" // 在执行脚本时，可以通过 npm_package_config_port 这个变量访问到 3001
}
```

---

## 依赖配置
- 项目可能会依赖其他包，需要在 package.json 里配置这些依赖的信息。

### dependencies
- 运行依赖，也就是项目**生产环境**下需要用到的依赖
- 使用 `npm install xxx` 或则 `npm install xxx --save` 时，会被自动插入到该字段中

### devDependencies
- 开发依赖，项目**开发环境**需要用到而运行时不需要的依赖，用于辅助开发，通常包括项目工程化工具比如 webpack，vite，eslint 等。
- 使用 `npm install xxx -D` 或者 `npm install xxx --save-dev` 时，会被自动插入到该字段中。

### peerDependencies
- 同伴依赖，一种特殊的依赖，不会被自动安装，通常用于表示与另一个包的依赖与兼容性关系来警示使用者。

### optionalDependencies
- 可选依赖，顾名思义，表示依赖是可选的，它不会阻塞主功能的使用，安装或者引入失败也无妨
- 这类依赖如果安装失败，那么 npm 的整个安装过程也是成功的。
- 使用 `npm install xxx -O` 或者 `npm install xxx --save-optional` 时，依赖会被自动插入到该字段中。

### peerDependenciesMeta
- 同伴依赖也可以使用 `peerDependenciesMeta` 将其指定为**可选**的。
```json
"peerDependencies": {
  "colors": "^1.4.0"
},
"peerDependenciesMeta": {
  "colors": {
    "optional": true
   }
 }
 ```

 ### bundleDependencies
 - 打包依赖。它的值是一个数组，在**发布**包时，`bundleDependencies` 里面的依赖都会被一起打包。
 - 需要注意的是，这个字段数组中的值必须是在 `dependencies`，`devDependencies` 两个里面声明过的依赖才行。
 - 普通依赖通常从 `npm registry` 安装，但当你想用一个**不在** `npm registry` 里的包，或者一个**被修改过**的第三方包时，打包依赖会比普通依赖更好用。

### overrides
- 可以**重写**项目依赖的依赖，及其依赖树下某个依赖的**版本号**，进行包的替换。
- overrides 支持任意深度的嵌套
- 如果在 `yarn` 里也想复写依赖版本号，需要使用 `resolution` 字段，而在 `pnpm` 里复写版本号需要使用 `pnpm.overrides` 字段。
```json
"overrides": {
  "foo": "1.1.0-patch" // 使用 overrides 修改 foo 的版本号, 这样会更改整个依赖树里的 foo
}

"overrides": {
  "A": {
    "foo": "1.1.0-patch", // 使用 overrides 修改 foo 的版本号, 且只对 A 下的 foo 进行版本号重写：
  }
}
```

### version
- npm 工程们并不永远精准的确认自己依赖哪一个版本，因为这会给你的应用带来过高的体积负荷
- 模糊匹配:
  1. `^1.0.1`、`1`、`1.x` 代表了可以命中**主版本**一致、但**更新**的版本号。
  2. `~1.0.1`、`1.1`、`1.1.x` 代表了可以命中**主版本**、**次版本**一致、但**更新**的版本号。
  3. `*` 和 `x` 可以命中**一切新发布**的版本号。
- dist-tag: 别名标签，并将它们和某个版本号关联起来
  1. `beta` ： 灰度测试版本
  2. `latest` ：最新正式版
  3. `next` ： 下一代版本
  4. `preview` ： 预览版
  5. `csp`：内容安全版本
  6. `legacy`：历史稳定版
- 当撰写自己的组件库时，可通过以下命令标注出该工程的 latest 版本
```bash
npm dist-tag add i-love-chunge@1.0.0 latest
```

---

## 发布配置
- 主要是和项目发布相关的配置。

### private
- 如果是私有项目，不希望发布到公共 npm 仓库上，可以将 private 设为 true。

### publishConfig
- npm 包发布时使用的配置
```json
"publishConfig": {
  "registry": "https://registry.npmjs.org/" // 安装依赖时指定了 registry 为 taobao 镜像源，但发布时希望在公网发布，就可以指定 publishConfig.registry。
}
```

---

## 系统配置
- 和项目关联的系统配置，比如 node 版本或操作系统兼容性之类
- 这些要求只会起到**提示警告**的作用，即使用户的环境不符合要求，也**不影响**安装依赖包。

### engines
- 对 node 或者包管理器版本号进行限制
```json
"engines": {
  "node": ">=14 <16",
  "pnpm": ">7"
}
```

### os
- 指定项目对操作系统的兼容性要求。
```json
"os": ["darwin", "linux"]
```

### cpu
- 指定项目只能在特定的 CPU 体系上运行
```json
"cpu": ["x64", "ia32"]
```

---

## 第三方配置
- 一些第三方库或应用在进行某些内部处理时会依赖这些字段，使用它们时需要安装对应的第三方库。

### types 或者 typings
- 指定 TypeScript 的类型定义的入口文件
```json
"types": "./index.d.ts",
```

### unpkg
- 可以让 npm 上所有的文件都开启 CDN 服务。
```json
"unpkg": "dist/vue.global.js", // 想通过 CDN 的方式使用链接引入 vue 时。访问 unpkg.com/vue 会重定向到 unpkg.com/vue@3.2.37/… 3.2.27 是 Vue 的最新版本。
```

### jsdelivr
- 与 unpkg 类似
```json
"jsdelivr": "dist/vue.global.js", // 访问 cdn.jsdelivr.net/npm/vue 实际上获取到的是 jsdelivr 字段里配置的文件地址
```

### browserslist
- 设置项目的浏览器兼容情况， babel 和 autoprefixer 等工具会使用该配置对代码进行转换
- 当然也可以使用 `.browserslistrc` 单文件配置。
```json
"browserslist": [
  "> 1%",
  "last 2 versions"
]
```

### sideEffects
- 显示设置某些模块具有副作用，用于 webpack 的 tree-shaking 优化。
```js
import 'antd/dist/antd.css'; // 如果 Ant Design 的 package.json 里不设置 sideEffects，那么 webapck 构建打包时会认为这段代码只是引入了但并没有使用，可以 tree-shaking 剔除掉，最终导致产物缺少样式。

{
    "sideEffects": [
    "dist/*",
    "es/**/style/*",
    "lib/**/style/*",
    "*.less"
    ]
}
```

### lint-staged
- 用于对 git 的暂存区的文件进行操作的工具，比如可以在代码提交前执行 lint 校验，类型检查，图片优化等操作。
- lint-staged 通常配合 `husky` 这样的 `git-hooks` 工具一起使用
- `git-hooks` 用来定义一个钩子，这些钩子方法会在 git 工作流程中比如 pre-commit，commit-msg 时触发，可以把 lint-staged 放到这些钩子方法中。
```json
"lint-staged": {
  "src/**/*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "git add -A"
  ]
}
``` 

---

## package-lock.json
- package-lock.json 它会在 npm 更改 node_modules 目录树 或者 package.json 时自动生成的
- 准确的描述了当前项目npm包的依赖树，并且在随后的安装中会根据 package-lock.json 来安装，保证是相同的一个依赖树，不考虑这个过程中是否有某个依赖有小版本的更新。
- 它的产生就是来对整个依赖树进行版本固定的（锁死）

---

## 参考
- https://juejin.cn/post/7122240572491825160
- https://juejin.cn/post/7161392772665540644
- https://juejin.cn/post/7078233610683170824