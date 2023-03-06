## 居中显示的几种样式

## flex
```css
.wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
}
```

## absolute + auto margin
```css
.father {
    position: relative;
}
.son {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}
```

## absolute + transform
```css
.father {
    position: relative;
}
.son {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```