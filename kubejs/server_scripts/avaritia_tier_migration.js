// 天工创世 · Avaritia 难度适中分级迁移。
ServerEvents.recipes(event => {
  const tableSize = { 1: 3, 2: 5, 3: 7, 4: 9 }

  function tableRecipe(output, resultCount, ingredients, tier, recipeId) {
    const size = tableSize[tier]
    const total = ingredients.reduce((sum, entry) => sum + entry[1], 0)
    if (total > size * size) {
      throw new Error(`Avaritia migration recipe ${recipeId} uses ${total} items, max is ${size * size}`)
    }

    // 优先左右镜像：奇数材料放中轴，其余材料成对镜像。
    const key = {}
    const remaining = ingredients.map((entry, index) => {
      const symbol = String.fromCharCode(65 + index)
      key[symbol] = { item: entry[0] }
      return { symbol: symbol, count: entry[1] }
    })

    const centerSymbols = []
    remaining.forEach(entry => {
      if (entry.count % 2 === 1 && centerSymbols.length < size) {
        centerSymbols.push(entry.symbol)
        entry.count--
      }
    })

    const pairAssignments = []
    const singleSymbols = []
    remaining.forEach(entry => {
      for (let pair = 0; pair < Math.floor(entry.count / 2); pair++) {
        pairAssignments.push([entry.symbol, entry.symbol])
      }
      if (entry.count % 2 === 1) singleSymbols.push(entry.symbol)
    })

    if (singleSymbols.length % 2 !== 0) {
      throw new Error(`Table recipe ${recipeId} cannot pair all singleton materials`)
    }
    for (let single = 0; single < singleSymbols.length; single += 2) {
      pairAssignments.push([singleSymbols[single], singleSymbols[single + 1]])
    }

    const pairSlotCapacity = size * Math.floor(size / 2)
    while (pairAssignments.length > pairSlotCapacity) {
      centerSymbols.push.apply(centerSymbols, pairAssignments.shift())
    }
    if (centerSymbols.length > size) {
      throw new Error(`Table recipe ${recipeId} cannot fit all symmetric center items`)
    }

    const center = Math.floor(size / 2)
    const slotPairs = []
    for (let radius = 1; radius <= center; radius++) {
      for (let row = 0; row < size; row++) {
        for (let column = 0; column < center; column++) {
          if (Math.max(Math.abs(row - center), Math.abs(column - center)) !== radius) continue
          slotPairs.push([row * size + column, row * size + size - 1 - column])
        }
      }
    }

    const grid = new Array(size * size).fill(' ')
    const centerRows = [center]
    for (let offset = 1; offset <= center; offset++) {
      centerRows.push(center - offset, center + offset)
    }
    centerSymbols.forEach((symbol, index) => {
      if (index < centerRows.length) grid[centerRows[index] * size + center] = symbol
    })
    pairAssignments.forEach((pair, index) => {
      const slots = slotPairs[index]
      grid[slots[0]] = pair[0]
      grid[slots[1]] = pair[1]
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
