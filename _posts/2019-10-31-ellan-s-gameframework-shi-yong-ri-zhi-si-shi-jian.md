---
title: "Ellan's GameFramework 使用日志：（四）事件"
date: 2019-10-31 20:35:02 +0800
categories: [Log]
tags: [unity, game, csharp]
---

事件机制可以令游戏的各个模块间大大解耦。事件管理者 `EventManager` 就是事件池 `EventPool` 的一个简单封装，因此，事件模块的核心还在 `EventPool`。

{% include toc %}

## 事件参数

事件参数基类很简单，只有一个事件 ID 属性：

```c#
public abstract class BaseEventArgs : GameFrameworkEventArgs
{
    public abstract int Id
    {
        get;
    }
}
```

## 事件节点

事件节点 `Event` 就是事件发送者和事件参数的一个封装：

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

事件池在轮询时处理池中的所有事件节点：

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

它依次从*事件节点队列*中弹出一个事件节点，然后调用 `HandleEvent` 处理掉。与[有限状态机](/2019/10/31/ellan-s-gameframework-shi-yong-ri-zhi-er-you-xian-zhuang-tai-ji.html)相似，事件节点也是很有可能频繁创建的，因此使用了引用池技术。在处理完一个事件节点后需要调用 `ReferencePool.Release(eventNode)` 将它放回引用池。

事件池如何处理事件节点？

```c#
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

`m_EventHandlers` 是一个事件监听者字典，`HandleEvent` 根据事件 ID 从字典中取出所有监听者，再把事件参数传给它们。

你可以通过调用 `EventManager.Subscribe()` 监听事件，通过 `EventManager.Unsubscribe()` 取消监听。

如何触发一个事件？你可以选择线程安全的方式，即使在非主线程中触发一个事件，它也会在主线程中被处理，只不过这需要等到下一帧（见上述 `EventPool.Update` 方法）：

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

你也可以令这个事件马上被处理掉，只不过它是非线程安全的：

```c#
public void FireNow(object sender, T e)
{
    HandleEvent(sender, e);
}
```

## 本系列其他篇章

- [Ellan's GameFramework 使用日志：（一）框架架构](/2019/10/31/ellan-s-gameframework-shi-yong-ri-zhi-yi-kuang-jia-jia-gou.html)
- [Ellan's GameFramework 使用日志：（二）有限状态机](/2019/10/31/ellan-s-gameframework-shi-yong-ri-zhi-er-you-xian-zhuang-tai-ji.html)
- [Ellan's GameFramework 使用日志：（三）流程](/2019/10/31/ellan-s-gameframework-shi-yong-ri-zhi-san-liu-cheng.html)