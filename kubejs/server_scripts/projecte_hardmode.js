// 天工浮岛 v7：ProjectE 配方由 Extreme Package Crafter 执行。
// 关键终局均为 tier 4 的 9x9 shaped_table，并通过通用中间物压缩材料数量。
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
    'projecte:philosophers_stone',
    'projecte:transmutation_table',
    'projecte:transmutation_tablet',
    'projecte:dark_matter',
    'projecte:red_matter',
    'projecte:collector_mk1',
    'projecte:collector_mk2',
    'projecte:collector_mk3',
    'projecte:relay_mk1',
    'projecte:relay_mk2',
    'projecte:relay_mk3',
    'projecte:condenser_mk1',
    'projecte:condenser_mk2',
    'projectexpansion:condenser_mk3'
  ].forEach(id => event.remove({ output: id }))

  event.shaped('4x kubejs:singularity_substrate', [
    'SUS',
    'UEU',
    'SUS'
  ], {
    S: 'ae2:singularity',
    U: 'extendedcrafting:the_ultimate_ingot',
    E: 'mekanismsun:supernova_alloy'
  }).id('sky-craft-creation:projecte/singularity_substrate')

  tableRecipe('projecte:philosophers_stone', 1, [
    ['kubejs:tiangong_alloy_frame', 2],
    ['kubejs:emc_focus_module', 2],
    ['kubejs:quantum_control_matrix', 1],
    ['kubejs:singularity_substrate', 1],
    ['mekanismsun:artificial_sun_port', 1],
    ['projectexpansion:final_power_flower', 1]
  ], 'sky-craft-creation:projecte/philosophers_stone')

  tableRecipe('projecte:transmutation_table', 1, [
    ['kubejs:tiangong_alloy_frame', 2],
    ['kubejs:emc_focus_module', 2],
    ['kubejs:quantum_control_matrix', 1],
    ['projecte:philosophers_stone', 1],
    ['projecte:dark_matter', 1]
  ], 'sky-craft-creation:projecte/transmutation_table')

  tableRecipe('projecte:transmutation_tablet', 1, [
    ['kubejs:quantum_control_matrix', 3],
    ['kubejs:emc_focus_module', 2],
    ['kubejs:tiangong_alloy_frame', 2],
    ['projecte:transmutation_table', 1],
    ['ae2:wireless_terminal', 1],
    ['draconicevolution:draconium_core', 2],
    ['projecte:dark_matter', 1]
  ], 'sky-craft-creation:projecte/transmutation_tablet')

  tableRecipe('kubejs:emc_machine_core', 4, [
    ['kubejs:tiangong_alloy_frame', 1],
    ['kubejs:quantum_control_matrix', 1],
    ['kubejs:emc_focus_module', 2],
    ['projecte:dark_matter', 1],
    ['mekanismsun:supernova_control_circuit', 2],
    ['ae2:pattern_provider', 2],
    ['packagedauto:me_package_component', 4]
  ], 'sky-craft-creation:projecte/emc_machine_core')

  tableRecipe('projecte:dark_matter', 1, [
    ['kubejs:emc_focus_module', 1],
    ['projecte:mobius_fuel', 4],
    ['projecte:aeternalis_fuel', 4],
    ['ae2:singularity', 2],
    ['mekanism:alloy_atomic', 2],
    ['powah:ender_core', 2],
    ['enderio:reinforced_obsidian_block', 1]
  ], 'sky-craft-creation:projecte/dark_matter')

  tableRecipe('projecte:red_matter', 1, [
    ['kubejs:emc_focus_module', 2],
    ['kubejs:quantum_control_matrix', 2],
    ['draconicevolution:awakened_core', 2],
    ['mekanismsun:supernova_alloy', 2],
    ['extendedcrafting:the_ultimate_component', 2],
    ['projectexpansion:final_power_flower', 4],
    ['projecte:dark_matter_block', 1]
  ], 'sky-craft-creation:projecte/red_matter')

  tableRecipe('projecte:collector_mk1', 1, [
    ['kubejs:emc_machine_core', 2],
    ['kubejs:emc_focus_module', 1],
    ['kubejs:quantum_control_matrix', 1],
    ['kubejs:tiangong_alloy_frame', 1],
    ['projecte:dark_matter_block', 2],
    ['ae2:pattern_provider', 2],
    ['powah:energy_cell_nitro', 1]
  ], 'sky-craft-creation:projecte/collector_mk1')

  tableRecipe('projecte:relay_mk1', 1, [
    ['kubejs:emc_machine_core', 2],
    ['kubejs:emc_focus_module', 1],
    ['kubejs:quantum_control_matrix', 1],
    ['kubejs:tiangong_alloy_frame', 1],
    ['projecte:dark_matter_block', 2],
    ['ae2:pattern_provider', 2],
    ['mekanismgenerators:gas_burning_generator', 1]
  ], 'sky-craft-creation:projecte/relay_mk1')

  tableRecipe('projecte:condenser_mk1', 1, [
    ['kubejs:emc_machine_core', 2],
    ['kubejs:emc_focus_module', 1],
    ['kubejs:quantum_control_matrix', 1],
    ['kubejs:tiangong_alloy_frame', 1],
    ['projecte:dark_matter_block', 2],
    ['ae2:pattern_provider', 2],
    ['powah:energy_cell_nitro', 1]
  ], 'sky-craft-creation:projecte/condenser_mk1')

  tableRecipe('projecte:collector_mk2', 1, [
    ['projecte:collector_mk1', 1],
    ['projecte:red_matter_block', 3],
    ['kubejs:quantum_control_matrix', 2],
    ['kubejs:emc_focus_module', 2],
    ['mekanismsun:supernova_control_circuit', 2],
    ['draconicevolution:awakened_core', 2],
    ['mekanismsun:supernova_alloy', 2]
  ], 'sky-craft-creation:projecte/collector_mk2')

  tableRecipe('projecte:relay_mk2', 1, [
    ['projecte:relay_mk1', 1],
    ['projecte:red_matter_block', 3],
    ['kubejs:quantum_control_matrix', 2],
    ['kubejs:emc_focus_module', 2],
    ['mekanismsun:supernova_control_circuit', 2],
    ['draconicevolution:awakened_core', 2],
    ['mekanismsun:supernova_alloy', 2]
  ], 'sky-craft-creation:projecte/relay_mk2')

  tableRecipe('projecte:condenser_mk2', 1, [
    ['projecte:condenser_mk1', 1],
    ['projecte:red_matter_block', 3],
    ['kubejs:quantum_control_matrix', 2],
    ['kubejs:emc_focus_module', 2],
    ['mekanismsun:supernova_control_circuit', 2],
    ['draconicevolution:awakened_core', 2],
    ['mekanismsun:supernova_alloy', 2]
  ], 'sky-craft-creation:projecte/condenser_mk2')

  tableRecipe('projecte:collector_mk3', 1, [
    ['projecte:collector_mk2', 1],
    ['projecte:red_matter_block', 5],
    ['mekanismsun:artificial_sun_casing', 2],
    ['draconicevolution:chaotic_core', 2],
    ['projectexpansion:final_power_flower', 4],
    ['bigreactors:energycore', 2],
    ['kubejs:quantum_control_matrix', 2]
  ], 'sky-craft-creation:projecte/collector_mk3')

  tableRecipe('projecte:relay_mk3', 1, [
    ['projecte:relay_mk2', 1],
    ['projecte:red_matter_block', 5],
    ['mekanismsun:artificial_sun_casing', 2],
    ['draconicevolution:chaotic_core', 2],
    ['projectexpansion:final_power_flower', 4],
    ['bigreactors:energycore', 2],
    ['kubejs:quantum_control_matrix', 2]
  ], 'sky-craft-creation:projecte/relay_mk3')

  tableRecipe('projectexpansion:condenser_mk3', 1, [
    ['projecte:condenser_mk2', 1],
    ['projecte:red_matter_block', 5],
    ['mekanismsun:artificial_sun_casing', 2],
    ['draconicevolution:chaotic_core', 2],
    ['projectexpansion:final_power_flower', 4],
    ['bigreactors:energycore', 2],
    ['kubejs:quantum_control_matrix', 2]
  ], 'sky-craft-creation:projecte/condenser_mk3')
})
