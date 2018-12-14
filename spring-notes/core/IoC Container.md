
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

    <import resource="services.xml"/>
    <import resource="resources/messageSource.xml"/>
    <!-- 上下的写法是一致的 是相对路径 因此不推荐写/ -->
    <import resource="/resources/themeSource.xml"/>

    <!-- 一个简单的bean -->
    <bean id="..." class="...">   
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <!-- 通过工厂静态方法创建实例bean -->
    <bean id="clientService" class="examples.ClientService" factory-method="createInstance"/>

    <!-- 通过工厂Bean创建实例bean -->
    <!-- the factory bean, which contains a method called createInstance() -->
    <bean id="serviceLocator" class="examples.DefaultServiceLocator">
        <!-- inject any dependencies required by this locator bean -->
    </bean>
    <!-- the bean to be created via the factory bean -->
    <bean id="clientService" factory-bean="serviceLocator" factory-method="createClientServiceInstance"/>

    <!-- inner beans -->
    <bean id="outer" class="...">
        <!-- instead of using a reference to a target bean, simply define the target bean inline -->
        <property name="target">
            <bean class="com.example.Person"> <!-- this is the inner bean -->
                <property name="name" value="Fiona Apple"/>
                <property name="age" value="25"/>
            </bean>
        </property>
    </bean>

    <!-- Collections -->
    <bean id="moreComplexObject" class="example.ComplexObject">
        <!-- results in a setAdminEmails(java.util.Properties) call -->
        <property name="adminEmails">
            <props>
                <prop key="administrator">administrator@example.org</prop>
                <prop key="support">support@example.org</prop>
                <prop key="development">development@example.org</prop>
            </props>
        </property>
        <!-- results in a setSomeList(java.util.List) call -->
        <property name="someList">
            <list>
                <value>a list element followed by a reference</value>
                <ref bean="myDataSource" />
            </list>
        </property>
        <!-- results in a setSomeMap(java.util.Map) call -->
        <property name="someMap">
            <map>
                <entry key="an entry" value="just some string"/>
                <entry key ="a ref" value-ref="myDataSource"/>
            </map>
        </property>
        <!-- results in a setSomeSet(java.util.Set) call -->
        <property name="someSet">
            <set>
                <value>just some string</value>
                <ref bean="myDataSource" />
            </set>
        </property>
    </bean>


    <!-- 构造方法注入bean -->
     <bean id="thingOne" class="x.y.ThingOne">
        <constructor-arg ref="thingTwo"/>
        <constructor-arg ref="thingThree"/>
    </bean>
    <bean id="thingTwo" class="x.y.ThingTwo"/>
    <bean id="thingThree" class="x.y.ThingThree"/>

    <!-- 构造方法注入value -->
    <bean id="exampleBean" class="examples.ExampleBean">
        <constructor-arg name="years" type="int" value="7500000"/>
        <constructor-arg type="java.lang.String" value="42"/>
    </bean>

    <!-- 使用depends-on来决定初始化顺序 事实上它还可以决定detroy顺序 -->
    <bean id="beanOne" class="ExampleBean" depends-on="manager,accountDao">
        <property name="manager" ref="manager" />
    </bean>
    <bean id="manager" class="ManagerBean" />
    <bean id="accountDao" class="x.y.jdbc.JdbcAccountDao" />

    <!-- lazy-init来懒加载 事实上通过<beans default-lazy-init="true">来关闭pre-instantiate-->
    <bean id="lazy" class="com.something.ExpensiveToCreateBean" lazy-init="true"/>
    <bean name="not.lazy" class="com.something.AnotherBean"/>
    <!-- more bean definitions go here -->

    <!-- 给一个bean提供别名 -->
    <alias name="fromName" alias="toName"/>
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

#### Bean Definition 初始化Bean的配方
Within the container itself, these bean definitions are represented as BeanDefinition objects, which contain (among other information) the following metadata:

* A package-qualified class name: typically, the actual implementation class of the bean being defined. => Bean的实现类

* Bean behavioral configuration elements, which state how the bean should behave in the container (scope, lifecycle callbacks, and so forth).

* References to other beans that are needed for the bean to do its work. These references are also called collaborators or dependencies. => 依赖bean的引用

* Other configuration settings to set in the newly created object — for example, the size limit of the pool or the number of connections to use in a bean that manages a connection pool.

Bean Definition Table: 一个BeanDefinition的属性有：
Class Name Scope ConstrucotrArguments Properties AutowiringMode LazyMode InitializationMode DestructionMode


#### Dependencies 依赖

Dependency injection (DI) is a process whereby objects define their dependencies (that is, the other objects with which they work) only through constructor arguments, arguments to a factory method, or properties that are set on the object instance after it is constructed or returned from a factory method. 
通过构造方法参数，工厂方法参数，或者属性注入
DI exists in two major variants: Constructor-based dependency injection and Setter-based dependency injection.

> The <list/>, <set/>, <map/>, and <props/> elements set the properties and arguments of the Java Collection types List, Set, Map, and Properties, respectively.
> The value of a map key or value, or a set value, can also be any of the following elements:
> bean | ref | idref | list | set | map | props | value | null

##### Spring的依赖解析过程
* 读取Configuration metadata(可能为：XML,Java code, annotation)来创建和初始化ApplicationContext; 注意BeanDefinition只是配方 没有创建bean
* 当bean真正开始创建的时候，给它们提供依赖的bean
* spring会自动将提供的string类型的属性值转化为built-in类型 如int long String boolean等等

Spring容器会在创建时检查每个bean的定义，但是属性只在真正创建初始化bean的时候才会注入。 Singleton-scoped的Bean和pre-instantiated预实例化的Bean会在容器创建完成后立刻开始创建，其他情况下，bean只在被需要（required）时被创建。

> This potentially delayed visibility of some configuration issues is why ApplicationContext implementations by default pre-instantiate singleton beans. 
为了尽早发现bean配置的问题，ApplicationContext的默认实现都会预初始化singleton-scoped的bean（带来的是前期的时间和内存开销）

`Spring保证在向beanA注入beanB前(例如调用setter前)，beanB已经被完全实例化了，换句话说，lifecycleMethods都已经invoked.`

> Spring sets properties and resolves dependencies as late as possible, when the bean is actually created. 










