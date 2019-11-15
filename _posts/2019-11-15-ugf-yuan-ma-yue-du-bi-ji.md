---
title: "UGF 源码阅读笔记"
categories: [Notes]
tags: [unity, game, csharp, code reading]
date: 2019-11-15 17:32:09 +0800
---

[*UnityGameFramework（UGF）*](https://gameframework.cn/) 是由 [Ellan Jiang](https://github.com/EllanJiang) 开发的一个 Unity 游戏开发框架。我决定采用它作为我最近为公司开发的一款 3D 扫雷游戏的开发框架，为此，我觉得有必要仔细阅读它的源码，并做好笔记。另外，我还建了一个[仓库](https://github.com/alxddh/UGFPlayground)去写一些测试代码。

{% include toc %}

## 框架的安装

官网已经有[教程](https://gameframework.cn/tutorial/tutorial-001/)教用户如何安装框架了。它推荐的安装方式是安装 Unity 插件包，其中核心部分的代码都打包成 [DLL](https://en.wikipedia.org/wiki/Dynamic-link_library) 形式了。虽然这种方法方便了用户使用，但我的目的是阅读和调试代码，我得拿到所有的代码。

下面是我的安装方法：

- 下载某一个版本（如我当前使用的是 v2019.11.09）的 [UnityGameFramework](https://github.com/EllanJiang/UnityGameFramework)，并将它拷贝到新建的 Unity 工程的 `Assets` 目录之中，如：
  
  {% include image name="unitygameframework.png" %}

- 删除 `UnityGameFramework/Libraries` 文件夹下的 `GameFramework.dll` 和 `GameFramework.xml` 文件。
- 下载某一个版本的 [GameFramework](https://github.com/EllanJiang/GameFramework)，并将它的源码拷贝到 Unity 工程的 `Assets` 目录之中。其存放位置任意，如我就将它放进了 `UnityGameFramework` 目录之中：
  
  {% include image name="gameframework.png" %}

  然后在 `GameFramework` 文件夹下新建一个 `GameFramework.asmdef` 文件：

    ```c#
    {
        "name": "GameFramework",
        "references": [],
        "includePlatforms": [],
        "excludePlatforms": [],
        "allowUnsafeCode" : true
    }
    ```

  然后让 `UnityGameFramework.Runtime.asmdef` 依赖 `GameFramework.asmdef`，让 `UnityGameFramework.Editor.asmdef` 同时依赖 `GameFramework.asmdef` 和 `UnityGameFramework.Runtime.asmdef` 即可。

    ```c#
    {
        "name": "UnityGameFramework.Runtime",
        "references": [
            "GameFramework"
        ],
        "includePlatforms": [],
        "excludePlatforms": []
    }
    ```

    ```c#
    {
        "name": "UnityGameFramework.Editor",
        "references": [
            "UnityGameFramework.Runtime",
            "GameFramework"
        ],
        "includePlatforms": [
            "Editor"
        ],
        "excludePlatforms": []
    }
    ```

如此，整个框架就安装好了。接下来我们可以新建一个空场景 `LaunchScene.unity` 作为我们的游戏的启动场景，然后把框架提供的 `GameFramework.prefab` 拖入到场景中：

{% include image name="framework-prefab.png" %}

现在点击运行按钮就可以让框架代码跑起来了。

## 该系列相关笔记

- [UGF 源码阅读笔记：基础类](/2019/11/15/ugf-yuan-ma-yue-du-bi-ji-ji-chu-lei.html)

