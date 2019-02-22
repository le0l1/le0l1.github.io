---
title: Java 注解依赖注入简易实现
date: 2019-02-22 14:49:20
tags: Java
---

最近在学习 Java 的 Spring Boot 框架, 知道其精髓就是 DI 和 AOP, 其中对于 DI(依赖注入), 我是比较感兴趣的，于是在网上查阅了一些资料，大概了解到了其大概原理是通过反射和注解来实现的，我先前还一直以为可以通过 Java 的注解和 TS 的装饰器是一样的，看过文档后才发现两个是有些不同的。
简单比较下:

- Java 的注解是有元注解来描述自定义的注解，注解里面可以添加属性 然后还有属性默认值,需要配合反射才能发挥出对应的作用
- TS 的装饰器更像是函数，对目标进行修饰, 直接进行修改

依赖注入的概念来讲还是很简单的，就是在面向对象中，我们的对象不可能实现全部的功能，有时候需要别的一些对象加入进来作为一个依赖

```java
public class Main {
    // need logger to do something...
    private Logger logger = new Logger();
}
```

上述的 demo 中, 我们的 Main 对象 需要一个 logger 来打印一些日志, 那我们就需要给他一个 logger 的实例，这就是最简单的依赖注入了

但是的话，如果每次需要一个新的依赖进来，我们都需要写一遍的 new XXX, 秉承 DRY 的原则，我们可以通过注解+反射的方式来做些处理，让注入的依赖自动返回实例, 而不需要手动地去 new

首先我们先声明一个注解来表示属性是需要进行依赖注入的

```java
public class animation {
    // 表示注解作用于属性上
    @Target(value = { ElementType.FIELD })
   // 表示注解在运行时依然可用
    @Retention(value = RetentionPolicy.RUNTIME)
    public @interface Inject {
    }
}
```

通过@Injenct 注解我们可以去注明那一些是需要进行依赖注入的。

```java
public class Main {
   @inject
   private Logger logger;
}
```

然后通过反射来获取注解

```java
    public class Parse {

        public static <T> T getBean(Class<T> c) {
            T result = null;
            try {
                result = c.newInstance();
                Field[] fields = c.getDeclaredFields();
                for (Field field : fields) {
                    Inject inject = field.getAnnotation(Inject.class);
                    if (inject != null) {
                        // 递归解决依赖问题
                        Object object = parse.getBean(field.getType());
                        // 针对private
                        if (!field.isAccessible())
                            field.setAccessible(true);
                        field.set(result, object);
                    }
                }
            } catch (Exception e) {
                System.out.println(e);
            }
            return result;
        }
   }
```

简单描述下上面的过程: 1.获取运行时的注解，但凡是有@Inject 的注解则进行第 2 步 2.通过 field.getType()获取注入的 class, 通过递归进行对一层层的依赖进行处理, 注意最后会返回注入的 class 的实例, 跳至第 3 步 3.如果 field 不可访问，则进行 setAccessible(true), 跳至第 4 步 4.对对应的 field(属性)进行设置, 完成整个依赖注入的过程
