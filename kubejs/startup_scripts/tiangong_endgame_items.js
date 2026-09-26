// 天工创世 · 终局合成重设计自定义中间物。
StartupEvents.registry('item', event => {
  // 贴图自动映射：物品 ID kubejs:xxx → 自动找 assets/kubejs/textures/item/xxx.png
  event.create('kubejs:tiangong_alloy_frame')
    .displayName('天工合金框架')
    .rarity('rare')

  event.create('kubejs:quantum_control_matrix')
    .displayName('量子控制矩阵')
    .rarity('epic')

  event.create('kubejs:endless_structure_core')
    .displayName('无尽结构核心')
    .rarity('epic')

  event.create('kubejs:chaotic_heart')
    .displayName('混沌之心')
    .rarity('epic')

  event.create('kubejs:tiangong_heart')
    .displayName('天工之心')
    .rarity('epic')

  event.create('kubejs:creation_convergence_core')
    .displayName('创造收敛核心')
    .rarity('epic')
})
