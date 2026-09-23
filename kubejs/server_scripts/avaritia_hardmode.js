// 天工浮岛 v7 · 无尽贪婪终局整合
// Re-Avaritia 保留自身机器链，PackagedAvaritia 负责四阶表格自动化。
ServerEvents.recipes(event => {
  function tableRecipe(output, resultCount, ingredients, recipeId) {
    const total = ingredients.reduce((sum, entry) => sum + entry[1], 0)
    if (total > 81) {
      throw new Error(`Avaritia table recipe ${recipeId} uses ${total} items, max is 81`)
    }

    const grid = new Array(81).fill(' ')
    const key = {}
    let slot = 0
    ingredients.forEach((entry, index) => {
      const symbol = String.fromCharCode(65 + index)
      key[symbol] = { item: entry[0] }
      for (let count = 0; count < entry[1]; count++) {
        grid[slot++] = symbol
      }
    })

    const pattern = []
    for (let row = 0; row < 9; row++) {
      pattern.push(grid.slice(row * 9, row * 9 + 9).join(''))
    }

    event.custom({
      type: 'avaritia:shaped_table',
      pattern: pattern,
      key: key,
      result: { id: output, count: resultCount },
      tier: 4
    }).id(recipeId)
  }

  ;[
    'avaritia:neutron_collector',
    'avaritia:neutron_compressor',
    'avaritia:infinity_catalyst',
    'avaritia:infinity_catalyst_eternal',
    'avaritia:infinity_ingot',
    'avaritia:extreme_crafting_table'
  ].forEach(id => event.remove({ id: id }))

  ;[
    'packagedavaritia:sculk_crafter',
    'packagedavaritia:nether_crafter',
    'packagedavaritia:end_crafter',
    'packagedavaritia:extreme_crafter'
  ].forEach(id => event.remove({ output: id }))

  event.shaped('packagedavaritia:sculk_crafter', [
    ' A ',
    'PCP',
    ' A '
  ], {
    P: 'packagedauto:me_package_component',
    A: 'ae2:pattern_provider',
    C: 'avaritia:sculk_crafting_table'
  }).id('packagedavaritia:sculk_crafter_ae')

  event.shaped('packagedavaritia:nether_crafter', [
    ' Q ',
    'PCP',
    ' Q '
  ], {
    P: 'packagedauto:me_package_component',
    Q: 'advanced_ae:quantum_core',
    C: 'avaritia:nether_crafting_table'
  }).id('packagedavaritia:nether_crafter_ae')

  event.shaped('packagedavaritia:end_crafter', [
    'QAQ',
    'PCP',
    'QAQ'
  ], {
    P: 'packagedauto:me_package_component',
    A: 'mekanismsun:supernova_control_circuit',
    Q: 'advanced_ae:quantum_core',
    C: 'avaritia:end_crafting_table'
  }).id('packagedavaritia:end_crafter_ae')

  event.shaped('packagedavaritia:extreme_crafter', [
    'QAQ',
    'PCP',
    'QAQ'
  ], {
    P: 'packagedauto:me_package_component',
    A: 'mekanismsun:artificial_sun_casing',
    Q: 'draconicevolution:chaotic_core',
    C: 'avaritia:extreme_crafting_table'
  }).id('packagedavaritia:extreme_crafter_ae')

  // 空岛首件：升级锻造模板本身没有正向配方，先提供一条 3x3 有序来源。
  event.shaped('avaritia:upgrade_smithing_template', [
    'CNC',
    'NUN',
    'CNC'
  ], {
    C: 'avaritia:crystal_matrix_ingot',
    N: 'avaritia:neutron_pile',
    U: 'kubejs:emc_machine_core'
  }).id('newagesky:avaritia/upgrade_smithing_template_first')
  // 极端工作台必须先建立 End Package Crafter，完成四阶自动封装升级。
  event.custom({
    type: 'avaritia:shaped_table',
    pattern: [
      'bccfccb',
      'cddgddc',
      'cdihidc',
      'cdilidc',
      'cdjkjdc',
      'cdddddc',
      'beeeeeb'
    ],
    key: {
      b: { item: 'minecraft:lodestone' },
      c: { item: 'avaritia:diamond_lattice' },
      d: { item: 'avaritia:crystal_matrix_ingot' },
      e: { item: 'avaritia:crystal_matrix' },
      f: { item: 'minecraft:recovery_compass' },
      g: { item: 'minecraft:dragon_egg' },
      h: { item: 'minecraft:beacon' },
      i: { item: 'minecraft:reinforced_deepslate' },
      j: { item: 'minecraft:netherite_block' },
      k: { item: 'minecraft:heart_of_the_sea' },
      l: { item: 'packagedavaritia:end_crafter' }
    },
    result: { id: 'avaritia:extreme_crafting_table', count: 1 },
    tier: 3
  }).id('newagesky:avaritia/extreme_crafting_table')

  tableRecipe('avaritia:neutron_collector', 1, [
    ['kubejs:tiangong_alloy_frame', 2],
    ['kubejs:emc_focus_module', 1],
    ['kubejs:quantum_control_matrix', 1],
    ['kubejs:emc_machine_core', 1],
    ['avaritia:crystal_matrix_ingot', 6],
    ['minecraft:iron_block', 8],
    ['minecraft:redstone_block', 8],
    ['minecraft:quartz_block', 4]
  ], 'newagesky:avaritia/neutron_collector')

  tableRecipe('avaritia:neutron_compressor', 1, [
    ['kubejs:tiangong_alloy_frame', 2],
    ['kubejs:emc_machine_core', 1],
    ['kubejs:quantum_control_matrix', 1],
    ['avaritia:crystal_matrix_ingot', 6],
    ['avaritia:neutron_ingot', 12],
    ['minecraft:iron_block', 8],
    ['minecraft:redstone_block', 4],
    ['minecraft:hopper', 2]
  ], 'newagesky:avaritia/neutron_compressor')

  event.custom({
    type: 'avaritia:infinity_catalyst',
    ingredients: [
      { item: 'avaritia:crystal_matrix_ingot' },
      { item: 'avaritia:neutron_ingot' },
      { item: 'avaritia:endest_pearl' },
      { item: 'avaritia:cosmic_meatballs' },
      { item: 'avaritia:ultimate_stew' },
      { item: 'avaritia:record_fragment' },
      { item: 'kubejs:emc_machine_core' },
      { item: 'kubejs:quantum_control_matrix' }
    ]
  }).id('newagesky:avaritia/infinity_catalyst')

  tableRecipe('avaritia:infinity_ingot', 1, [
    ['kubejs:infinity_structural_core', 1],
    ['avaritia:neutron_ingot', 12],
    ['avaritia:crystal_matrix_ingot', 8],
    ['kubejs:emc_machine_core', 1]
  ], 'newagesky:avaritia/infinity_ingot')
})
