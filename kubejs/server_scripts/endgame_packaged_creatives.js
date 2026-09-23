// 天工浮岛 v7：创造物品阶段链。
// 所有配方均为 tier 4 的 9x9 shaped_table，由 Extreme Package Crafter 自动化执行。
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

  // 创造物品全部改为唯一阶段链，先移除可能存在的原版/模组直接配方。
  ;[
    'mekanism:creative_energy_cube',
    'mekanism:creative_bin',
    'mekanism:creative_fluid_tank',
    'mekanism:creative_chemical_tank',
    'create:creative_motor',
    'create:creative_crate',
    'create:creative_fluid_tank',
    'draconicevolution:creative_op_capacitor',
    'pneumaticcraft:creative_compressed_iron_block',
    'jdte:creative_upgrade',
    'ae2:creative_storage_cell'
  ].forEach(id => event.remove({ output: id }))

  // 通用中间物：批量产出，统一承担后期高频材料。
  tableRecipe('kubejs:tiangong_alloy_frame', 4, [
    ['extendedcrafting:the_ultimate_ingot', 1],
    ['mekanismsun:supernova_alloy', 4],
    ['extendedcrafting:black_iron_ingot', 4],
    ['enderio:reinforced_obsidian_block', 4],
    ['ae2:fluix_crystal', 4]
  ], 'sky-craft-creation:endgame/tiangong_alloy_frame')

  tableRecipe('kubejs:quantum_control_matrix', 4, [
    ['advanced_ae:quantum_core', 4],
    ['mekanismsun:supernova_control_circuit', 4],
    ['ae2:calculation_processor', 4],
    ['packagedauto:me_package_component', 4]
  ], 'sky-craft-creation:endgame/quantum_control_matrix')

  tableRecipe('kubejs:emc_focus_module', 4, [
    ['projecte:mobius_fuel', 4],
    ['projecte:aeternalis_fuel', 4],
    ['powah:ender_core', 4],
    ['ae2:pattern_provider', 4],
    ['mekanism:ultimate_control_circuit', 4]
  ], 'sky-craft-creation:endgame/emc_focus_module')

  tableRecipe('kubejs:infinity_structural_core', 2, [
    ['avaritia:infinity_catalyst', 1],
    ['avaritia:crystal_matrix_ingot', 4],
    ['avaritia:neutron_ingot', 2],
    ['kubejs:emc_focus_module', 1],
    ['kubejs:quantum_control_matrix', 1]
  ], 'sky-craft-creation:endgame/infinity_structural_core')

  // 天工核心链：世界心产出 2 份；天工核心批量产出 4 份。
  tableRecipe('kubejs:celestial_frame', 4, [
    ['kubejs:tiangong_alloy_frame', 1],
    ['ae2:fluix_crystal', 8],
    ['mekanism:alloy_atomic', 4],
    ['mekanismsun:supernova_alloy', 4],
    ['extendedcrafting:black_iron_ingot', 2],
    ['immersiveengineering:component_steel', 2],
    ['extendedcrafting:the_ultimate_component', 1]
  ], 'sky-craft-creation:endgame/celestial_frame')

  tableRecipe('kubejs:worldheart_matrix', 2, [
    ['kubejs:quantum_control_matrix', 2],
    ['projecte:red_matter_block', 2],
    ['draconicevolution:awakened_core', 2],
    ['hostilenetworks:prediction_matrix', 2],
    ['mekanismsun:supernova_control_circuit', 2],
    ['kubejs:celestial_frame', 2]
  ], 'sky-craft-creation:endgame/worldheart_matrix')

  tableRecipe('kubejs:tiangong_core', 4, [
    ['kubejs:quantum_control_matrix', 2],
    ['kubejs:worldheart_matrix', 2],
    ['draconicevolution:awakened_core', 2],
    ['draconicevolution:chaotic_core', 2],
    ['mekanismsun:artificial_sun_casing', 2],
    ['extendedcrafting:the_ultimate_ingot', 4],
    ['projectexpansion:final_power_flower', 2],
    ['bigreactors:energycore', 2],
    ['packagedauto:me_package_component', 4]
  ], 'sky-craft-creation:endgame/tiangong_core')

  // 阶段 1：能源与动力。创造能源立方是全部创造链的根节点。
  tableRecipe('mekanism:creative_energy_cube', 1, [
    ['kubejs:tiangong_core', 1],
    ['kubejs:quantum_control_matrix', 1],
    ['mekanismsun:supernova_energy_cube', 2],
    ['draconicevolution:chaotic_energy_core', 4],
    ['mekanismsun:supernova_control_circuit', 4],
    ['powah:energy_cell_nitro', 4],
    ['mekanism:ultimate_energy_cube', 1]
  ], 'sky-craft-creation:creative/chain/01_energy_cube')

  tableRecipe('create:creative_motor', 1, [
    ['mekanism:creative_energy_cube', 1],
    ['kubejs:tiangong_alloy_frame', 1],
    ['create:precision_mechanism', 4],
    ['immersiveengineering:capacitor_hv', 2],
    ['mekanism:alloy_atomic', 2]
  ], 'sky-craft-creation:creative/chain/02_motor')

  // 阶段 2：固体与流体存储。能源核心向两条存储支线分流。
  tableRecipe('mekanism:creative_bin', 1, [
    ['mekanism:creative_energy_cube', 1],
    ['kubejs:tiangong_alloy_frame', 1],
    ['mekanism:ultimate_bin', 2],
    ['extendedcrafting:the_ultimate_ingot', 4],
    ['mekanism:alloy_atomic', 4],
    ['packagedauto:me_package_component', 2]
  ], 'sky-craft-creation:creative/chain/03_bin')

  tableRecipe('create:creative_crate', 1, [
    ['create:creative_motor', 1],
    ['kubejs:tiangong_alloy_frame', 1],
    ['create:item_vault', 3],
    ['sophisticatedstorage:netherite_chest', 2],
    ['extendedcrafting:the_ultimate_ingot', 4],
    ['packagedauto:me_package_component', 2]
  ], 'sky-craft-creation:creative/chain/04_crate')

  tableRecipe('mekanism:creative_fluid_tank', 1, [
    ['mekanism:creative_energy_cube', 1],
    ['kubejs:tiangong_alloy_frame', 1],
    ['mekanism:ultimate_fluid_tank', 2],
    ['enderio:reinforced_obsidian_block', 4],
    ['mekanism:alloy_atomic', 4],
    ['packagedauto:me_package_component', 2]
  ], 'sky-craft-creation:creative/chain/05_fluid_tank')

  tableRecipe('mekanism:creative_chemical_tank', 1, [
    ['mekanism:creative_fluid_tank', 1],
    ['kubejs:tiangong_alloy_frame', 1],
    ['mekanism:ultimate_chemical_tank', 2],
    ['extendedcrafting:the_ultimate_component', 4],
    ['mekanism:alloy_atomic', 4],
    ['packagedauto:me_package_component', 2]
  ], 'sky-craft-creation:creative/chain/06_chemical_tank')

  tableRecipe('create:creative_fluid_tank', 1, [
    ['mekanism:creative_fluid_tank', 1],
    ['kubejs:tiangong_alloy_frame', 1],
    ['create:fluid_tank', 3],
    ['enderio:reinforced_obsidian_block', 4],
    ['mekanism:alloy_atomic', 4],
    ['packagedauto:me_package_component', 2]
  ], 'sky-craft-creation:creative/chain/07_create_fluid_tank')

  // 阶段 3：高阶机器支线，必须同时接入能源、存储和流体创造件。
  tableRecipe('draconicevolution:creative_op_capacitor', 1, [
    ['mekanism:creative_energy_cube', 1],
    ['mekanism:creative_chemical_tank', 1],
    ['kubejs:quantum_control_matrix', 2],
    ['draconicevolution:chaotic_core', 3],
    ['draconicevolution:chaotic_energy_core', 2],
    ['draconicevolution:awakened_draconium_block', 6],
    ['packagedauto:me_package_component', 2]
  ], 'sky-craft-creation:creative/chain/08_draconic_capacitor')

  tableRecipe('pneumaticcraft:creative_compressed_iron_block', 1, [
    ['create:creative_crate', 1],
    ['mekanism:creative_fluid_tank', 1],
    ['kubejs:tiangong_alloy_frame', 2],
    ['pneumaticcraft:compressed_iron_block', 4],
    ['pneumaticcraft:advanced_pressure_tube', 4],
    ['mekanismsun:artificial_sun_casing', 4],
    ['packagedauto:me_package_component', 2]
  ], 'sky-craft-creation:creative/chain/09_pneumatic_core')

  tableRecipe('jdte:creative_upgrade', 1, [
    ['draconicevolution:creative_op_capacitor', 1],
    ['pneumaticcraft:creative_compressed_iron_block', 1],
    ['kubejs:quantum_control_matrix', 2],
    ['mekanismsun:supernova_control_circuit', 4],
    ['projectexpansion:final_power_flower', 4],
    ['packagedauto:me_package_component', 2]
  ], 'sky-craft-creation:creative/chain/10_jdte_upgrade')

  // 阶段 4：全部十件创造物品收敛，最终解锁 ME 创造存储元件。
  tableRecipe('kubejs:creative_convergence_core', 1, [
    ['mekanism:creative_energy_cube', 1],
    ['mekanism:creative_bin', 1],
    ['mekanism:creative_fluid_tank', 1],
    ['mekanism:creative_chemical_tank', 1],
    ['create:creative_motor', 1],
    ['create:creative_crate', 1],
    ['create:creative_fluid_tank', 1],
    ['draconicevolution:creative_op_capacitor', 1],
    ['pneumaticcraft:creative_compressed_iron_block', 1],
    ['jdte:creative_upgrade', 1],
    ['kubejs:infinity_structural_core', 1],
    ['kubejs:quantum_control_matrix', 2],
    ['kubejs:tiangong_alloy_frame', 2]
  ], 'sky-craft-creation:creative/convergence_core')

  tableRecipe('ae2:creative_storage_cell', 1, [
    ['kubejs:creative_convergence_core', 1],
    ['kubejs:infinity_structural_core', 1],
    ['kubejs:quantum_control_matrix', 4],
    ['kubejs:tiangong_alloy_frame', 4],
    ['ae2:cell_component_256k', 4],
    ['ae2:singularity', 8],
    ['packagedauto:me_package_component', 8]
  ], 'sky-craft-creation:creative/chain/final_me_creative_storage_cell')
})
