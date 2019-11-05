---
title: "UnityGameFramework 源码阅读笔记：（六）任务池"
date: 2019-11-05 10:36:51 +0800
categories: [Notes]
tags: [unity, game, csharp]
---

因最近要为公司开发一款 3D 扫雷游戏，我采用了 [Ellan](https://github.com/EllanJiang) 开发的 [UnityGameFramework](https://gameframework.cn/) 作为我的开发框架。为了更好地使用它，我决定来一次源码阅读，并做些笔记。这一篇关注任务池技术。

任务池特别时候批量处理那些需要长时间完成的任务，可以降低阻塞。

## 任务和任务代理

GF 提供了 `ITask` 接口，当用户想自定义某种任务时，应该实现此接口：

```c#
internal interface ITask : IReference
{
    int SerialId
    {
        get;
    }

    int Priority
    {
        get;
    }

    bool Done
    {
        get;
    }
}
```

`SerialId` 表示一个任务对象的序列号，通常由一个静态整数自增获得；`Priority` 表示任务的优先级，优先级越大，任务越先执行；`Done` 表示任务是否已完成。

`ITask` 本身不负责任务的执行，任务的执行由任务代理完成：

```c#
internal interface ITaskAgent<T> where T : ITask
{
    T Task
    {
        get;
    }

    void Initialize();
    void Update(float elapseSeconds, float realElapseSeconds);
    void Shutdown();
    StartTaskStatus Start(T task);
    void Reset();
}
```

调用 `Start` 用于开始一个任务，它返回一个任务状态枚举，任务池会根据任务状态决定如何继续处理任务。

```c#
public enum StartTaskStatus
{
    // 可以立刻处理完成此任务。
    Done,

    // 可以继续处理此任务。
    CanResume,

    // 不能继续处理此任务，需等待其它任务执行完成。
    HasToWait,

    // 不能继续处理此任务，出现未知错误。
    UnknownError,
}
```

## 任务池

任务池 `TaskPool<T> where T : ITask` 有 3 个容器：

```c#
private readonly Stack<ITaskAgent<T>> m_FreeAgents;
private readonly GameFrameworkLinkedList<ITaskAgent<T>> m_WorkingAgents;
private readonly GameFrameworkLinkedList<T> m_WaitingTasks;
```

在往任务池添加任务之前，你需要调用 `AddAgent(ITaskAgent<T> agent)` 设置好任务代理，它会把代理压入到 `m_FreeAgents` 栈中。

当你调用 `AddTask(T task)` 添加一个任务时，它会按任务的优先级大小插入到 `m_WaitingTasks` 链表之中。

当轮询任务池时，它会先处理正在执行的任务：

```c#
private void ProcessRunningTasks(float elapseSeconds, float realElapseSeconds)
{
    LinkedListNode<ITaskAgent<T>> current = m_WorkingAgents.First;
    while (current != null)
    {
        T task = current.Value.Task;
        if (!task.Done)
        {
            current.Value.Update(elapseSeconds, realElapseSeconds);
            current = current.Next;
            continue;
        }

        LinkedListNode<ITaskAgent<T>> next = current.Next;
        current.Value.Reset();
        m_FreeAgents.Push(current.Value);
        m_WorkingAgents.Remove(current);
        ReferencePool.Release((IReference)task);
        current = next;
    }
}
```

可以看出，它按顺序从 `m_WorkingAgents` 链表中取出 agent，判断 agent 有没有完成任务；如果没有完成，则轮询该 agent；如果已完成，则重置 agent 并把它压入 `m_FreeAgents` 栈，以待后续使用，而且 agent 要从 `m_WorkingAgents` 移出。

轮询完正在执行的任务后，任务池会接着处理等待的任务：

```c#
private void ProcessWaitingTasks(float elapseSeconds, float realElapseSeconds)
{
    LinkedListNode<T> current = m_WaitingTasks.First;
    while (current != null && FreeAgentCount > 0)
    {
        ITaskAgent<T> agent = m_FreeAgents.Pop();
        LinkedListNode<ITaskAgent<T>> agentNode = m_WorkingAgents.AddLast(agent);
        T task = current.Value;
        LinkedListNode<T> next = current.Next;
        StartTaskStatus status = agent.Start(task);
        if (status == StartTaskStatus.Done || status == StartTaskStatus.HasToWait || status == StartTaskStatus.UnknownError)
        {
            agent.Reset();
            m_FreeAgents.Push(agent);
            m_WorkingAgents.Remove(agentNode);
        }

        if (status == StartTaskStatus.Done || status == StartTaskStatus.CanResume || status == StartTaskStatus.UnknownError)
        {
            m_WaitingTasks.Remove(current);
        }

        if (status == StartTaskStatus.Done || status == StartTaskStatus.UnknownError)
        {
            ReferencePool.Release((IReference)task);
        }

        current = next;
    }
}
```

可以看出，它也是按顺序从 `m_WaitingTasks` 取出任务，然后从 `m_FreeAgents` 中弹出一个 agent，把它插入到 `m_WorkingAgents` 尾部，然后开始该任务。最后根据任务的状态继续处理任务和 agent。

## 本系列全部文章

- [UnityGameFramework 源码阅读笔记：（一）架构](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-yi-jia-gou.html)
- [UnityGameFramework 源码阅读笔记：（二）引用池](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-er-yin-yong-chi.html)
- [UnityGameFramework 源码阅读笔记：（三）事件](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-san-shi-jian.html)
- [UnityGameFramework 源码阅读笔记：（四）有限状态机](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-si-you-xian-zhuang-tai-ji.html) 
- [UnityGameFramework 源码阅读笔记：（五）流程](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-wu-liu-cheng.html)
- [UnityGameFramework 源码阅读笔记：（六）任务池](/2019/11/05/unitygameframework-yuan-ma-yue-du-bi-ji-liu-ren-wu-chi.html)
