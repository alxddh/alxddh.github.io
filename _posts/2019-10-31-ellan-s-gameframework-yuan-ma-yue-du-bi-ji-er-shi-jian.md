---
title: "Ellan's GameFramework 源码阅读笔记：（二）事件"
date: 2019-10-31 11:10:45 +0800
categories: [Notes]
tags: [unity, game, csharp]
---

[Ellan's GameFramework](https://gameframework.cn/) 的事件模块实现了一种事件的监听-触发机制。框架内的很多模块也都利用了这个机制，因此，事件模块算是一个比较基本的模块。

{% include toc %}

## 核心部分

### 事件池

`EventManager` 就是 `EventPool` 的一个简单封装，因此我们直接看 `EventPool`。

```c#
internal sealed class EventManager : GameFrameworkModule, IEventManager
{
    private readonly EventPool<GameEventArgs> m_EventPool;

    // ...
}
```

```c#
/// <summary>
/// 事件池轮询。
/// </summary>
/// <param name="elapseSeconds">逻辑流逝时间，以秒为单位。</param>
/// <param name="realElapseSeconds">真实流逝时间，以秒为单位。</param>
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

可见事件池在每次轮询时会把事件队列 `m_Events` 内的所有事件，并且在处理一个事件完成后即将它放回到*引用池*。使用引用池技术处理事件是合理的，这样可以避免频繁创建事件对象。

先来看一下事件池是如何处理事件的：

```c#
/// <summary>
/// 处理事件结点。
/// </summary>
/// <param name="sender">事件源。</param>
/// <param name="e">事件参数。</param>
private void HandleEvent(object sender, T e)
{
    int eventId = e.Id;
    bool noHandlerException = false;
    GameFrameworkLinkedList<EventHandler<T>> handlers = null;
    if (m_EventHandlers.TryGetValue(eventId, out handlers) && handlers.Count > 0)
    {
        LinkedListNode<EventHandler<T>> current = handlers.First;
        while (current != null)
        {
            m_CachedNodes[e] = current.Next;
            current.Value(sender, e);
            current = m_CachedNodes[e];
        }

        m_CachedNodes.Remove(e);
    }
    else if (m_DefaultHandler != null)
    {
        m_DefaultHandler(sender, e);
    }
    else if ((m_EventPoolMode & EventPoolMode.AllowNoHandler) == 0)
    {
        noHandlerException = true;
    }

    ReferencePool.Release((IReference)e);

    if (noHandlerException)
    {
        throw new GameFrameworkException(Utility.Text.Format("Event '{0}' not allow no handler.", eventId.ToString()));
    }
}
```

`HandleEvent` 方法根据事件的 ID 从 `m_EventHandlers` 取出所有监听该事件 ID 的 `EventHandler`，然后把事件传递给它们。

`EventPool` 有 `Subscribe` 和 `Unsubscribe` 两个 API 提供给用户用于订阅和取消订阅事件：

```c#
public void Subscribe(int id, EventHandler<T> handler);
public void Unsubscribe(int id, EventHandler<T> handler);
```

事件池如何触发一个事件呢？你可以选择线程安全的方法：

```c#
/// <summary>
/// 抛出事件，这个操作是线程安全的，即使不在主线程中抛出，也可保证在主线程中回调事件处理函数，但事件会在抛出后的下一帧分发。
/// </summary>
/// <param name="sender">事件源。</param>
/// <param name="e">事件参数。</param>
public void Fire(object sender, T e)
{
    Event eventNode = Event.Create(sender, e);
    lock (m_Events)
    {
        m_Events.Enqueue(eventNode);
    }
}
```

也可以选择线程不安全的方法：

```c#
/// <summary>
/// 抛出事件立即模式，这个操作不是线程安全的，事件会立刻分发。
/// </summary>
/// <param name="sender">事件源。</param>
/// <param name="e">事件参数。</param>
public void FireNow(object sender, T e)
{
    HandleEvent(sender, e);
}
```

### 事件

`Event` 类也很简单，只包含一个发送者和一个事件参数：

```c#
private sealed class Event : IReference
{
    private object m_Sender;
    private T m_EventArgs;

    // ...
}
```

其中 `m_EventArgs` 的类型为 `BaseEventArgs`：

```c#
public abstract class BaseEventArgs : GameFrameworkEventArgs
{
    /// <summary>
    /// 获取类型编号。
    /// </summary>
    public abstract int Id
    {
        get;
    }
}
```

## 如何使用

如果你想定义一个游戏内的事件，你应该写一个 `GameFramework.Event.GameEventArgs` 的子类，事件 ID 通常取该类的 hash 值即可。`GameEventArgs` 本身就继承自 `BaseEventArgs`：

```c#
public abstract class GameEventArgs : BaseEventArgs
{
}
```

例如定义一个网络连接成功事件：

```c#
public sealed class NetworkConnectedEventArgs : GameEventArgs
{
    public static readonly int EventId = typeof(NetworkConnectedEventArgs).GetHashCode();

    public override int Id
    {
        get
        {
            return EventId;
        }
    }
}
```

## 系列目录

- [Ellan’s GameFramework 源码阅读笔记](/2019/10/30/ellan-s-gameframework-yuan-ma-yue-du-bi-ji.html)
- [Ellan's GameFramework 源码阅读笔记：（一）框架架构](/2019/10/30/ellan-s-gameframework-yuan-ma-yue-du-bi-ji-yi-kuang-jia-jia-gou.html)
- [Ellan's GameFramework 源码阅读笔记：（二）事件](/2019/10/31/ellan-s-gameframework-yuan-ma-yue-du-bi-ji-er-shi-jian.html)