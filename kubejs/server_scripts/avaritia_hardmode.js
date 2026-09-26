// 天工浮岛 v7 · 无尽贪婪终局整合
// Re-Avaritia 保留自身机器链，PackagedAvaritia 负责四阶表格自动化。
ServerEvents.recipes(event => {
  const tableSize = { 3: 7, 4: 9 }

  function tableRecipe(output, resultCount, ingredients, tier, recipeId) {
    const size = tableSize[tier]
    const total = ingredients.reduce((sum, entry) => sum + entry[1], 0)
    if (total > size * size) {
      throw new Error(`Avaritia table recipe ${recipeId} uses ${total} items, max is ${size * size}`)
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

  // 空岛首件：升级锻造模板本身没有正向配方，先提供一条 7x7 对称表格来源。
  tableRecipe('avaritia:extreme_crafting_table', 1, [
    ['minecraft:lodestone', 4],
    ['avaritia:diamond_lattice', 14],
    ['avaritia:crystal_matrix_ingot', 15],
    ['avaritia:crystal_matrix', 5],
    ['minecraft:recovery_compass', 1],
    ['minecraft:dragon_egg', 1],
    ['minecraft:beacon', 1],
    ['minecraft:reinforced_deepslate', 2],
    ['minecraft:netherite_block', 2],
    ['minecraft:heart_of_the_sea', 1],
    ['packagedavaritia:end_crafter', 1]
  ], 3, 'sky-craft-creation:avaritia/extreme_crafting_table')

})
