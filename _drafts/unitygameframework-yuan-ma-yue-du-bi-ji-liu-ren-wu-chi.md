---
title: "UnityGameFramework 源码阅读笔记：（六）任务池"
categories: [Notes]
tags: [unity, game, csharp]
---

因最近要为公司开发一款 3D 扫雷游戏，我采用了 [Ellan](https://github.com/EllanJiang) 开发的 [UnityGameFramework](https://gameframework.cn/) 作为我的开发框架。为了更好地使用它，我决定来一次源码阅读，并做些笔记。这一篇关注任务池技术。

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
