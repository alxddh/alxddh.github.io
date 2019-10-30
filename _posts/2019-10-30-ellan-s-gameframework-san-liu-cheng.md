---
title: "Ellan's GameFramework：（三）流程"
date: 2019-10-30 17:05:49 +0800
categories: [Development Log]
tags: [unity, game, csharp]
---

[Ellan's GameFramework](https://gameframework.cn/) 是一个基于 [Unity](https://unity.com/) 引擎的游戏框架。我选取它作为为公司开发的一款 3D 扫雷游戏的框架，是因为它的功能还算齐全（目前有 18 个内置模块），设计规范（面向对象），关注度也很高（目前 GitHub 上有 1.5k 的星）。我想把我对它的使用过程做一份记录，以便学习和备忘。这一篇关注流程模块。

框架将整个游戏的运行生命周期划分为多个流程，在不同的时间段内，游戏处于不同的流程。因此，用[有限状态机](/2019/10/30/ellan-s-gameframework-er-you-xian-zhuang-tai-ji.html)去实现流程是很方便的。

{% include toc %}

## 核心部分

流程管理者 `ProcedureManager` 持有一个有限状态机管理者和一个有限状态机（即流程状态机）：

```c#
internal sealed class ProcedureManager : GameFrameworkModule, IProcedureManager
{
    private IFsmManager m_FsmManager;
    private IFsm<IProcedureManager> m_ProcedureFsm;

    // ...
}
```

有限状态机管理者由用户在调用 `ProcedureManager.Initialize()` 时由外部传入，流程状态机则借由有限状态机管理者创建：

```c#
public void Initialize(IFsmManager fsmManager, params ProcedureBase[] procedures)
{
    if (fsmManager == null)
    {
        throw new GameFrameworkException("FSM manager is invalid.");
    }

    m_FsmManager = fsmManager;
    m_ProcedureFsm = m_FsmManager.CreateFsm(this, procedures);
}
```

`ProcedureBase` 继承自 `FsmState<IProcedureManager>`，即是流程状态的基类。用户想给游戏添加一个流程时，应当写一个继承自 `ProcedureBase` 的类。

## Unity 部分

`ProcedureComponentInspector` 会自动寻找项目中的流程类：

```c#
m_ProcedureTypeNames = Type.GetTypeNames(typeof(ProcedureBase));
```

然后展示在编辑器上：

```c#
if (m_ProcedureTypeNames.Length > 0)
{
    EditorGUILayout.BeginVertical("box");
    {
        foreach (string procedureTypeName in m_ProcedureTypeNames)
        {
            bool selected = m_CurrentAvailableProcedureTypeNames.Contains(procedureTypeName);
            if (selected != EditorGUILayout.ToggleLeft(procedureTypeName, selected))
            {
                if (!selected)
                {
                    m_CurrentAvailableProcedureTypeNames.Add(procedureTypeName);
                    WriteAvailableProcedureTypeNames();
                }
                else if (procedureTypeName != m_EntranceProcedureTypeName.stringValue)
                {
                    m_CurrentAvailableProcedureTypeNames.Remove(procedureTypeName);
                    WriteAvailableProcedureTypeNames();
                }
            }
        }
    }
    EditorGUILayout.EndVertical();
}
```

{% include image name="procedures.png" width="50%" %}

`ProcedureComponent` 会在 `Start` 方法中实例化所有流程，并初始化流程管理者，然后在下一帧开始启动流程：

```c#
private IEnumerator Start()
{
    ProcedureBase[] procedures = new ProcedureBase[m_AvailableProcedureTypeNames.Length];
    for (int i = 0; i < m_AvailableProcedureTypeNames.Length; i++)
    {
        Type procedureType = Utility.Assembly.GetType(m_AvailableProcedureTypeNames[i]);
        if (procedureType == null)
        {
            Log.Error("Can not find procedure type '{0}'.", m_AvailableProcedureTypeNames[i]);
            yield break;
        }

        procedures[i] = (ProcedureBase)Activator.CreateInstance(procedureType);
        if (procedures[i] == null)
        {
            Log.Error("Can not create procedure instance '{0}'.", m_AvailableProcedureTypeNames[i]);
            yield break;
        }

        if (m_EntranceProcedureTypeName == m_AvailableProcedureTypeNames[i])
        {
            m_EntranceProcedure = procedures[i];
        }
    }

    if (m_EntranceProcedure == null)
    {
        Log.Error("Entrance procedure is invalid.");
        yield break;
    }

    m_ProcedureManager.Initialize(GameFrameworkEntry.GetModule<IFsmManager>(), procedures);

    yield return new WaitForEndOfFrame();

    m_ProcedureManager.StartProcedure(m_EntranceProcedure.GetType());
}
```

## 一些基本流程

目前，我给自己的游戏写了几个基本的流程。在这些流程内要做的具体事情我还没想好，现在只是留下了一个脚手架。

- `ProcedureLaunch`：启动流程
- `ProcedureSplash`：闪屏流程
- `ProcedureCheckVersion`：检查版本流程
- `ProcedurePreload`：预加载流程
- `ProcedureChangeScene`：切换场景流程

它们基本是在 `OnEnter` 回调中处理各自负责的事情，然后在 `OnUpdate` 回调中判断负责的事情有没有做完，如果做完则进入下一个流程。

```c#
public class ProcedureLaunch : ProcedureBase
{
    protected override void OnEnter(ProcedureOwner procedureOwner)
    {
        base.OnEnter(procedureOwner);

        // 初始化游戏
    }

    protected override void OnUpdate(ProcedureOwner procedureOwner, float elapseSeconds, float realElapseSeconds)
    {
        base.OnUpdate(procedureOwner, elapseSeconds, realElapseSeconds);

        ChangeState<ProcedureSplash>(procedureOwner);
    }
}
```

```c#
public class ProcedureSplash : ProcedureBase
{
    protected override void OnEnter(ProcedureOwner procedureOwner)
    {
        base.OnEnter(procedureOwner);

        // 播放 Splash 动画
    }

    protected override void OnUpdate(ProcedureOwner procedureOwner, float elapseSeconds, float realElapseSeconds)
    {
        base.OnUpdate(procedureOwner, elapseSeconds, realElapseSeconds);

        // 编辑器模式下直接进入预加载流程，否则进入检测版本流程
        ChangeState(procedureOwner, GameEntry.Base.EditorResourceMode ? typeof(ProcedurePreload) : typeof(ProcedureCheckVersion));
    }
}
```

```c#
public class ProcedureCheckVersion : ProcedureBase
{
    protected override void OnEnter(ProcedureOwner procedureOwner)
    {
        base.OnEnter(procedureOwner);

        // 检测版本信息
    }

    protected override void OnUpdate(ProcedureOwner procedureOwner, float elapseSeconds, float realElapseSeconds)
    {
        base.OnUpdate(procedureOwner, elapseSeconds, realElapseSeconds);

        ChangeState<ProcedurePreload>(procedureOwner);
    }
}
```

```c#
public class ProcedurePreload : ProcedureBase
{
    protected override void OnEnter(ProcedureOwner procedureOwner)
    {
        base.OnEnter(procedureOwner);

        // 预加载资源
    }

    protected override void OnUpdate(ProcedureOwner procedureOwner, float elapseSeconds, float realElapseSeconds)
    {
        base.OnUpdate(procedureOwner, elapseSeconds, realElapseSeconds);

        ChangeState<ProcedureChangeScene>(procedureOwner);
    }
}
```

```c#
public class ProcedureChangeScene : ProcedureBase
{
    private int nextSceneID;

    protected override void OnEnter(ProcedureOwner procedureOwner)
    {
        base.OnEnter(procedureOwner);

        // 停止所有声音

        // 隐藏所有实体

        // 卸载所有场景

        // 还原游戏速度

        // 获取下一个场景ID
        nextSceneID = 0;
    }

    protected override void OnUpdate(ProcedureOwner procedureOwner, float elapseSeconds, float realElapseSeconds)
    {
        base.OnUpdate(procedureOwner, elapseSeconds, realElapseSeconds);

        // 根据场景ID决定下一个流程
        switch (nextSceneID)
        {
            case 0:
                break;
            case 1:
                break;
        }
    }
}
```

## 本系列其他篇章

- [Ellan’s GameFramework：（一）架构](/2019/10/29/ellan-s-gameframework-yi-jia-gou.html)
- [Ellan’s GameFramework：（二）有限状态机](/2019/10/30/ellan-s-gameframework-er-you-xian-zhuang-tai-ji.html) 