## NgModule模块
- Angular中模块是一个聚合体，将一些component、directive、pipe聚合成一个整体，让属于这个NgModule的component、directive、pipe能够在该模块中的任意组件模板中，随意使用。
- 导出部分component、directive、pipe，以便其它NgModule能够使用，提高component、directive、pipe的复用率
- 为内部提供运行的环境，比如导入其它NgModule，以便使用其它NgModule导出的component、directive、pipe，以及成为内部 DI 的服务提供商
- 对根模块来说，还负责整个应用程序的初始引导

---

## 聚合component、directive、pipe
- 使用`declarations`，对不属于其它NgModule的component、directive、pipe进行声明，使其聚合归属于当前NgModule
- 只能聚合component、directive、pipe，不能聚合service等
- 只能聚合不属于其它NgModule，或者自身不是`standalone`的component、directive、pipe
```ts
@Component({
    // ...
})
export class XXXComponent{}
@Directive({
    // ...
})
export class XXXDirective{}
@Pipe({
    // ...
})
export class XXXPipe{}
@NgModule({
    declarations:[XXXComponent,XXXDirective,XXXDirective],
})
export class XXXModule{}
```

---

## 导出部分component、directive、pipe以及NgModule
- `declarations`为属于当前NgModule的component、directive、pipe，只能在该NgModule中使用
- 使用`exports`，有选择的将一些component、directive、pipe导出，当其它NgModule导入时，其它NgModule中的**组件模板**中，就能使用此处导出的component、directive、pipe
- 使用`exports`，还能将导入的NgModule导出。此时另一个NgModule引入该NgModule时，也将导入所导出的这些NgModule，不用在另外导入
- 如果一个component、directive、pipe没有被导出，就算该NgModule被导入，也无法被使用
```ts
@NgModule({
    imports:[AAAModule],
    declarations:[XXXComponent,XXXDirective,XXXDirective],
    exports:[XXXComponent,AAAModule] // 导出 XXXComponent和 AAAModule
})
export class XXXModule{}

@NgModule({
    imports:[XXXModule], // 此时也导入了AAAModule，因此YYYComponent中也能使用AAAModule导出的组件，YYYModule不用再导入一次AAAModule
    declarations:[YYYComponent]
})
export class YYYModule{}
 // 在YYYComponent中使用XXXComponent
@Component({ template:`<app-xxx></app-xxx>` })
export class YYYComponent{}
```

---

## 为内部提供运行环境
### 导入其它NgModule
- 使用`imports`，导入其它NgModule，导入后可使用导入的NgModule所导出的component、directive、pipe。
- `v15`后，还能导入 `standalone` component

### 成为内部DI的服务提供商
- 使用`providers`，为内部的环境提供可DI的实例，比如service，配置对象常量等
```ts
@NgModule({
    declarations:[XXXComponent],
    providers:[
        XXXService,
        {
            provide:AToken,
            useValue:{key:'',value:''}
        }
    ],
})
export class XXXModule{}
@Component({})
export class XXXComponent{
    constructor(
        private service:XXXService, // 通过依赖注入，获取XXXService的实例
        @Inject(AToken) private config:any, // 通过依赖注入，获取AToken对应的具体配置对象常量
    ){}
}
```

---

## 在根模块，引导整个应用程序
- 以NgModule为根模块的应用项目中，项目的启动需要有个引导组件，连接index.html中的锚点
- 使用`bootstrap`，声明作为引导的component。然后在main.ts中，引导根模块。
```ts
@NgModule({
    declarations:[AppComponent],
    bootstrap:[AppComponent]
})
export class AppModule{}

// main.ts
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```