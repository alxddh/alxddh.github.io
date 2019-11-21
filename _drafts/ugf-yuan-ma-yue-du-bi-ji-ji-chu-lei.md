---
title: "UGF 源码阅读笔记：基础类"
categories: [Code Reading]
tags: [unity, game, csharp]
---

[*UnityGameFramework（UGF）*](https://gameframework.cn/) 是由 [Ellan Jiang](https://github.com/EllanJiang) 开发的一个 Unity 游戏开发框架。我决定采用它作为我最近为公司开发的一款 3D 扫雷游戏的开发框架，为此，我觉得有必要仔细阅读它的源码，并做好笔记。另外，我还建了一个[仓库](https://github.com/alxddh/UGFPlayground)去写一些测试代码。本篇考察框架自定义的一些基础类。

{% include toc %}

## 引用池

引用池的作用就是缓存对象的引用，以避免对象的频繁创建和销毁。

所有想要被引用池 `ReferencePool` 管理的类都必须实现接口 `IReference`。`IReference` 只有一个方法 `Clear()`，它用于清除该对象引用到的资源。`ReferencePool` 为每个不同类型的 `IReference` 管理着一个引用队列（称为 `ReferenceCollection`）。当你调用 `ReferencePool.Acquire<T>()` 请求一个类型为 `T` 的引用时，或者调用 `ReferencePool.Release(ref)` 释放一个对象时，实际上最终都会调用到 `ReferenceCollection` 的对应的方法。 `Acquire<T>()` 会先查看引用队列是否为空，如果是，则新建一个对象并返回，如果不是，则从该队列中弹出一个对象并返回。`Release(ref)` 会先调用 `ref.Clear()` 清理对象本身，然后再把它推入到引用队列之中，以等待下一次的使用。

我们来看一下这两个方法的实现：

```c#
public IReference Acquire()
{
    m_UsingReferenceCount++;
    m_AcquireReferenceCount++;
    lock (m_References)
    {
        if (m_References.Count > 0)
        {
            return m_References.Dequeue();
        }
    }

    m_AddReferenceCount++;
    return (IReference)Activator.CreateInstance(m_ReferenceType);
}

public void Release(IReference reference)
{
    reference.Clear();
    lock (m_References)
    {
        if (m_References.Contains(reference))
        {
            throw new GameFrameworkException("The reference has been released.");
        }

        m_References.Enqueue(reference);
    }

    m_ReleaseReferenceCount++;
    m_UsingReferenceCount--;
}
```

`m_References` 即为引用队列。它们在操作 `m_References` 之前都调用了 `lock (m_References)`，可见它们考虑到了线程安全性。
