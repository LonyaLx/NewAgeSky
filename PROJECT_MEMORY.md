# 天工创世 · 项目记忆（2026-09-23）

## 当前状态
- 桌面包：`C:\Users\admin\Desktop\NewAgeSky-1.21.1`
- 测试实例：`D:\我的世界整合包\1\versions\测试`
- Minecraft 1.21.1 + NeoForge 21.1.249 + Java 21；mods 217。
- 游戏窗口标题：《天工创世》--凉寻Lonya。
- FTB Quests：23 章、695 个任务、2 个奖励表、29 个任务文件；最终目标已有 19 个创造链任务。
- 不安装 data_energistics、Refined Storage、apothicenchantingaddition。
- 渲染组合：Sodium + Iris。
- 最终目标章节已重做为 19 个连续创造链任务，最终目标为 ME 创造存储元件。
- 已加入 Create Ultimine 1.21.1-neoforge-1.3.3。

## 当前任务线
- 当前任务书已从 PCL 测试实例同步：23 章、695 个任务、29 个任务文件。
- 主线与专题章节结构已调整，新增气动工业章节。
- 最终目标仍为 19 个连续创造链任务。

## 终局平衡
- ProjectE 的贤者之石、交换桌、平板、暗/红物质及机器默认配方已移除。
- ProjectE 与创造物品现为 tier 4 的 9×9 `avaritia:shaped_table` 配方，由 Extreme Package Crafter 执行。
- `packagedauto:package` 不再作为普通工作台材料。
- 天工框架、世界心矩阵、天工之心改为批量产出；创造物品组成十阶段有序链，最终合成 `ae2:creative_storage_cell`。
- EMC 使用严格白名单，关闭自动配方推导，`covalenceLoss=0.6`。
- ProjectE 实机注册 411 个 EMC 值。

## 无尽贪婪
- 模组：Re-Avaritia 1.4.1、PackagedAvaritia 3.0.1.5。
- 四级 Package Crafter、Extreme Crafting Table、中子收集/压缩和无限材料链已接入。
- 极端工作台必须消耗 End Package Crafter。
- 奇点生成时间 600 秒，ProjectE 奇点计数加成关闭。
- Avaritia 原生 158 条配方保留，关键终局链由 KubeJS 重排。

## 材料来源
- 已补 AE2 压印模板、门瑞欧树苗/玻璃/树脂桶、坚固蜂笼、Draconium、Awakened Draconium、Neo Eco 三种粉尘。
- 已补 `extendedcrafting:the_ultimate_ingot` 正向来源。
- 已补 `avaritia:upgrade_smithing_template` 首件有序配方；原模组复制模板配方保留。
- 新增锻造模板胚，并为原版下界合金升级模板和 16 种盔甲纹饰模板补全 17 条有序首件配方。
- 当前 KubeJS 配方材料审计：0 个未知来源。
- 已补 11 条 Ex Deorum 碎矿转换，锇可通过碎矿→粗锇→锇锭起步。
- 蜜脾、锇种子和蜜糖种子已有非循环首件来源。
- 全任务材料复扫 980 种，剩余 18 种均为创造/调试、动态机器产物或原版硬编码。
- 本次实机 KubeJS 新增 92 条、移除 34 条配方，0 失败。终局自定义物品共 11 个。

## 实机验收
- KubeJS：0 错误、0 失败配方；本次新增 92 条、移除 34 条。
- JEI：本次新增配方 0 broken。
- 发布包结构校验：CurseForge 清单 166 个远程文件、51 个内置模组，名称/制作人/说明/校验文件齐全。
- Avaritia、PackagedAvaritia、ProjectE 均正常加载。
- 桌面端与测试实例相关文件 SHA-256 一致。
- 游戏已关闭；后续测试或修改前不要覆盖运行中的任务文件。

## 下次继续
- 用 PCL/HMCL 实际导入 `天工创世-发布/01-整合包/天工创世-1.0.0-CurseForge.zip`，验证 166 个远程模组下载和 51 个内置模组安装。
- 在游戏内实际制作一条创造链，重点验证 Extreme Package Crafter、封包编码器和最终 ME 创造存储元件。
- 检查新增中间物在 JEI 中的合成树和批量产出显示。
- 继续从任务物品反查根来源，排查“有配方但配方链自我循环”的材料。
- 若继续改配方，必须先退出测试实例，再同步 `config/` 与 `kubejs/`。
- 本次备份：`_excluded/creative_chain_b_20260910_214607/`。
- 任务链备份：`_excluded/creative_quest_chain_20260910_215512/`。
- 最终发布目录：`C:\Users\admin\Desktop\天工创世-发布`。
- 发布渠道：BBSMC、MCMOD、CurseForge；不发布 Modrinth。
- 唯一安装包：`01-整合包/天工创世-1.0.0-CurseForge.zip`，69.37 MB；166 个模组由启动器下载，51 个随包提供。
- 安装包 SHA-256：`C29266FBEEF9553A0214D10FC8EF601BEBF1468A7C2E2ED4A4638336230E0F0A`。
- 模板配方备份：`_excluded/avaritia_template_20260910_222858/`。
- 全模板配方备份：`_excluded/all_smithing_templates_20260910_223314/`。
## 工作规则
1. 任务只在测试实例中编辑，退出游戏后再同步。
2. 同步顺序：备份 → 测试实例 → 桌面包 → 逐文件哈希。
3. config/kubejs 改动必须两端同步。
4. 空岛模板只对新档生效；任务缓存未刷新时新建世界或清理存档任务缓存。
5. 语言文件使用 UTF-8 无 BOM；清理键名前先备份。

## 参考
- `MATERIAL_AUDIT.md`
- `BALANCE_PLAN.md`
- `CHANGELOG.md`
- `MODLIST.txt`
- `_excluded/`