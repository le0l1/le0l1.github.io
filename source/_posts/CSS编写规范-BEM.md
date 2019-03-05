---
title: CSS编写规范 BEM
date: 2019-03-05 03:45:37
tags: FE
comments: false
---

写 CSS 并不是一件简单的工作，类名的取法、归类，但项目愈加庞大，因为 CSS 引起的各种问题会越来越多。
之前一直对 css 不怎么感冒,也没有了解过相关规范,在项目中也都是用`CSS Module`或者`Scoped Style`这种形式将类名进行混淆,并没有一个良好的规范来约定整个项目的样式编写,因此特地找了下对应的规范 [BEM](http://getbem.com/introduction/)

简单讲一下**BEM**的命名规则,**BEM**分为 3 块 [`Block`](#Block) [`Element`](#Element) [`Modifiler`](#Modifiler)

通用要求如下:

- 类名可以包含拉丁字母，数字和短划线
- 只使用类选择器 **即 class**
- 不要使用 tag name **比如 h1 p**
- 与当前的页面的其他 block 或者 Element 没有依赖关系

#### `Block`

---

**Block**即为块,通常的话我们可以根据组件来进行 block 的划分, 命名方面很简单：

```css
 .block
```

#### `Element`

---

**Element**为元素, element 的类名为其上层 block 的名称再加上\_\_

```css
 .block__elem
```

#### `Modifier`

---

**Modifier**为 block 或者 element 的某种状态, 类名为 block 或者 element 的类名加上\-\-

```css
 .block--theme-light
 .block__elem--theme-light
```

举几个例子理解下

**block && element**

```html
<style>
  .block {
  }
  .block__elem {
  }
</style>
<div class="block">
  <div class="block__elem"></div>
</div>
```

**modifiler**

```html
<style>
  .block {
  }
  .block--theme {
  }
  .block__elem {
  }
  .block--theme .block__elem {
  }
  .block__eleme--disable {
  }
</style>
<div class="block block--theme">
  <div class="block__elem  block__eleme--disable"></div>
</div>
```

整体下来，BEM 还是挺简单的，感觉很适用于 UI 组件库这样的场景,同时也可以和 css module 结合使用.总的来说,BEM 整体提供了一套规范来树立一个比较良好的结构,遵循一定的规则来约束开发者,但是也会带来类名过长等问题。以后的项目的话可以尝试使用
