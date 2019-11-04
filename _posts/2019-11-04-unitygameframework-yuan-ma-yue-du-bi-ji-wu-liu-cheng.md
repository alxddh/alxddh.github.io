---
title: "UnityGameFramework 源码阅读笔记：（五）流程"
date: 2019-11-04 19:42:47 +0800
categories: [Notes]
tags: [unity, game, csharp]
---

因最近要为公司开发一款 3D 扫雷游戏，我采用了 [Ellan](https://github.com/EllanJiang) 开发的 [UnityGameFramework](https://gameframework.cn/) 作为我的开发框架。为了更好地使用它，我决定来一次源码阅读，并做些笔记。这一篇关注框架的流程模块。

流程是对游戏生命整个运行周期的划分，在某一个时间段内，游戏必处于且仅处于一个特定的流程之中，当一个流程结束时则进入另一个流程。因此，用[有限状态机](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-si-you-xian-zhuang-tai-ji.html)实现流程是非常自然的。

一个 `ProcedureManager` 管理着一个有限状态机，其持有者即它自己：

```c#
private IFsm<IProcedureManager> m_ProcedureFsm;
```

当用户想定义一个流程时，必须实现一个 `ProcedureBase : FsmState<IProcedureManager>` 的子类。

例如一个简单的游戏，可能会有如下这些流程：

- `ProcedureLaunch`：启始流程
- `ProcedureSplash`：闪屏流程
- `ProcedurePreload`：预加载流程
- `ProcedureCheckVersion`：检查版本流程
- `ProcedureChangeScene`：切换场景流程

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

        if (SplashFinished) {
            // 编辑器模式下直接进入预加载流程，否则进入检测版本流程
            ChangeState(procedureOwner, GameEntry.Base.EditorResourceMode ? typeof(ProcedurePreload) : typeof(ProcedureCheckVersion));
        }
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

        if (VersionUpdated)
        {
            ChangeState<ProcedurePreload>(procedureOwner);
        }
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

        if (ResourcesLoaded) 
        {
            ChangeState<ProcedureChangeScene>(procedureOwner);
        }
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
    }

    protected override void OnUpdate(ProcedureOwner procedureOwner, float elapseSeconds, float realElapseSeconds)
    {
        base.OnUpdate(procedureOwner, elapseSeconds, realElapseSeconds);

        // 根据场景ID决定下一个流程
        switch (NextSceneID)
        {
            case 0:
                ChangeState(ProcedureLogin);
                break;
            case 1:
                ChangeState(ProcedureFight);
                break;
        }
    }
}
```

## 本系列全部文章

- [UnityGameFramework 源码阅读笔记：（一）架构](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-yi-jia-gou.html)
- [UnityGameFramework 源码阅读笔记：（二）引用池](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-er-yin-yong-chi.html)
- [UnityGameFramework 源码阅读笔记：（三）事件](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-san-shi-jian.html)
- [UnityGameFramework 源码阅读笔记：（四）有限状态机](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-si-you-xian-zhuang-tai-ji.html) 
- [UnityGameFramework 源码阅读笔记：（五）流程](/2019/11/04/unitygameframework-yuan-ma-yue-du-bi-ji-wu-liu-cheng.html)
