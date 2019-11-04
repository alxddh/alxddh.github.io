---
title: "UnityGameFramework 源码阅读笔记：（三）事件"
date: 2019-11-04 15:29:18 +0800
last_modified_at: 2019-11-04 19:43:39 +0800
categories: [Notes]
tags: [unity, game, csharp]
---

因最近要为公司开发一款 3D 扫雷游戏，我采用了 [Ellan](https://github.com/EllanJiang) 开发的 [UnityGameFramework](https://gameframework.cn/) 作为我的开发框架。为了更好地使用它，我决定来一次源码阅读，并做些笔记。这篇是第一篇，关注框架的事件模块。

事件模块实现了事件的监听-触发机制，可以令游戏的各个模块大大解耦。

{% include toc %}

## 事件基类

事件基类是一个抽象类，它很简单，只有一个 `Id` 属性：

```c#
public abstract class BaseEventArgs : GameFrameworkEventArgs
{
    public abstract int Id
    {
        get;
    }
}
```

用户如果想定义自己的事件类型，则应该令它继承于 `BaseEventArgs`，而 `Id` 则取该类的哈希值即可，如：

```c#
public sealed class NetworkConnectedEventArgs : BaseEventArgs
{
    public static readonly int EventId = typeof(NetworkConnectedEventArgs).GetHashCode();

    /// <summary>
    /// 获取网络连接成功事件编号。
    /// </summary>
    public override int Id
    {
        get
        {
            return EventId;
        }
    }
}
```

`GameFrameworkEventArgs` 继承自 `System.EventArgs` 和 `IReference`，这说明事件也用到了[引用池](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-er-yin-yong-chi.html)技术，这是合理的，因为事件很有可能会在一个游戏中被频繁触发。

## 事件节点

事件节点 `Event` 是对事件发送者和事件参数的一个封装，它会被事件池管理，同样，它也会利用到引用池技术：

```c#
internal sealed partial class EventPool<T> where T : BaseEventArgs
{
    private sealed class Event : IReference
    {
        private object m_Sender;
        private T m_EventArgs;
    }
}
```

## 事件池

事件池 `EventPool` 管理着一个事件队列和一个事件处理者的字典。

现假设游戏内的系统 B 需要监听来自系统 A 的事件，则用户应该在系统 B 的适当位置调用 `Subscribe` 监听该事件，和调用 `Unsubscribe` 取消监听该事件：

```c#
public void Subscribe(int id, EventHandler<T> handler);
public void Unsubscribe(int id, EventHandler<T> handler);
```

其中 `id` 为事件 ID，`T` 为 `BaseEventArgs`。

系统 A 有两种方式触发事件。一种是马上触发事件，但这个操作是非线程安全的：

```c#
public void FireNow(object sender, T e)
{
    HandleEvent(sender, e);
}
```

另一种是线程安全的操作，它只是把事件节点压入到事件队列中：

```c#
public void Fire(object sender, T e)
{
    Event eventNode = Event.Create(sender, e);
    lock (m_Events)
    {
        m_Events.Enqueue(eventNode);
    }
}
```

事件队列里的事件会在轮询时被处理掉：

```c#
public void Update(float elapseSeconds, float realElapseSeconds)
{
    while (m_Events.Count > 0)
    {
        Event eventNode = null;
        lock (m_Events)
        {
            eventNode = m_Events.Dequeue();
            HandleEvent(eventNode.Sender, eventNode.EventArgs);
        }

        ReferencePool.Release(eventNode);
    }
}
```

由于事件池的轮询一定发生在主线程当中，因此即使你在另一个线程中调用 `Fire` 触发事件，它也会在主线程中被处理，只是有可能会等到下一帧才被处理。

事件的处理即把事件发送者和事件参数传递给 `EventHandler`。

## `EventManager`

事件模块的 Manager 类 `EventManager` 仅仅只是 `EventPool` 的一个简单封装。

## 本系列全部文章

- [UnityGameFramework 源码阅读笔记：（一）架构](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-yi-jia-gou.html)
- [UnityGameFramework 源码阅读笔记：（二）引用池](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-er-yin-yong-chi.html)
- [UnityGameFramework 源码阅读笔记：（三）事件](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-san-shi-jian.html)
- [UnityGameFramework 源码阅读笔记：（四）有限状态机](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-si-you-xian-zhuang-tai-ji.html)
- [UnityGameFramework 源码阅读笔记：（五）流程](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-wu-liu-cheng.html)
