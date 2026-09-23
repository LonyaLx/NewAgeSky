《天工创世》NewAgeSky — 空岛科技整合包
整合包版本：1.0.1
运行环境：Minecraft 1.21.1 · NeoForge 21.1.249 · Java 21 · mods 217

一句话：以资源生产方式换代为主线，从手筛、自动筛、作物与蜜蜂，发展到 ME 网络、工厂化和 EMC。

[目录]
mods/              全部模组
shaderpacks/       光影包（Complementary Reimagined）
config/            模组配置与 FTB Quests 任务书
kubejs/            汉化、资源覆盖、空岛配方与 ProjectE 困难模式
MATERIAL_AUDIT.md  材料与来源审计
BALANCE_PLAN.md    物品魔改与终局规划（v6）
CHANGELOG.md       更新日志
MODLIST.txt        模组清单

[当前状态]
- FTB Quests：23 章、695 个任务、2 个奖励表；最终目标章节为 19 个连续创造链任务。
- 游戏窗口标题：《天工创世》--凉寻Lonya。
- 任务书已按 PCL 测试实例重构，主线章节与专题章节均已完成调整。
- 已补 Neo Eco、AE2 压印模板、门瑞欧、Draconium 与坚固蜂笼等空岛来源。
- 原版 17 个锻造模板已补全有序来源，不再依赖堡垒和遗迹。
- KubeJS 本次实机新增 92 条配方，另有 ProjectE 严格 EMC 数据包与 11 个终局自定义物品。
- ProjectE 贤者之石、交换桌、平板、暗/红物质、收集器、继电器、凝聚器已改为 Extreme Package Crafter 执行的 tier 4 配方。
- 十件创造物品组成阶段链，从创造能源立方逐步推进到龙研、气动和 JDTe；最终由创造收敛核心合成 ME 创造存储元件。
- EMC 只保留基础矿物和基础加工物，关闭配方自动推导，机器与无限资源不提供 EMC。
- 已加入 Re-Avaritia 与 PackagedAvaritia，四阶打包合成器、极端工作台和无限材料链已接入。
- 已加入 Create Ultimine 1.21.1-neoforge-1.3.3，支持 Create 工具与 FTB Ultimine 联动。
- 已补终极锭、锇、11 种碎矿、蜜脾、门瑞欧树脂桶及农业种子首件来源；当前配方材料来源审计为 0 缺失。
- 桌面源包与测试实例已同步；实机加载 0 错误、0 失败配方，本次新增 JEI 配方 0 broken。
- 创造/调试物品任务按要求忽略。

[使用方法]
1. 新建 Minecraft 1.21.1 + NeoForge 21.1.x 实例。
2. 首次启动让 NeoForge 初始化，然后关闭游戏。
3. 将 mods 与 shaderpacks 复制进实例对应目录。
4. 同步 config 与 kubejs；启动后在光影设置中选择 Complementary。
5. 进入 ProjectE/无尽终局前，先搭建 Package Encoder → Recipe Holder → Packager → Extreme Package Crafter 产线。
6. 创造物品按 Chain 1–10 顺序制作，最终合成 `ae2:creative_storage_cell`。

[建空岛世界]
新建世界 → 更多世界选项 → 世界类型选择 Skyblock（Skyblock Builder），直接生成。

[说明]
- 桌面包：C:\Users\admin\Desktop\NewAgeSky-1.21.1
- 测试实例：D:\我的世界整合包\1\versions\测试
- 游戏内修改任务后，先退出游戏，再执行保存与哈希校验。