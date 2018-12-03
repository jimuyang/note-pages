# Aspect Oriented Programming with Spring 面向切面编程

## Aspect-oriented Programming (AOP)

### AOP 概念
* Aspect 切面 典型的例子：事务管理
* Join point 连接点 在Spring AOP中就是指方法执行
* Advice 包括：around before after
* Pointcut 
* TargetL: this object is always a proxied object.
* AOP proxy: In the Spring Framework, an AOP proxy is a JDK dynamic proxy or a CGLIB proxy.
* 

### Pointcut Expressions
Spring AOP supports the following AspectJ pointcut designators (PCD) for use in pointcut expressions:

* execution: For matching method execution join points. This is the primary pointcut designator to use when working with Spring AOP.

* within: Limits matching to join points within certain types (the execution of a method declared within a matching type when using Spring AOP).

* this: Limits matching to join points (the execution of methods when using Spring AOP) where the bean reference (Spring AOP proxy) is an instance of the given type.

* target: Limits matching to join points (the execution of methods when using Spring AOP) where the target object (application object being proxied) is an instance of the given type.

* args: Limits matching to join points (the execution of methods when using Spring AOP) where the arguments are instances of the given types.

* @target: Limits matching to join points (the execution of methods when using Spring AOP) where the class of the executing object has an annotation of the given type.

* @args: Limits matching to join points (the execution of methods when using Spring AOP) where the runtime type of the actual arguments passed have annotations of the given types.

* @within: Limits matching to join points within types that have the given annotation (the execution of methods declared in types with the given annotation when using Spring AOP).

* @annotation: Limits matching to join points where the subject of the join point (the method being executed in Spring AOP) has the given annotation.


### Declaring an Aspect