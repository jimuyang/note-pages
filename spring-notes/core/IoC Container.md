
## reference: https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html

# The IoC Container

#### IoC: Inversion of Control 控制反转 

#### DI: Dependency Injection 依赖注入
对象借此定义它们的依赖，通过：构造函数参数，构造工厂构造方法参数，属性的set方法。之后IoC容器会在初始话bean时将这些被依赖的对象注入。
IoC Container的核心内容在 org.springframework.beans和org.springframework.context包内

#### ApplicationContext 应用上下文
ApplicationContext是BeanFactory的子接口，或者说超集，在BeanFactory的基础上增加了：
* 可以方便的和Spring AOP继承
* 消息资源处理（用于国际化）
* 事件触发
* 提供了一些方便在应用层使用的子类如：WebApplicationContext

在spring中专门用于IoC Container.

#### Bean bean
In Spring, the objects that form the backbone of your application and that are managed by the Spring IoC container are called beans.
1. 组成应用的骨干对象
2. 被Spring IoC Container管理
就被称为bean.
a bean is simply one of many objects in your application. 

#### Container overview
这里是指ApplicationContext，负责实例化、配置、组装beans。
而如何实施化、配置、组装就通过 reading configuration metadata. (XML, Java annotations or Java code)
Spring提供了几个标准的ApplicationContext实现：ClassPathXmlApplicationContext FileSystemXmlApplicationContext 

#### Configuration Metadata 配置元数据
通常为：xml java注解 javacode
java注解配置bean：@Bean in @Configuration

一个典型的XML-based configuration metadata:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="..." class="...">   
        <!-- collaborators and configuration for this bean go here -->
    </bean>
    <!-- more bean definitions go here -->
</beans>

```

#### Use the Container
use the ApplicationContext like:
```java
// create and configure beans
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");

// retrieve configured instance
PetStoreService service = context.getBean("petStore", PetStoreService.class);

// use configured instance
List<String> userList = service.getUsernameList();
```
更通用的做法是：
```java
GenericApplicationContext context = new GenericApplicationContext();
new XmlBeanDefinitionReader(context).loadBeanDefinitions("services.xml", "daos.xml");
context.refresh();
```

#### Bean Definition
Within the container itself, these bean definitions are represented as BeanDefinition objects, which contain (among other information) the following metadata:

* A package-qualified class name: typically, the actual implementation class of the bean being defined. => Bean的实现类

* Bean behavioral configuration elements, which state how the bean should behave in the container (scope, lifecycle callbacks, and so forth).

* References to other beans that are needed for the bean to do its work. These references are also called collaborators or dependencies. => 依赖bean的引用

* Other configuration settings to set in the newly created object — for example, the size limit of the pool or the number of connections to use in a bean that manages a connection pool.








