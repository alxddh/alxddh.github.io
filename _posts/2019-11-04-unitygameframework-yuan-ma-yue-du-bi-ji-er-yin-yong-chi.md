---
title: "UnityGameFramework 源码阅读笔记：（二）引用池"
date: 2019-11-04 14:44:59 +0800
categories: [Notes]
tags: [unity, game, csharp]
---

因最近要为公司开发一款 3D 扫雷游戏，我采用了 [Ellan](https://github.com/EllanJiang) 开发的 [UnityGameFramework](https://gameframework.cn/) 作为我的开发框架。为了更好地使用它，我决定来一次源码阅读，并做些笔记。这一篇关注框架的引用池技术。

引用池的目的是为了防止对象的频繁创建和销毁。

所有需要被引用池管理的类都需要实现 `IReference`：

```c#
public interface IReference
{
    void Clear();
}
```

静态类 `ReferencePool` 管理着一个字典 `Dictionary<Type, ReferenceCollection>`，当你想从 `ReferencePool` 获取某一个类型的对象时，它会检测该类型对应的 `ReferenceCollection` 是否存在，如不存在则创建一个新的，然后从 `ReferenceCollection` 中获取一个对象。`ReferenceCollection` 实际上就是一个封装好的引用队列：

```c#
private sealed class ReferenceCollection
{
    private readonly Queue<IReference> m_References;
    private readonly Type m_ReferenceType;
}
```

当你申请一个对象时，它会检查该队列中是否有对象，如果有，则弹出一个对象，否则创建一个对象：

```c#
public T Acquire<T>() where T : class, IReference, new()
{
    if (typeof(T) != m_ReferenceType)
    {
        throw new GameFrameworkException("Type is invalid.");
    }

    m_UsingReferenceCount++;
    m_AcquireReferenceCount++;
    lock (m_References)
    {
        if (m_References.Count > 0)
        {
            return (T)m_References.Dequeue();
        }
    }

    m_AddReferenceCount++;
    return new T();
}
```

当你不需要某个对象时，则将它压入到该队列之中，所以它暂时不会被释放掉：

```c#
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

## 本系列全部文章

- [UnityGameFramework 源码阅读笔记：（一）架构](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-yi-jia-gou.html)
- [UnityGameFramework 源码阅读笔记：（二）引用池](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-er-yin-yong-chi.html)