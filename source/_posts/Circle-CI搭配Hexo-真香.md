---
title: Circle CI搭配Hexo 真香
date: 2019-02-28 14:31:36
tags: CI
---

最近又开始把个人博客搞起来了，之前搞过一次，但是后面就没弄了...惰性啊!

#### Hexo 的搭建

Hexo 的搭建还是蛮简单的，命令行几行搞定, 参考[Hexo 文档](https://hexo.io/zh-cn/docs/index.html),这里就不细讲了

#### 多台机器上写 Blog 怎么办？

Hexo 发布主要是打包静态文件然后部署, 但是如果我们是在不同的机器上写 Blog 的话，那就很操蛋了, 可能又要重新搭建..., 这样的话为了  多台机器上都能流利地写吹逼，一般都会将 hexo 的文件放到 github 上，在别的机器上直接 clone 下来，
 然后将可以继续愉快地吹逼了～

#### 将发布工作交给 Circle CI

Cricle CI 是我在看 Youtube 广告上看到的(vue js 貌似也在用这个), 最近这段时间也是在弄一些 CI CD 之类的东西，建立一些工作流之类的,  简单看了下可以直接 watch github repo, 最重要的是还是免费的, 好吧  还要啥自行车 撸袖子开干吧

 简单注册后, 将 github 的 repo 添加到 project 中，并 Follow

![Circle CI Follow Project](/static/circle-ci-jobs.png)

然后需要在自己的 repo 建立`/circleci/config.yml`，这个就是 circleci 配置,这里我贴一下我现在的发布配置

```yml
version: 2
jobs:
  build:
    docker:
      - image: node:current

    working_directory: ~/repo

    steps:
      # Special step used to check out source code to the configured
      - checkout
      - run:
          name: install node_modules
          command: npm i
      - run:
          name: deploy
          command: npm run deploy
    branches:
      only:
        - dev
```

上面我是仅指定了`dev分支`进行发布，因为 Hexo 就是我的源代码,最后一步 deploy 就是打包发布到 github page 上去


#### QA

---

> Circle CI npm install 的时候报错没有 package.json

- Circle CI 配置里要注意`steps.checkout`, 没有这一步 Circle CI 是不会自动拉源代码的

> Hexo 在  构建发布时提示没有权限

- 需要进入 Circle CI 权限配置 SSH Key
