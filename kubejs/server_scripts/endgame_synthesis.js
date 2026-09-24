// 天工创世 · 终局物品合成重设计。
// 内容对应《天工创世终局合成重设计.html》，不修改该文档。
ServerEvents.recipes(event => {
  const tableSize = { 2: 5, 3: 7, 4: 9 }

  function tableRecipe(output, resultCount, ingredients, tier, recipeId) {
    const size = tableSize[tier]
    const total = ingredients.reduce((sum, entry) => sum + entry[1], 0)
    if (total > size * size) {
      throw new Error(`Endgame table recipe ${recipeId} uses ${total} items, max is ${size * size}`)
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

  const creativeOutputs = [
    'create:creative_crate',
    'create:creative_fluid_tank',
    'create:creative_motor',
    'pneumaticcraft:creative_compressed_iron_block',
    'mekanism:creative_energy_cube',
    'mekanism:creative_bin',
    'mekanism:creative_fluid_tank',
    'mekanism:creative_chemical_tank',
    'jdte:creative_upgrade',
    'draconicevolution:creative_capacitor',
    'extendedcrafting:ultimate_table'
  ]
  creativeOutputs.forEach(id => event.remove({ output: id }))

  ;[
    'kubejs:tiangong_alloy_frame',
    'kubejs:quantum_control_matrix',
    'kubejs:endless_structure_core',
    'kubejs:chaotic_heart',
    'kubejs:tiangong_heart',
    'kubejs:creation_convergence_core'
  ].forEach(id => event.remove({ output: id }))

  // ① 天工合金框架：Tier 2，输出 4。
  // 文档原始数量为 53；受 5×5 台限制，压缩到 25，保留全部材料类别。
  tableRecipe('kubejs:tiangong_alloy_frame', 4, [
    ['mekanism:alloy_atomic', 4],
    ['enderio:vibrant_alloy_ingot', 4],
    ['draconicevolution:draconium_ingot', 4],
    ['extendedcrafting:enhanced_ender_ingot', 4],
    ['ae2:quartz_vibrant_glass', 2],
    ['create:sturdy_sheet', 2],
    ['pneumaticcraft:printed_circuit_board', 2],
    ['minecraft:nether_star', 1],
    ['minecraft:obsidian', 2]
  ], 2, 'sky-craft-creation:endgame/tiangong_alloy_frame')

  // ② 量子控制矩阵：Tier 3，输出 2。
  tableRecipe('kubejs:quantum_control_matrix', 2, [
    ['kubejs:tiangong_alloy_frame', 2],
    ['advanced_ae:quantum_core', 2],
    ['mekanism:ultimate_control_circuit', 2],
    ['draconicevolution:wyvern_core', 1],
    ['mekanism:pellet_polonium', 8],
    ['ae2:singularity', 1],
    ['minecraft:end_crystal', 4],
    ['minecraft:dragon_egg', 1]
  ], 3, 'sky-craft-creation:endgame/quantum_control_matrix')

  // ③ 无尽结构核心：Tier 4。
  tableRecipe('kubejs:endless_structure_core', 1, [
    ['kubejs:quantum_control_matrix', 2],
    ['extendedcrafting:the_ultimate_ingot', 2],
    ['avaritia:crystal_matrix_ingot', 8],
    ['avaritia:neutron_pile', 16],
    ['draconicevolution:awakened_core', 1],
    ['mekanismsun:supernova_control_circuit', 1],
    ['avaritia:infinity_catalyst', 1],
    ['extendedcrafting:ultimate_singularity', 1]
  ], 4, 'sky-craft-creation:endgame/endless_structure_core')

  // ④ 天工之心前置：混沌之心，Chaotic 融合。
  event.recipes.draconicevolution.fusion_crafting(
    'draconicevolution:chaotic_core',
    [
      'kubejs:endless_structure_core',
      'kubejs:endless_structure_core',
      'draconicevolution:awakened_draconium_block',
      'draconicevolution:awakened_draconium_block',
      'draconicevolution:awakened_draconium_block',
      'draconicevolution:awakened_draconium_block',
      'avaritia:neutron',
      'avaritia:neutron',
      'avaritia:neutron',
      'avaritia:neutron'
    ],
    'kubejs:chaotic_heart',
    'chaotic',
    5000000000
  )

  // ⑤ 天工之心：Tier 4。
  tableRecipe('kubejs:tiangong_heart', 1, [
    ['kubejs:chaotic_heart', 1],
    ['kubejs:endless_structure_core', 2],
    ['kubejs:tiangong_alloy_frame', 4],
    ['kubejs:quantum_control_matrix', 2],
    ['avaritia:infinity_ingot', 1],
    ['mekanismsun:artificial_sun_casing', 1]
  ], 4, 'sky-craft-creation:endgame/tiangong_heart')

  // 第一组 · Tier 2 创造物品。
  tableRecipe('create:creative_crate', 1, [
    ['kubejs:tiangong_alloy_frame', 1],
    ['create:brass_casing', 4],
    ['functionalstorage:netherite_upgrade', 2],
    ['create:precision_mechanism', 8]
  ], 2, 'sky-craft-creation:endgame/create_creative_crate')

  // 文档玻璃为 16；5×5 台上限 25，压缩为 14。
  tableRecipe('create:creative_fluid_tank', 1, [
    ['kubejs:tiangong_alloy_frame', 1],
    ['create:fluid_tank', 8],
    ['mekanism:ultimate_fluid_tank', 2],
    ['minecraft:glass', 14]
  ], 2, 'sky-craft-creation:endgame/create_creative_fluid_tank')

  // 第二组 · Tier 3 创造物品。
  tableRecipe('create:creative_motor', 1, [
    ['kubejs:quantum_control_matrix', 1],
    ['create:cogwheel', 8],
    ['pneumaticcraft:compressed_iron_block', 4],
    ['kubejs:endless_structure_core', 1]
  ], 3, 'sky-craft-creation:endgame/create_creative_motor')

  // 文档压缩铁块为 64；7×7 台上限 49，压缩为 36，其余材料保持。
  tableRecipe('pneumaticcraft:creative_compressed_iron_block', 1, [
    ['kubejs:quantum_control_matrix', 1],
    ['pneumaticcraft:compressed_iron_block', 36],
    ['pneumaticcraft:printed_circuit_board', 4],
    ['mekanism:ultimate_pressurized_tube', 8]
  ], 3, 'sky-craft-creation:endgame/pneumatic_creative_compressed_iron_block')

  // 第三组 · Tier 4 创造物品。
  tableRecipe('mekanism:creative_energy_cube', 1, [
    ['kubejs:endless_structure_core', 1],
    ['mekanism:ultimate_energy_cube', 4],
    ['draconicevolution:draconic_energy_core', 1],
    ['mekanismsun:artificial_sun_casing', 1],
    ['mekanismgenerators:fusion_reactor_controller', 1]
  ], 4, 'sky-craft-creation:endgame/creative_energy_cube')

  tableRecipe('mekanism:creative_bin', 1, [
    ['kubejs:endless_structure_core', 1],
    ['mekanism:ultimate_bin', 4],
    ['megacells:cell_component_16m', 8],
    ['functionalstorage:max_storage_upgrade', 2]
  ], 4, 'sky-craft-creation:endgame/creative_bin')

  tableRecipe('mekanism:creative_fluid_tank', 1, [
    ['kubejs:endless_structure_core', 1],
    ['mekanism:dynamic_tank', 1],
    ['mekanism:ultimate_mechanical_pipe', 8],
    ['create:creative_fluid_tank', 1]
  ], 4, 'sky-craft-creation:endgame/creative_fluid_tank')

  tableRecipe('mekanism:creative_chemical_tank', 1, [
    ['kubejs:endless_structure_core', 1],
    ['mekanism:dynamic_tank', 1],
    ['mekanism:ultimate_pressurized_tube', 8],
    ['industrialforegoing:pink_slime', 8]
  ], 4, 'sky-craft-creation:endgame/creative_chemical_tank')

  tableRecipe('extendedcrafting:ultimate_table', 1, [
    ['kubejs:endless_structure_core', 2],
    ['extendedcrafting:the_ultimate_ingot', 4],
    ['avaritia:crystal_matrix', 8],
    ['extendedcrafting:ultimate_singularity', 1]
  ], 4, 'sky-craft-creation:endgame/extendedcrafting_ultimate_table')

  // 第四组 · 龙研融合。
  // 文档外围为 16 件；融合台最多 10 个外围位，保留全部材料类别并压缩重复数量。
  event.recipes.draconicevolution.fusion_crafting(
    'jdte:extended_time_accelerator',
    [
      'kubejs:endless_structure_core',
      'kubejs:endless_structure_core',
      'mekanismsun:supernova_control_circuit',
      'mekanismsun:supernova_control_circuit',
      'justdirethings:time_crystal_block',
      'justdirethings:time_crystal_block',
      'justdirethings:time_crystal_block',
      'justdirethings:time_crystal_block',
      'draconicevolution:awakened_draconium_block',
      'draconicevolution:awakened_draconium_block'
    ],
    'jdte:creative_upgrade',
    'draconic',
    2000000000
  )

  // 文档外围为 26 件；融合台最多 10 个外围位，保留全部材料类别并压缩重复数量。
  event.recipes.draconicevolution.fusion_crafting(
    'draconicevolution:chaotic_energy_core',
    [
      'kubejs:tiangong_heart',
      'mekanism:creative_energy_cube',
      'draconicevolution:chaos_shard',
      'draconicevolution:chaos_shard',
      'draconicevolution:chaos_shard',
      'draconicevolution:chaos_shard',
      'draconicevolution:awakened_draconium_block',
      'draconicevolution:awakened_draconium_block',
      'draconicevolution:awakened_draconium_block',
      'draconicevolution:awakened_draconium_block'
    ],
    'draconicevolution:creative_capacitor',
    'chaotic',
    10000000000
  )

  // 创造收敛核心：最终目标。
  tableRecipe('kubejs:creation_convergence_core', 1, [
    ['mekanism:creative_energy_cube', 1],
    ['create:creative_motor', 1],
    ['mekanism:creative_bin', 1],
    ['create:creative_crate', 1],
    ['mekanism:creative_fluid_tank', 1],
    ['mekanism:creative_chemical_tank', 1],
    ['create:creative_fluid_tank', 1],
    ['draconicevolution:creative_capacitor', 1],
    ['pneumaticcraft:creative_compressed_iron_block', 1],
    ['jdte:creative_upgrade', 1],
    ['kubejs:tiangong_heart', 4],
    ['kubejs:endless_structure_core', 2],
    ['kubejs:quantum_control_matrix', 4],
    ['kubejs:tiangong_alloy_frame', 8],
    ['avaritia:infinity_ingot', 2],
    ['draconicevolution:chaos_shard', 16],
    ['minecraft:nether_star', 4],
    ['minecraft:ender_eye', 8]
  ], 4, 'sky-craft-creation:endgame/creation_convergence_core')
})
