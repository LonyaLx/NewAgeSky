// 天工浮岛终局核心物品。纹理复用现有模组资源，避免空岛包缺图。
StartupEvents.registry('item', event => {
  event.create('kubejs:singularity_substrate')
    .displayName('奇点基质')
    .texture('ae2:item/singularity')
    .rarity('epic')
    .glow(true)

  event.create('kubejs:emc_machine_core')
    .displayName('EMC 机器核心')
    .texture('projecte:item/matter/red')
    .rarity('epic')
    .glow(true)


  event.create('kubejs:tiangong_alloy_frame')
    .displayName('天工合金框架')
    .texture('extendedcrafting:item/the_ultimate_component')
    .rarity('epic')
    .glow(true)

  event.create('kubejs:quantum_control_matrix')
    .displayName('量子控制矩阵')
    .texture('advanced_ae:item/quantum_processor')
    .rarity('epic')
    .glow(true)

  event.create('kubejs:emc_focus_module')
    .displayName('EMC 聚焦模块')
    .texture('projecte:item/matter/dark')
    .rarity('epic')
    .glow(true)

  event.create('kubejs:infinity_structural_core')
    .displayName('无尽结构核心')
    .texture('avaritia:item/resource/crystal/crystal_matrix_ingot')
    .rarity('epic')
    .glow(true)

  event.create('kubejs:creative_convergence_core')
    .displayName('创造收敛核心')
    .texture('avaritia:item/resource/infinity/infinity_catalyst')
    .rarity('epic')
    .glow(true)

  event.create('kubejs:celestial_frame')
    .displayName('天工框架')
    .texture('extendedcrafting:item/the_ultimate_ingot')
    .rarity('epic')
    .glow(true)

  event.create('kubejs:worldheart_matrix')
    .displayName('世界心矩阵')
    .texture('advanced_ae:item/quantum_processor')
    .rarity('epic')
    .glow(true)

  event.create('kubejs:tiangong_core')
    .displayName('天工之心')
    .texture('draconicevolution:item/components/chaotic_core')
    .rarity('epic')
    .glow(true)

})