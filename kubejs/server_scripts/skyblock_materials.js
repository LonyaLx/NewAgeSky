// 天工浮岛 · 空岛材料来源：Neo Eco 与龙研首件链
// 说明：仅添加替代配方，不删除原模组配方或改动创造物品任务。

ServerEvents.recipes(event => {
  // Neo Eco：铝合金农业路线。铝本身仍可由 Ex Deorum 筛砾石获得。
  event.shapeless('neoecoae:aluminum_alloy_dust', [
    'mysticalagriculture:aluminum_essence',
    'mysticalagriculture:iron_essence',
    '2x ae2:certus_quartz_dust'
  ]);

  // Neo Eco：功能水晶粉尘的首件来源，解开“种子→粉尘→种子”循环。
  event.shapeless('8x neoecoae:energized_crystal_dust', [
    '3x ae2:charged_certus_quartz_crystal',
    '3x ae2:certus_quartz_dust',
    '3x minecraft:glowstone_dust'
  ]);

  // Neo Eco：功能福鲁伊克斯粉尘的首件来源。
  event.shapeless('8x neoecoae:energized_fluix_crystal_dust', [
    '3x ae2:fluix_crystal',
    '3x ae2:fluix_dust',
    '3x minecraft:redstone'
  ]);

  // 龙研：给 Draconium 种子一条不依赖原矿的首件路线。
  event.shapeless('mysticalagriculture:draconium_seeds', [
    'mysticalagriculture:prosperity_seed_base',
    '2x mysticalagriculture:supremium_essence',
    '2x ae2:sky_dust',
    'minecraft:obsidian'
  ]);

  // 龙研：让 Draconium 精华可直接产出任务需要的粉尘。
  event.shapeless('draconicevolution:draconium_dust', [
    '8x mysticalagriculture:draconium_essence'
  ]);

  // 龙研：Awakened Draconium 粉尘的后期空岛来源。
  event.shapeless('2x draconicevolution:awakened_draconium_dust', [
    '4x draconicevolution:draconium_dust',
    'minecraft:nether_star',
    'draconicevolution:chaos_shard'
  ]);
});
// AE2 压印模板首件配方：原版压印室只能复制，空岛没有陨石。
ServerEvents.recipes(event => {
  const ironRing = ['III', 'IXI', 'III'];

  event.shaped('ae2:silicon_press', ironRing, {
    I: 'minecraft:iron_ingot',
    X: 'ae2:silicon'
  });

  event.shaped('ae2:calculation_processor_press', ironRing, {
    I: 'minecraft:iron_ingot',
    X: 'ae2:certus_quartz_crystal'
  });

  event.shaped('ae2:logic_processor_press', ironRing, {
    I: 'minecraft:iron_ingot',
    X: 'minecraft:gold_ingot'
  });

  event.shaped('ae2:engineering_processor_press', ironRing, {
    I: 'minecraft:iron_ingot',
    X: 'minecraft:diamond'
  });
});
// 动态联合：门瑞欧树在空岛没有自然生成，补一条首件树苗路线。
ServerEvents.recipes(event => {
  event.shapeless('integrateddynamics:menril_sapling', [
    'minecraft:oak_sapling',
    '4x mysticalagriculture:nature_essence'
  ]);

  // 门瑞欧玻璃的普通工作台替代路线，避免必须依赖干燥盆。
  event.shapeless('integratedterminals:menril_glass', [
    'minecraft:glass',
    'integrateddynamics:bucket_menril_resin'
  ]);
});
// 资源蜜蜂：坚固蜂笼首件来源。
ServerEvents.recipes(event => {
  event.shapeless('productivebees:sturdy_bee_cage', [
    'productivebees:bee_cage',
    '4x minecraft:honeycomb',
    '2x minecraft:iron_ingot'
  ]);
});