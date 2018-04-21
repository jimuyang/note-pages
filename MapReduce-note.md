# MapReduce: Simplified Data Processing on Large Clusters
# MapReduce 摘抄和笔记和理解

## Abstract （MapReduce 是什么）
```
MapReduce is a programming model and an associated implementation for processing and generating large data sets. Users specify a map function that processes a key/value pair to generate a set of intermediate key/value pairs, and a reduce function that merges all intermediate values associated with the same intermediate key.

用于处理和生成大数据集的程序模型和相关实现
```

## Introduction 介绍
在过去的五年中，作者和谷歌的许多其他人已经实现了数以百计的专用计算，这些计算处理大量原始数据，例如爬取的文档、Web请求日志等，以计算各种派生数据，如倒排索引、web文档的各种结构的图形表示、每台机器爬取的页面数量、某天出现最频繁的搜索关键词。
大多数这样的计算有同样的特点是：在计算概念上是简单的，但是拥有庞大的输入数据。计算必须分布在成百上千的机器上，以便在合理的时间内完成。如何计算、分配数据、处理故障等问题，这些大量复杂代码使原本简单的计算变得晦涩难懂。
作为对这种复杂性的应对，我们设计了一个新的抽象，它允许我们表达试图执行的简单计算，但是隐藏了复杂的并行化、容错、数据分发和负载均衡部分的逻辑。这个抽象源自于Lisp及其他一些函数式语言的`map and reduce`的概念。

我们意识到大多数上文提到的计算包括了两个操作：
* 通过对每一`行`输入数据执行一个`map`操作，来计算一个中间的key/value键值对
* 然后对拥有相同`key`的所有键值对执行`reduce`操作将中间结果恰当的合并

这项工作的主要贡献是一个简单而强大的接口，它能够实现大规模计算的自动并行化和分布，并结合该接口的实现在商品PC的大型集群上实现高性能。

## Programming Model 编程模型
该计算采用一组输入键/值对，并产生一组输出键/值对。MapReduce库的用户将计算作为两个函数来表示：Map和Reduce。

`map`由用户实现，接受一组输入数据，并产生一组中间键值对。
`MapReduce`库将所有与同一中间密钥I相关联的中间值分组在一起，并将它们传递给Reduce函数。
`reduce`也由用户实现，接受中间密钥I和该关键字的一组值。它将这些值合并在一起形成一个可能更小的值集。通常`reduce`调用生成0个或一个输出值。中间值通过迭代器提供给用户的`reduce`函数。这允许我们处理太大而不能放入内存的值列表。

### Example 例子
考虑在一个巨大的文档集中进行词频统计的问题，用户的实现伪代码可能如下：
```
map(String key, String value): // key: document name
// value: document contents for each word w in value:
EmitIntermediate(w, "1");
reduce(String key, Iterator values): // key: a word
// values: a list of counts
int result = 0;
    for each v in values:
      result += ParseInt(v);
    Emit(AsString(result));
```









