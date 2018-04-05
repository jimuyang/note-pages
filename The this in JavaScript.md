# The this keyword

JavaScript中最常用的关键词之一就是`this`
> One of the most powerful JavaScript keywords is `this`. Unfortunately it is hard to use if you don't exactly know how it works.

## Owner
最常遇到的问题就是：在一段JS代码中，`this` 指向什么？
```JavaScript
function doSomething() {
    this.style.color = '#000000';
}
```
> In JavaScript `this` always refers to the `owner` of the function we're executing, or rather, to the object that a function is a `method` of.  

在JavaScript中，`this` 永远指向正在执行的函数的 `owner` ，或者指向它的父对象（该函数是父对象的一个method）。


