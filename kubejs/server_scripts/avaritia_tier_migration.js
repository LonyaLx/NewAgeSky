// 天工创世 · Avaritia 难度适中分级迁移。
ServerEvents.recipes(event => {
  const tableSize = { 1: 3, 2: 5, 3: 7, 4: 9 }

  function tableRecipe(output, resultCount, ingredients, tier, recipeId) {
    const size = tableSize[tier]
    const total = ingredients.reduce((sum, entry) => sum + entry[1], 0)
    if (total > size * size) {
      throw new Error(`Avaritia migration recipe ${recipeId} uses ${total} items, max is ${size * size}`)
    }

    const grid = new Array(size * size).fill(' ')
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
    for (let row = 0; row < size; row++) {
      pattern.push(grid.slice(row * size, row * size + size).join(''))
    }

    event.custom({
      type: 'avaritia:shaped_table',
      pattern: pattern,
      key: key,
      result: { id: output, count: resultCount },
      tier: tier
    }).id(recipeId)
  }

  event.remove({ id: 'avaritia:crystal_matrix_ingot' })
  event.remove({ id: 'avaritia:crystal_matrix_ingot_normal' })
  event.remove({ id: 'avaritia:diamond_lattice_normal' })
  event.remove({ output: 'avaritia:cosmic_meatballs' })
  event.remove({ output: 'avaritia:neutron_collector' })

  event.custom({
    type: 'avaritia:shaped_table',
    pattern: [
      'xyx',
      'xyx',
      'xyx'
    ],
    key: {
      x: { item: 'avaritia:diamond_lattice' },
      y: { item: 'minecraft:nether_star' }
    },
    result: { id: 'avaritia:crystal_matrix_ingot', count: 2 },
    tier: 1
  }).id('sky-craft-creation:avaritia_tier1/crystal_matrix_ingot')

  tableRecipe('avaritia:cosmic_meatballs', 1, [
    ['minecraft:porkchop', 1],
    ['minecraft:beef', 1],
    ['minecraft:mutton', 1],
    ['minecraft:cod', 1],
    ['minecraft:salmon', 1],
    ['minecraft:tropical_fish', 1],
    ['minecraft:pufferfish', 1],
    ['minecraft:rabbit', 1],
    ['minecraft:chicken', 1],
    ['minecraft:rotten_flesh', 1],
    ['minecraft:spider_eye', 1],
    ['minecraft:egg', 1],
    ['avaritia:neutron_nugget', 1],
    ['minecraft:blaze_powder', 2],
    ['minecraft:nether_wart', 2],
    ['minecraft:netherrack', 4]
  ], 2, 'sky-craft-creation:avaritia_tier2/cosmic_meatballs')

  tableRecipe('avaritia:neutron_collector', 1, [
    ['avaritia:crystal_matrix_ingot', 4],
    ['minecraft:nether_star', 1],
    ['draconicevolution:draconium_dust', 2],
    ['minecraft:obsidian', 8],
    ['minecraft:redstone', 8],
    ['minecraft:iron_block', 2]
  ], 2, 'sky-craft-creation:avaritia_tier2/neutron_collector')
})
