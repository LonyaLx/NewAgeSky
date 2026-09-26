// 天工创世 · ProjectE 难度适中终局化。
// 对应《天工创世平衡修改操作手册_难度适中版》第三部分。
ServerEvents.recipes(event => {
  const tableSize = { 3: 7, 4: 9 }

  function tableRecipe(output, resultCount, ingredients, tier, recipeId) {
    const size = tableSize[tier]
    const total = ingredients.reduce((sum, entry) => sum + entry[1], 0)
    if (total > size * size) {
      throw new Error(`ProjectE table recipe ${recipeId} uses ${total} items, max is ${size * size}`)
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
    'projecte:philosophers_stone',
    'projecte:transmutation_table',
    'projecte:transmutation_tablet',
    'projecte:dark_matter',
    'projecte:red_matter',
    'projecte:collector_mk1',
    'projecte:collector_mk2',
    'projecte:collector_mk3'
  ].forEach(id => event.remove({ output: id }))

  tableRecipe('projecte:philosophers_stone', 1, [
    ['kubejs:tiangong_alloy_frame', 2],
    ['kubejs:quantum_control_matrix', 1],
    ['ae2:singularity', 2],
    ['draconicevolution:draconium_block', 2],
    ['extendedcrafting:the_ultimate_ingot', 1],
    ['advanced_ae:quantum_core', 2],
    ['minecraft:nether_star', 2],
    ['minecraft:ender_eye', 6],
    ['avaritia:crystal_matrix_ingot', 6],
    ['projecte:aeternalis_fuel', 4],
    ['projecte:mobius_fuel', 8]
  ], 3, 'sky-craft-creation:pe/moderate/philosophers_stone')

  tableRecipe('projecte:transmutation_table', 1, [
    ['projecte:philosophers_stone', 1],
    ['kubejs:tiangong_alloy_frame', 1],
    ['ae2:pattern_provider', 2],
    ['packagedauto:me_package_component', 2],
    ['mekanism:ultimate_control_circuit', 1],
    ['avaritia:crystal_matrix', 2]
  ], 3, 'sky-craft-creation:pe/moderate/transmutation_table')

  tableRecipe('projecte:transmutation_tablet', 1, [
    ['projecte:transmutation_table', 1],
    ['kubejs:quantum_control_matrix', 2],
    ['ae2:wireless_terminal', 1],
    ['advanced_ae:quantum_core', 2],
    ['draconicevolution:awakened_core', 1]
  ], 4, 'sky-craft-creation:pe/moderate/transmutation_tablet')

  tableRecipe('projecte:dark_matter', 1, [
    ['kubejs:tiangong_alloy_frame', 1],
    ['projecte:aeternalis_fuel', 4],
    ['projecte:mobius_fuel', 8],
    ['mekanism:alloy_atomic', 2],
    ['ae2:singularity', 1],
    ['minecraft:obsidian', 8],
    ['enderio:vibrant_alloy_ingot', 2],
    ['draconicevolution:draconium_ingot', 2]
  ], 3, 'sky-craft-creation:pe/moderate/dark_matter')

  tableRecipe('projecte:red_matter', 1, [
    ['kubejs:quantum_control_matrix', 1],
    ['projecte:dark_matter_block', 1],
    ['draconicevolution:awakened_core', 2],
    ['mekanismsun:supernova_alloy', 2],
    ['extendedcrafting:the_ultimate_component', 2],
    ['avaritia:crystal_matrix', 4]
  ], 4, 'sky-craft-creation:pe/moderate/red_matter')

  tableRecipe('projecte:collector_mk1', 1, [
    ['projecte:dark_matter_block', 2],
    ['kubejs:tiangong_alloy_frame', 1],
    ['mekanism:ultimate_control_circuit', 2],
    ['advanced_ae:quantum_core', 1]
  ], 3, 'sky-craft-creation:pe/moderate/collector_mk1')

  tableRecipe('projecte:collector_mk2', 1, [
    ['projecte:red_matter_block', 3],
    ['kubejs:quantum_control_matrix', 1],
    ['mekanismsun:supernova_control_circuit', 2],
    ['draconicevolution:awakened_core', 2]
  ], 4, 'sky-craft-creation:pe/moderate/collector_mk2')

  tableRecipe('projecte:collector_mk3', 1, [
    ['projecte:red_matter_block', 6],
    ['kubejs:endless_structure_core', 1],
    ['draconicevolution:awakened_core', 4],
    ['projecte:collector_mk2', 1]
  ], 4, 'sky-craft-creation:pe/moderate/collector_mk3')
})
