// 天工创世 · 存储系统难度适中微调。
ServerEvents.recipes(event => {
  const tableSize = { 2: 5, 3: 7, 4: 9 }

  function tableRecipe(output, ingredients, tier, recipeId) {
    const size = tableSize[tier]
    const total = ingredients.reduce((sum, entry) => sum + entry[1], 0)
    if (total > size * size) {
      throw new Error(`Storage recipe ${recipeId} uses ${total} items, max is ${size * size}`)
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
      result: { id: output, count: 1 },
      tier: tier
    }).id(recipeId)
  }

  ;[
    'sophisticatedstorage:stack_upgrade_tier_2',
    'sophisticatedstorage:stack_upgrade_tier_3',
    'sophisticatedstorage:stack_upgrade_tier_4',
    'sophisticatedstorage:stack_upgrade_tier_5'
  ].forEach(id => event.remove({ id: id }))

  event.shaped('sophisticatedstorage:stack_upgrade_tier_2', [
    'III',
    'IRI',
    'BSB'
  ], {
    I: 'minecraft:iron_ingot',
    R: 'minecraft:redstone',
    B: 'minecraft:iron_block',
    S: 'sophisticatedstorage:stack_upgrade_tier_1'
  }).id('sky-craft-creation:storage/stack_upgrade_tier_2')

  event.shaped('sophisticatedstorage:stack_upgrade_tier_3', [
    'GGG',
    'GPG',
    'BSB'
  ], {
    G: 'minecraft:gold_ingot',
    P: 'minecraft:piston',
    B: 'minecraft:gold_block',
    S: 'sophisticatedstorage:stack_upgrade_tier_2'
  }).id('sky-craft-creation:storage/stack_upgrade_tier_3')

  event.shaped('sophisticatedstorage:stack_upgrade_tier_4', [
    'DDD',
    'DPD',
    'BSB'
  ], {
    D: 'minecraft:diamond',
    P: 'ae2:logic_processor',
    B: 'minecraft:diamond_block',
    S: 'sophisticatedstorage:stack_upgrade_tier_3'
  }).id('sky-craft-creation:storage/stack_upgrade_tier_4')

  event.shaped('sophisticatedstorage:stack_upgrade_tier_5', [
    'NNN',
    'NPN',
    'BSB'
  ], {
    N: 'minecraft:netherite_ingot',
    P: 'mekanism:ultimate_control_circuit',
    B: 'minecraft:netherite_block',
    S: 'sophisticatedstorage:stack_upgrade_tier_4'
  }).id('sky-craft-creation:storage/stack_upgrade_tier_5')

  event.remove({ id: 'advanced_ae:quantum_storage_component' })
  tableRecipe('advanced_ae:quantum_storage_component', [
    ['ae2:cell_component_256k', 2],
    ['advanced_ae:quantum_processor', 2],
    ['pneumaticcraft:printed_circuit_board', 2],
    ['ae2:spatial_cell_component_2', 2],
    ['ae2:quartz_vibrant_glass', 4],
    ['mekanism:advanced_control_circuit', 1],
    ['enderio:conductive_alloy_ingot', 2]
  ], 2, 'sky-craft-creation:storage/quantum_storage_component')

  event.remove({ output: 'advanced_ae:quantum_storage_128' })
  tableRecipe('advanced_ae:quantum_storage_128', [
    ['advanced_ae:quantum_storage_component', 2],
    ['advanced_ae:quantum_alloy_plate', 4],
    ['advanced_ae:quantum_processor', 4],
    ['mekanism:ultimate_control_circuit', 2],
    ['enderio:energetic_alloy_ingot', 4]
  ], 3, 'sky-craft-creation:storage/quantum_storage_128')

  event.remove({ output: 'advanced_ae:quantum_storage_256' })
  tableRecipe('advanced_ae:quantum_storage_256', [
    ['advanced_ae:quantum_storage_component', 4],
    ['advanced_ae:quantum_alloy_plate', 8],
    ['advanced_ae:quantum_processor', 8],
    ['mekanism:ultimate_control_circuit', 4],
    ['kubejs:quantum_control_matrix', 1],
    ['enderio:energetic_alloy_ingot', 8]
  ], 3, 'sky-craft-creation:storage/quantum_storage_256')

  event.remove({ output: 'functionalstorage:max_storage_upgrade' })
  tableRecipe('functionalstorage:max_storage_upgrade', [
    ['functionalstorage:netherite_upgrade', 1],
    ['advanced_ae:quantum_storage_component', 2],
    ['mekanism:ultimate_control_circuit', 2],
    ['extendedcrafting:the_ultimate_ingot', 2],
    ['kubejs:endless_structure_core', 1],
    ['avaritia:neutron_pile', 8],
    ['ae2:singularity', 8]
  ], 4, 'sky-craft-creation:storage/max_storage_upgrade')

  if (Item.exists('extendedae:infinity_cell')) {
    event.remove({ output: 'extendedae:infinity_cell' })
    tableRecipe('extendedae:infinity_cell', [
      ['kubejs:endless_structure_core', 1],
      ['advanced_ae:quantum_storage_component', 4],
      ['advanced_ae:quantum_alloy_plate', 8],
      ['extendedcrafting:the_ultimate_ingot', 4],
      ['avaritia:neutron_pile', 16],
      ['mekanismsun:supernova_control_circuit', 1],
      ['ae2:singularity', 8]
    ], 4, 'sky-craft-creation:storage/infinity_cell')
  }

  // AE2 合成终端：保留原配方结构，额外加入 2 个集成动力逻辑导向器。
  event.remove({ id: 'ae2:network/parts/terminals_crafting' })
  event.shapeless('ae2:crafting_terminal', [
    'ae2:terminal',
    'minecraft:crafting_table',
    'ae2:calculation_processor',
    '2x integrateddynamics:logic_director'
  ]).id('sky-craft-creation:ae/crafting_terminal')
})
