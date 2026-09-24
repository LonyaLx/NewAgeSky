// 天工创世 · 终局合成重设计自定义中间物。
StartupEvents.registry('item', event => {
  event.create('kubejs:tiangong_alloy_frame')
    .displayName('天工合金框架')
    .texture('minecraft:item/netherite_ingot')
    .rarity('rare')

  event.create('kubejs:quantum_control_matrix')
    .displayName('量子控制矩阵')
    .texture('minecraft:item/end_crystal')
    .rarity('epic')

  event.create('kubejs:endless_structure_core')
    .displayName('无尽结构核心')
    .texture('minecraft:item/nether_star')
    .rarity('epic')

  event.create('kubejs:chaotic_heart')
    .displayName('混沌之心')
    .texture('minecraft:item/heart_of_the_sea')
    .rarity('epic')

  event.create('kubejs:tiangong_heart')
    .displayName('天工之心')
    .texture('minecraft:item/nether_star')
    .rarity('epic')

  event.create('kubejs:creation_convergence_core')
    .displayName('创造收敛核心')
    .texture('minecraft:item/dragon_egg')
    .rarity('epic')
})
