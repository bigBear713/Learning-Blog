## vite
- 一个新型的前端构建工具，能显著提升前端开发体验。
- 主要由两部分组成：
  1. 一个开发服务器，基于原生ES模块提供丰富的内建功能。
  2. 一套构建指令，使用Rollup打包代码，且是预配置的，可输出用于生产环境的高度优化过的静态资源。
- 旨在解决项目在开发环境下构建速度慢的问题，并且使用 ESM 模块方式来将其改进

### 开发模式
- 开发环境下使用esbuild进行文件编译，它比webpack, rollup效率高很多

### 生产模式
- 生产模式下使用rollup打包，此时相当于一个rollup

### rollup
- 是一个更专一的工具，只专注于build javascript, 而不关注平台
- 对webpack来说，编译出来的代码会有很多webpack的工具函数，来帮我们加载模块。但rollup不会有其专有的函数在里面，只遵循ESM规范来build

### 是一个编译的平台
- vite是一个编译平台，本身并不具备编译代码资源的能力。
- vite的编译能力，是来自集成的 esbuild, rollup 等提供的。
- vite 通过集成的 esbuild, rollup，启动 dev-server，并在中间做并联和管理。
- vite 集成这些东西之后，提供一系列的指令，来帮助开发者提升前端开发体验
- vite 应该和集成了webpack的vue-cli, create-react-app, angular-cli等工具去比，而不是和webpack去比

### 优势
- 简化配置，上手简单，社区成本低，天生兼容各类rollup插件。
- 有自己的插件系统
- 依赖构建，将amd，cmd，iife，commonjs等转成es module形式，对依赖进行强缓存
- 提供基于ESM的HRM api，比传统的HRM过程更简单和高效
- 使用esbuild转译ts,tsx,jsx，约是tsc的20~30倍
- 内部构建了css预处理器，支持tsx,jsx,postcss,css module，让用户开箱即用
- 不同于传统的打包方式，启动时不用先抓取整个应用并构建，然后才能提供服务。Vite直接请求源码，返回过程中解析转译源码，而模块划分工作由浏览器进行