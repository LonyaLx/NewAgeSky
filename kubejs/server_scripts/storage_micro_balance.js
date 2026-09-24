// 天工创世 · 存储系统难度适中微调。
ServerEvents.recipes(event => {
  const tableSize = { 2: 5, 3: 7, 4: 9 }

  function tableRecipe(output, ingredients, tier, recipeId) {
    const size = tableSize[tier]
    const total = ingredients.reduce((sum, entry) => sum + entry[1], 0)
    if (total > size * size) {
      throw new Error(`Storage recipe ${recipeId} uses ${total} items, max is ${size * size}`)
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
    'IRI',
    'ISI',
    'BIB'
  ], {
    I: 'minecraft:iron_ingot',
    R: 'minecraft:redstone',
    B: 'minecraft:iron_block',
    S: 'sophisticatedstorage:stack_upgrade_tier_1'
  }).id('sky-craft-creation:storage/stack_upgrade_tier_2')

  event.shaped('sophisticatedstorage:stack_upgrade_tier_3', [
    'GPG',
    'GSG',
    'BGB'
  ], {
    G: 'minecraft:gold_ingot',
    P: 'minecraft:piston',
    B: 'minecraft:gold_block',
    S: 'sophisticatedstorage:stack_upgrade_tier_2'
  }).id('sky-craft-creation:storage/stack_upgrade_tier_3')

  event.shaped('sophisticatedstorage:stack_upgrade_tier_4', [
    'DPD',
    'DSD',
    'BDB'
  ], {
    D: 'minecraft:diamond',
    P: 'ae2:logic_processor',
    B: 'minecraft:diamond_block',
    S: 'sophisticatedstorage:stack_upgrade_tier_3'
  }).id('sky-craft-creation:storage/stack_upgrade_tier_4')

  event.shaped('sophisticatedstorage:stack_upgrade_tier_5', [
    'NPN',
    'NSN',
    'BNB'
  ], {
    N: 'minecraft:netherite_ingot',
    P: 'mekanism:ultimate_control_circuit',
    B: 'minecraft:netherite_block',
    S: 'sophisticatedstorage:stack_upgrade_tier_4'
  }).id('sky-craft-creation:storage/stack_upgrade_tier_5')

  event.remove({ id: 'advanced_ae:quantum_storage_component' })
  tableRecipe('advanced_ae:quantum_storage_component', [
    ['ae2:cell_component_256k', 2],
    ['advanced_ae:quantum_processor', 4],
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
})
