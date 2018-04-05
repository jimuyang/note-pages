# The this keyword

JavaScript中最常用的关键词之一就是`this`
> One of the most powerful JavaScript keywords is `this`. Unfortunately it is hard to use if you don't exactly know how it works.

## 一道js面试题
```js
var obj = {
  foo: function(){
    console.log(this)
  }
}

var bar = obj.foo
obj.foo() // 打印出的 this 是 obj
bar() // 打印出的 this 是 window
```
**请解释最后两行的值为什么不同？**

## Owner
最常遇到的问题就是：在一段JS代码中，`this` 指向什么？
```js
function doSomething() {
    this.style.color = '#000000';
}
```
> In JavaScript `this` always refers to the `owner` of the function we're executing, or rather, to the object that a function is a `method` of.  

在JavaScript中，`this` 永远指向正在执行的函数的 `owner` ，或者指向它的父对象（该函数是父对象的一个method）。

下面内容学习自：[this的值到底是什么 一次说清楚](https://zhuanlan.zhihu.com/p/23804247)

## 函数调用
JS(ES5)中有`3`种函数调用方式
```js
func(p1, p2);
obj.child.method(p1, p2);
func.call(context, p1, p2); // 先不讲 apply
```
> 其中，第三种调用方法才是正常调用方式，前两种只是语法糖
```js
func(p1, p2) 等价于
func.call(undefined, p1, p2)

obj.child.method(p1, p2) 等价于
obj.child.method.call(obj.child, p1, p2)
```
**至此我们的函数调用只有一种形式：**
```js
func.call(context, p1, p2)
```
`this 就是上面的context,就是这样`
> 如果你传的 context 就 null 或者 undefined，那么 window 对象就是默认的 context（严格模式下默认 context 是 undefined）

**[]语法**
```js
function fn (){ console.log(this) }
var arr = [fn, fn2]
arr[0]() // 这里面的 this 又是什么呢？
```
我们可以把 `arr[0]()` 想象为`arr.0()`，虽然后者的语法错了，但是形式与转换代码里的 obj.child.method(p1, p2) 对应上了，于是就可以愉快的转换了：
```js
arr[0]()   // 假想为    
arr.0()    // 然后转换为 
arr.0.call(arr) // 注意这里的0是函数名
那么里面的 this 就是 arr 了 :)
```

## 总结
* `this` 就是你 call 一个函数时，传入的第一个参数。（请务必背下来「this 就是 call 的第一个参数」）
* 如果你的函数调用形式不是 call 形式，请按照「转换代码」将其转换为 call 形式。

## 实战中的this
### EventHandler中的this
```js
btn.addEventListener('click' ,function handler(){
  console.log(this) // 请问这里的 this 是什么
})
```
this 都是由 call 或 apply 指定的，那么只需要找到`handler 被调用时`的代码就行了。    
可是 `addEventListener` 是浏览器内置的方法，找不到它被调用时的上下文。   

MDN文档这样说:    
> 通常来说this的值是触发事件的元素的引用，这种特性在多个相似的元素使用同一个通用事件监听器时非常让人满意。    
当使用 addEventListener() 为一个元素注册事件的时候，句柄里的`this`值是`该元素的引用`。其与传递给句柄的 event 参数的 currentTarget 属性的值一样。

于是可以假象浏览器的调用过程：
```js
// 当事件被触发时
handler.call(event.currentTarget, event) 
// 那么 this 是什么不言而喻
```

### jQuery Event Handler 中的 this
```js
$ul.on('click', 'li' , function(){
  console.log(this)
})
```
jQuery 文档是这样写的：
> 当jQuery的调用处理程序时，`this`关键字指向的是`当前正在执行事件的元素`。  
> 对于直接事件而言，`this` 代表`绑定事件的元素`。   
> 对于代理事件而言，`this` 则代表了`与 selector 相匹配的元素`。(注意，如果事件是从后代元素冒泡上来的话，那么 this 就有可能不等于 event.target.)  
> 若要使用 jQuery 的相关方法，可以根据当前元素创建一个 jQuery 对象，即使用 $(this)。

## 如何强制制定this的值
自己写`apply/call`即可:
```js
function handlerWrapper(event){
  function handler(){
    console.log(this) // 请问这里的 this 是什么
  }

  handler.call({name:'饥人谷'}, event)
}
btn.addEventListener('click', handlerWrapper)
```
`bind`的效果也是类似的:
```js
function handler(){
  console.log(this) // 请问这里的 this 是什么
}
var handlerWrapper = handler.bind({name:'饥人谷'})
btn.addEventListener('click', handlerWrapper)
```
上面三句可以挤成一句：
```js
btn.addEventListener('click', function(){
  console.log(this) // 请问这里的 this 是什么
}.bind({name:'饥人谷'}))
```










