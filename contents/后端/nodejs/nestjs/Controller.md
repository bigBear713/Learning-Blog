## Controller控制器
- 负责处理客户端传入的请求，和响应客户端的请求
- 目的是接收客户端特定的请求。路由机制控制哪个控制器接收哪些请求。
- 通常，每个控制器有多个路由，不同的路由可以执行不同的操作
- 使用**类**和**装饰器**`@Controller()`创建控制器。

## 路由
- 可在装饰器`@Controller()`中传入参数，设置路由的基本前缀：@Controller('admin')
- 通过设置路由前缀，可将路由进行分组，最大化减小重复代码
```ts
@Controller('admin')
export class AdminController{
    @Get('list')
    findAll(){}
}
```
- `@Get()`表明这个路由是get请求，以及路由路径为`/admin/list`

## 路由参数
- 在路由路径中添加路由参数标记（token）以捕获请求 URL 中该位置的动态值
```ts
@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```

## Request
```ts
@Get()
findAll(@Req() request:Request){
    // ...
}
```
- 获取客户端的请求细节，可通过`@Req()`装饰器。

## 路由通配符
- 路由支持模式匹配
- `*`被用作通配符，`?`,`+`,`()`是它们的正则表达式对应项的子集，`.`，`-`按字符串路径逐字解析

## 状态码
- 请求响应默认的状态码默认为200，post请求默认是201
- 通过在处理函数外添加`@HttpCode()`来更改响应状态码
```ts
@Post()
@HttpCode(204)
create(){}
```

## Headers
- 要自定义响应头，可以使用`@Header()`
```ts
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

## 重定向
- 要将响应重定向到特定的 URL，可以使用 `@Redirect()`
- `@Redirect()` 装饰器有两个可选参数，`url` 和 `statusCode`。 如果省略，则 statusCode 默认为 `302`
```ts
@Get()
@Redirect('https://nestjs.com', 301)
```

## 子域路由
- `@Controller` 装饰器可以接受一个 `host` 选项，以要求传入请求的 HTTP 主机匹配某个特定值。
