---
title: '关于package-lock, 你知道多少?'
date: 2020-04-15 20:19:35
tags: 
  - FE
  - npm
---

说到`package-lock.json`, 大家应该知道当执行`npm install`之后会产生, 实际上凡是当npm执行涉及到`node_modules`及`package.json`改动的操作时, `package-lock.json`都会发生改变, 其具体描述了当前依赖树是什么样子及每个依赖锁定的版本

`package-lock.json`是在npm v5.x.x开始有的, 在平时的项目中，笔者看到很多人都是直接将`package-lock.json`删除, 重新安装 忽略了其作用，其实它可以帮助我们更好的做好依赖管理，来看看[文档](https://docs.npmjs.com/configuring-npm/package-lock-json.html)里列举的几项优点
> - Describe a single representation of a dependency tree such that teammates, deployments, and continuous integration are guaranteed to install exactly the same dependencies.
> - Provide a facility for users to “time-travel” to previous states of node_modules without having to commit the directory itself.
> - To facilitate greater visibility of tree changes through readable source control diffs.
> - And optimize the installation process by allowing npm to skip repeated metadata resolutions for previously-installed packages. 

上面大概的意思是 我们能够通过`package-lock.json`保证在**CI和部署这样的场景下保证依赖的一致性**, 同时更好的做好依赖的版本控制, 而且它还可以起到优化依赖安装, 提高安装速度

抛开其他几点不说，我们先说一下**CI和部署这样的场景下保证依赖的一致性**, 笔者认为这点是`package-lock.json`给我们带来的最大好处
### 场景
笔者曾经遇到一个这样的场景, 之前安装过的第三方依赖`vue-property-decorator
`，在本地开发时是正常工作的，但是当部署到线上时, 实际表现不一致, 排查下发现是线上环境与开发环境版本不一致导致的, 最后通过`npm ci`配合`package-lock.json`解决了这个问题. 

 当然你也可以通过写死版本号的方式来做到这样，但是既然有了`package-lock.json`这样更好的解决方案，为何不用呢？

### 注意
需要注意的是 当`package.json`的依赖有更新的版本时, 安装依赖的版本会被更新, 所以为确保在**CI和部署这样的场景下保证依赖的一致性**，请使用[npm ci](https://docs.npmjs.com/cli/ci.html)进行相关依赖， 这个命令会完全按照`package-lock.json`锁定的版本进行安装

### 相关参考
[npm install与package-lock.json相关issue](https://github.com/npm/npm/issues/17979#issuecomment-332701215)
[npmjs docs](https://docs.npmjs.com/)
[everything-you-wanted-to-know-about-package-lock-json](https://medium.com/coinmonks/everything-you-wanted-to-know-about-package-lock-json-b81911aa8ab8)
