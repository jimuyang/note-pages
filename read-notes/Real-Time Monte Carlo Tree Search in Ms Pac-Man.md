# 实时的蒙特卡洛树搜索 in 吃豆人

## 简单的吃豆人介绍
```
The game has two subgoals, 1) surviving and 2) scoring as many points as possible.  
Decisions must be made in a strict time constraint of 40 ms.  

```

```
In order to expand the capabilities of existing MCTS agents, four enhancements are discussed:
1. a variable-depth tree                                        一棵深度可变的树（动态树
2. simulation strategies for the ghost team and Pac-Man         为ghost和pacman模拟策略
3. including long-term goals in scoring                         有长远的规划
4. reusing the search tree for several moves with a decay factor  重用搜索树
```
