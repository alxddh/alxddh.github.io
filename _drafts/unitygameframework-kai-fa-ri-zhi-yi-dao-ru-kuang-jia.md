---
title: "UnityGameFramework 开发日志：（一）导入框架"
categories: [Log]
tags: [unity, game, csharp]
---

最近正在采用 [Ellan's UnityGameFramework](https://gameframework.cn/) 作为我为公司开发的一款 3D 扫雷游戏的基础框架，我想把我对它的使用过程记录下。

首先是安装，很简单，直接[下载](https://gameframework.cn/download/)一个 Unity 包，然后双击导入到项目工程内。把 `GameFramework.prefab` 拖入到启动场景中。它的结构如下：

{% include image name="gameframework.png" %}

其中 `GameFramework` 节点挂载着 `BaseComponent`，这个组件负责管理框架的入口，所以它是必须的。其余各个子节点都挂载着框架各个模块组件，它们是可选的。

为了更方便地获取到每个模块的组件，我创建了一个 `GameEntry`：

```c#
namespace Thor.Game.Base
{
    public partial class GameEntry : MonoBehaviour
    {
        void Start()
        {
            InitBuiltinComponents();
            InitCustomComponents();
        }
    }
}
```

其中 `InitBuiltinComponents` 做的事情只是通过 `UnityGameFramework.Runtime.GameEntry` 获取框架内建的每个模块组件：

```c#
private static void InitBuiltinComponents()
{
    Base = UnityGameFramework.Runtime.GameEntry.GetComponent<BaseComponent>();
    Config = UnityGameFramework.Runtime.GameEntry.GetComponent<ConfigComponent>();
    DataNode = UnityGameFramework.Runtime.GameEntry.GetComponent<DataNodeComponent>();
    DataTable = UnityGameFramework.Runtime.GameEntry.GetComponent<DataTableComponent>();
    Debugger = UnityGameFramework.Runtime.GameEntry.GetComponent<DebuggerComponent>();
    Download = UnityGameFramework.Runtime.GameEntry.GetComponent<DownloadComponent>();
    Entity = UnityGameFramework.Runtime.GameEntry.GetComponent<EntityComponent>();
    Event = UnityGameFramework.Runtime.GameEntry.GetComponent<EventComponent>();
    Fsm = UnityGameFramework.Runtime.GameEntry.GetComponent<FsmComponent>();
    Localization = UnityGameFramework.Runtime.GameEntry.GetComponent<LocalizationComponent>();
    Network = UnityGameFramework.Runtime.GameEntry.GetComponent<NetworkComponent>();
    ObjectPool = UnityGameFramework.Runtime.GameEntry.GetComponent<ObjectPoolComponent>();
    Procedure = UnityGameFramework.Runtime.GameEntry.GetComponent<ProcedureComponent>();
    Resource = UnityGameFramework.Runtime.GameEntry.GetComponent<ResourceComponent>();
    Scene = UnityGameFramework.Runtime.GameEntry.GetComponent<SceneComponent>();
    Setting = UnityGameFramework.Runtime.GameEntry.GetComponent<SettingComponent>();
    Sound = UnityGameFramework.Runtime.GameEntry.GetComponent<SoundComponent>();
    UI = UnityGameFramework.Runtime.GameEntry.GetComponent<UIComponent>();
    WebRequest = UnityGameFramework.Runtime.GameEntry.GetComponent<WebRequestComponent>();
}
```

