# 天工创世 · 物品魔改与终局规划（困难模式 v7 · 创造收敛链）

## 总原则
- 不再把 `packagedauto:package` 当作普通工作台材料。
- 普通 3×3 工作台无法摆放本项目新增的终局配方。

## 一、PackagedAvaritia 终局设施
1. 使用 Package Encoder 编码目标 `avaritia:shaped_table` 配方。
2. 将编码结果写入 Package Recipe Holder。
3. 使用 Packager 和 Packaging Provider 生产对应封包。
4. 让 `packagedavaritia:extreme_crafter` 读取封包并执行 tier 4 配方。
5. 新材料仍需建立 ME 封装供应线，不能再在普通工作台放封包跳过流程。

四级封装合成器配方已改为终局材料：
- Sculk Package Crafter：Sculk Crafting Table + ME 封包组件 + AE2 样板供应器。
- Nether Package Crafter：Nether Crafting Table + ME 封包组件 + AdvancedAE 量子核心。
- End Package Crafter：End Crafting Table + 超新星控制电路 + AdvancedAE 量子核心。
- Extreme Package Crafter：Extreme Crafting Table + 人工太阳外壳 + 混沌核心。

## 四、Avaritia 终局
- 模组：Re-Avaritia 1.4.1 + PackagedAvaritia 3.0.1.5。
- Extreme Crafting Table 配方必须消耗 End Package Crafter，确保先完成封装自动化升级。
- 原生 158 条 Avaritia 配方保留，关键终局链由 KubeJS 重排。

## 五、创造物品收敛链与天工核心
批量核心：
1. 天工框架 ×4
2. 世界心矩阵 ×2
3. 天工之心 ×4

新增五种通用中间物：
- 天工合金框架 ×4
- 量子控制矩阵 ×4
- 无尽结构核心 ×2
- 创造收敛核心 ×1

创造链按有序配方推进：
1. 创造能源立方
2. Create 创造马达
3. Mekanism 创造储物箱 / Create 创造板条箱
4. Mekanism 创造流体储罐 / 化学储罐 / Create 创造流体罐
5. 龙研创造电容 / 气动创造压缩铁块
6. JDTe 创造升级
7. 十件创造物品统一合成创造收敛核心

以上配方均为 tier 4 有序配方，由 Extreme Package Crafter 执行；旧直接配方在注册阶段移除。

## 六、材料来源修正
- `extendedcrafting:the_ultimate_ingot` 新增正向 tier 4 配方：终极奇点 + 黑铁锭 + AE2 奇点。
- 新增 11 条 Ex Deorum 碎矿转换，覆盖铁、金、铜、锇、锡、铅、铀、铝、镍、银、锌。
- 锇起步链：4 锇碎矿 → 1 粗锇 → 熔炼/高炉 → 锇锭。
- 蜜脾首件来源：4 糖 + 黄色染料 + 线；锇种子和蜜糖种子也有非循环起步配方。
- `integrateddynamics:bucket_menril_resin` 新增空岛来源：桶 + 4 门瑞欧浆果。
- 当前 KubeJS 配方材料审计结果为 0 个未知来源。

## 七、实装文件
- `kubejs/server_scripts/avaritia_hardmode.js`
- `kubejs/server_scripts/material_source_fixes.js`
- `kubejs/server_scripts/skyblock_materials.js`
- `config/avaritia-common.toml`
- `config/packagedavaritia-server.toml`

## 八、验收状态
- 新结构已实机加载：KubeJS 0 错误、0 失败配方、JEI 0 broken。
- Ex-Avaritia 与 PackagedAvaritia 正常加载。
- 新增终局配方均为 tier 4，不占用普通 3×3 工作台配方位。
- 无 `packagedauto:package` 物品作为普通合成材料。

## 九、原版锻造模板来源
- 新增“锻造模板胚”：4 铁锭 + 4 钻石 + 1 黑曜石 → 4 个。
- 下界合金升级模板和 16 种盔甲纹饰模板统一使用“模板胚 + 4 钻石 + 4 金锭”的有序配方。
- 不再依赖堡垒、遗迹、沉船等原版结构。
## 十、最终目标：ME 创造收敛
最终目标章节共 19 个有序任务：
2. 制作无尽结构核心、天工框架和世界心矩阵。
3. 完成天工之心。
4. 完成创造能源立方。
5. 推进创造马达、创造储物箱、创造板条箱、创造流体储罐、创造化学储罐和 Create 创造流体罐。
6. 完成龙研创造电容、气动创造压缩铁块和 JDTe 创造升级。
7. 汇聚十件创造物品，制作创造收敛核心。

批量任务使用 FTB 的 task `count: 4L/2L`；旧的 `functionalstorage:creative_vending_upgrade` 最终目标已移除。
