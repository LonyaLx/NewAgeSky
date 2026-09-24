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
  }).id('sky-craft-creation:avaritia/extreme_crafting_table')

})
