---
title: "UGF 源码阅读笔记：（2）基础类"
categories: [Code Reading]
tags: [unity, game development, csharp]
---

[*UnityGameFramework（UGF）*](https://gameframework.cn/) 是由 [Ellan Jiang](https://github.com/EllanJiang) 开发的一个 Unity 游戏开发框架。我决定采用它作为我最近为公司开发的一款 3D 扫雷游戏的开发框架，为此，我觉得有必要仔细阅读它的源码，并做好笔记。另外，我还建了一个[仓库](https://github.com/alxddh/UGFPlayground)去写一些测试代码。这一篇浏览框架之中定义的一些基础类。

{% include toc %}

## 引用池

