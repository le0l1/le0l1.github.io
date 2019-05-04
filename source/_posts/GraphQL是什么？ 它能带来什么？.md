---
title: GraphQL是什么？ 它能带来什么？
date: 2019-05-04 18:04:04
tags: GraphQL
---

GraphQL是Facebook于2012年创造的一种用于描述CS应用中数据模型的能力和要求的语言

GraphQL的主要能力是用于API的查询,它能够提供很强大的聚合能力,同时提供了类型系统, 所有的类型系统都是通过代码来定义，一个 GraphQL 服务是通过定义类型和类型上的字段来创建的，然后给每个类型上的每个字段提供解析函数

通过一个简单地例子来说明下`GraphQL`的好处吧

现在有如下的业务场景，作为前端 我现在需要实现一个带有轮播图和产品列表的首页

![场景](/static/graphql-sample.png)


如果后台接口是restful, 而没有后端来做接口的粘合的话, 前端应该会产生一下两个请求

- > GET /banner/index

- > GET /products

但是如果是GraphQL的话， 就不一样了

```
query  fetchIndexTemplate {
  banner
  products
}
```

仅仅通过将`banner`、`products`写在同一个查询下，不需要额外的工作量，前端只产生了一次请求

还有一方面就是关于用户输入的检验,GraphQL的类型系统也给予了非常大的帮助,通常我们在做后端的接口时,需要对前端的输入做很多的validate

可能在Java中我们会通过注解的形式来处理

```java
public class User {
    @NotNull
    private String name;
}
```

而在GraphQL,我们可以直接通过schema的定义轻松限制

```graphql
type User {
  "name has to be String and it`s required"
  name: String!
}
```

同时通过[Scalar自定义类型](https://graphql.cn/learn/schema/#scalar-types) 我们可以添加更多的类型来限制前端的输入


并且GraphQL可以粘合`DB`、`RestFul`, `RPC`等等各类的方式，只需要实现对应的Resolver就OK了，同时可以在这一层做容错、鉴权、缓存等等

![图示](/static/graphql-image.png)


对应的，GraphQL这层来做BFF的话,一定程度上是有转发带来的损耗的，同时Schema的设计不合理，会带来重复拉取数据等问题, 并且还存在一定的技术成本

总之对待技术，我们不能只看到其中的好处，也有去设想不同场景下技术方案的优劣性