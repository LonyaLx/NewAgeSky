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
