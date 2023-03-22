## Directive指令
- 主要是对宿主元素的属性进行操作，包含了常见的class, style等属性值外，也包含对textContent, innerHTML等宿主元素内容属性的操作。
- 常规指令分为**结构型指令**和**属性型指令**。
- Component组件也是指令，是一种特殊的指令，能更方便定义视图内容，并将其作为宿主元素的内容。
- 通过定义特殊的selector选择器，以便在组件的模板中的html标签元素中使用。
- 如果只操作宿主元素的常规属性值，一般定义为**属性选择器**；如果为Component形式，则一般定义为**标签选择器**。定义的选择器可以同时存在多种选择器，用`,`隔开。
- 能够为当前指令内部提供运行环境，比如成为内部 DI 的服务提供商
- 能声明为`standalone` component被单独引入使用
- 指令能接收输入值，也能向外传送值
- 指令有生命周期

---

## 定义selector选择器
- 使用`selector`定义指令的选择器。
- 在宿主元素中，通过该选择器使用该指令
- 选择器一般为**属性**选择器，如果是组件，则一般为**标签**选择器。此外还能为**class**等选择器，但是不常用
```ts
@Directive({selector:'[test-prop]'})
export class XXXDirective{}

// 在组件的模板中通过定义的selector调用
@Component({template:`<div test-prop ></div>`})
export class XXXComponent{}
```

---

## 声明为standalone component
- `v15`开始，指令可被声明为`standalone`而独立存在，而不用再依附于NgModule，不用再在某个NgModule的`declarations`中声明。
- 作为standalone component, 既是一个Directive的同时，也是一个NgModule。因此，在被引用时，需先将该指令在`imports`中导入
```ts
@Directive({selector:'',standalone:true})
export class XXXDirective{}

// 在NgModule中导入
@NgModule({imports:[XXXDirective]})
export class XXXModule{}

// 在Component中导入
@Component({template:'',imports:[XXXDirective]})
export class XXXComponent{}
```

---

## 为内部提供运行环境
- 在常规指令中，可通过`providers`，为内部的环境提供可DI的实例，比如service，配置对象常量等
```ts
@Directive({
    selector:'',
    providers:[
        XXXService,
        { provide: AToken, useValue:{} }
    ]
})
export class XXXDirective{
    constructor(
        private service:XXXService, // 通过依赖注入，获取XXXService的实例
        @Inject(AToken) private config:any, // 通过依赖注入，获取AToken对应的具体配置对象常量
    ){}
}
```

---

## 获取宿主元素
- 可通过 DI 获取指令所依托的宿主元素
```ts
@Directive({selector:'[myDirective]'})
export class XXXDirective{
    constructor(
        private elementRef:ElementRef<HTMLElement> // 通过 依赖注入 获取的该变量，指向的是宿主元素，此处demo中取到的是 HTMLDivElement
    ){}
}

@Component({template:'<div myDirective></div>'})
export class XXXComponent{}
```

---

## 结构型指令和属性型指令
### 结构型指令
- 对组件模板中的内容的结构进行操作的指令，就是结构型指令。比如`ngIf`是在满足一定条件时，显示模板中的部分内容，否则隐藏部分内容，`ngFor`是根据数据，在模板中循环生成多个内容
- 过程中，宿主元素可能被移除或者插入
```ts
@Component({
    template:`
        <!-- 当condition为true是，显示该div标签元素，否则隐藏该div标签元素 -->
        <div *ngIf="condition">ngIf content</div>
        <ul>
            <!-- 根据itemList数组，循环生成多个li标签元素 -->
            <li *ngFor="let item of itemList">item</li>
        </ul>
    `
})
export class XXXComponent{
    condition = true;
    itemList = [1,2,3];
}
```

### 属性型指令
- 对组件模板中的html标签元素的属性进行赋值的指令，就是属性型指令。比如`ngStyle`是对html标签的`style`属性的值进行动态调整
- 过程中，宿主元素一直存在
```ts
@Component({ template:` <div [ngClass]="classContent" [ngStyle]="styleContent"></div>`})
export class XXXComponent{
    classContent=['class1','class2'];
    styleContent={ color: 'red' };
}
```

---

## 输入和输出
### @Input() 输入
- 使用`@Input()`，定义输入属性。
- 通过输入属性，可从父组件传入数据 
- 父组件传入时，默认使用输入属性的属性名
- 可通过在`@Input()`中传入值，更改父组件传入时的属性名
- 输入属性的属性名可与selector选择器相同
```ts
@Directive({selector:'[test-prop]'})
export class XXXDirective{
    @Input('test-prop') prop1:string; // 通过在@Input()中传入参数，调整输入属性名，并让输入属性名和选择器相同
    @Input() prop2:string;
}
@Component(template:'<div [test-prop]="value1" [prop2]="value2"></div>')
export class XXXComponent{
    value1 = 'value1';
    value2 = 'value2';
}
```

### @Output() 输出
- 使用`@Output()`，定义输出属性
- 通过输出属性，可向父组件传出数据
- 向父组件传出时，默认使用输出属性的属性名
- 可通过在`@Output()`中传入值，更改向父组件传出时的属性名
- 父组件中，`$event`关键字为传出的数据
```ts
@Directive({selector:'[test-prop]'})
export class XXXDirective{
    @Output() afterConstructor = new EventEmitter<string>();
    @Output('afterInit') event = new EventEmitter<string>();
    constructor(){
        this.afterConstructor.emit('constructor over');
    }

    ngOnInit(){
        this.event.emit('init over');
    }
}
@Component(template:`<div test-prop (afterConstructor)="afterConstructorFn('test',$event)" (afterInit)="afterInitFn($event)"></div>`)
export class XXXComponent{
    afterConstructorFn(name:string, value:string){
        console.log(name); // test 
        console.log(value); // constructor over
    }

    afterInitFn(value:string){
        console.log(value); // init over
    }
}
```

---

## 生命周期
### ngOnChanges
- 当输入属性的值发生变化时，会触发，因此可触发多次
- 第一次触发在`ngOnInit`之前

### ngOnInit
- 指令初始化完成时触发
- 只会触发一次

### ngDoCheck
- Angular触发更新机制时会触发
- 每次更新视图都会触发一次

### ngOnDestroy
- 指令被销毁时触发
- 只会触发一次