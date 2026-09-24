// 天工创世 · 无尽工具与装备跨模组化。
// 保留 Re-Avaritia 原有 9x9 主配方，只在空槽加入各科技线终局材料。
ServerEvents.recipes(event => {
  function infinityRecipe(output, basePattern, baseKey, extraKey, placements, recipeId) {
    const rows = basePattern.map(row => row.split(''))
    placements.forEach(entry => {
      const [row, column, symbol] = entry
      if (rows[row][column] !== ' ') {
        throw new Error(`Infinity recipe ${recipeId} slot ${row},${column} is not empty`)
      }
      rows[row][column] = symbol
    })

    event.custom({
      type: 'avaritia:shaped_table',
      pattern: rows.map(row => row.join('')),
      key: Object.assign({}, baseKey, extraKey),
      result: { id: output, count: 1 },
      tier: 4
    }).id(recipeId)
  }

  ;[
    'avaritia:infinity_helmet',
    'avaritia:infinity_chestplate',
    'avaritia:infinity_pants',
    'avaritia:infinity_boots',
    'avaritia:infinity_sword',
    'avaritia:infinity_pickaxe',
    'avaritia:infinity_shovel'
  ].forEach(id => event.remove({ output: id }))

  infinityRecipe('avaritia:infinity_helmet', [
    '  NNNNN  ',
    ' NIIIIIN ',
    ' N XIX N ',
    ' NIIIIIN ',
    ' NIIIIIN ',
    ' NI I IN ',
    '         ',
    '         ',
    '         '
  ], {
    I: { item: 'avaritia:infinity_ingot' },
    N: { item: 'avaritia:neutron_ingot' },
    X: { item: 'avaritia:infinity_catalyst' }
  }, {
    Q: { item: 'advanced_ae:quantum_core' },
    A: { item: 'draconicevolution:awakened_core' }
  }, [
    [6, 3, 'Q'],
    [6, 5, 'A']
  ], 'sky-craft-creation:infinity_gear/helmet')

  infinityRecipe('avaritia:infinity_chestplate', [
    ' NN   NN ',
    'NNN   NNN',
    'NNN   NNN',
    ' NIIIIIN ',
    ' NIIXIIN ',
    ' NIIIIIN ',
    ' NIIIIIN ',
    ' NIIIIIN ',
    '  NNNNN  '
  ], {
    I: { item: 'avaritia:infinity_ingot' },
    N: { item: 'avaritia:neutron_ingot' },
    X: { item: 'avaritia:crystal_matrix' }
  }, {
    A: { item: 'draconicevolution:awakened_draconium_block' },
    U: { item: 'extendedcrafting:the_ultimate_ingot' }
  }, [
    [0, 3, 'A'],
    [0, 4, 'U'],
    [0, 5, 'A'],
    [1, 3, 'A'],
    [1, 4, 'U'],
    [1, 5, 'A']
  ], 'sky-craft-creation:infinity_gear/chestplate')

  infinityRecipe('avaritia:infinity_pants', [
    'NNNNNNNNN',
    'NIIIXIIIN',
    'NINNXNNIN',
    'NIN   NIN',
    'NCN   NCN',
    'NIN   NIN',
    'NIN   NIN',
    'NIN   NIN',
    'NNN   NNN'
  ], {
    C: { item: 'avaritia:crystal_matrix_ingot' },
    I: { item: 'avaritia:infinity_ingot' },
    N: { item: 'avaritia:neutron_ingot' },
    X: { item: 'avaritia:infinity_catalyst' }
  }, {
    M: { item: 'mekanism:teleporter_frame' },
    V: { item: 'enderio:vibrant_alloy_block' }
  }, [
    [3, 4, 'M'],
    [4, 4, 'V']
  ], 'sky-craft-creation:infinity_gear/pants')

  infinityRecipe('avaritia:infinity_boots', [
    ' NNN NNN ',
    ' NIN NIN ',
    ' NIN NIN ',
    'NNIN NINN',
    'NIIN NIIN',
    'NNNN NNNN'
  ], {
    I: { item: 'avaritia:infinity_ingot' },
    N: { item: 'avaritia:neutron_ingot' }
  }, {
    P: { item: 'pneumaticcraft:compressed_iron_block' },
    T: { item: 'mekanism:ultimate_pressurized_tube' }
  }, [
    [0, 4, 'T'],
    [1, 4, 'P'],
    [2, 4, 'P'],
    [3, 4, 'P'],
    [4, 4, 'P']
  ], 'sky-craft-creation:infinity_gear/boots')

  infinityRecipe('avaritia:infinity_sword', [
    '       II',
    '      III',
    '     III ',
    '  C III  ',
    'CCAIII   ',
    ' CAXI    ',
    '  NAAC   ',
    ' N CC    ',
    'A   C    '
  ], {
    A: { item: 'avaritia:crystal_matrix' },
    C: { item: 'avaritia:crystal_matrix_ingot' },
    I: { item: 'avaritia:infinity_ingot' },
    N: { item: 'avaritia:neutron_ingot' },
    X: { item: 'avaritia:infinity_catalyst' }
  }, {
    Q: { item: 'draconicevolution:chaos_shard' },
    T: { item: 'justdirethings:time_crystal_block' }
  }, [
    [0, 0, 'Q'],
    [0, 1, 'Q'],
    [0, 2, 'Q'],
    [0, 3, 'Q'],
    [0, 4, 'T'],
    [0, 5, 'T'],
    [0, 6, 'T'],
    [1, 0, 'T']
  ], 'sky-craft-creation:infinity_gear/sword')

  infinityRecipe('avaritia:infinity_pickaxe', [
    ' IIIIII B',
    '    IIAA ',
    '     AXAI',
    '     AAII',
    '    N  II',
    '   N    I',
    '  N     I',
    ' N      I',
    'A        '
  ], {
    A: { item: 'avaritia:crystal_matrix' },
    B: { item: 'avaritia:neutron' },
    I: { item: 'avaritia:infinity_ingot' },
    N: { item: 'avaritia:neutron_ingot' },
    X: { item: 'avaritia:infinity_catalyst' }
  }, {
    Q: { item: 'mekanism:ultimate_control_circuit' },
    P: { item: 'create:precision_mechanism' }
  }, [
    [0, 0, 'Q'],
    [0, 7, 'Q'],
    [1, 0, 'Q'],
    [1, 1, 'Q'],
    [1, 2, 'P'],
    [1, 3, 'P'],
    [1, 8, 'P'],
    [2, 0, 'P'],
    [2, 1, 'P'],
    [2, 2, 'P'],
    [2, 3, 'P'],
    [2, 4, 'P']
  ], 'sky-craft-creation:infinity_gear/pickaxe')

  infinityRecipe('avaritia:infinity_shovel', [
    '      III',
    '     IIII',
    '    CIIII',
    '    ACII ',
    '   AXAC  ',
    '   NA    ',
    '  N      ',
    ' N       ',
    'A        '
  ], {
    A: { item: 'avaritia:crystal_matrix' },
    C: { item: 'avaritia:crystal_matrix_ingot' },
    I: { item: 'avaritia:infinity_ingot' },
    N: { item: 'avaritia:neutron_ingot' },
    X: { item: 'avaritia:infinity_catalyst' }
  }, {
    H: { item: 'kubejs:tiangong_heart' },
    Z: { item: 'avaritia:neutron' }
  }, [
    [0, 0, 'H'],
    [0, 1, 'Z'],
    [0, 2, 'Z'],
    [0, 3, 'Z'],
    [0, 4, 'Z'],
    [0, 5, 'Z'],
    [1, 0, 'Z'],
    [1, 1, 'Z'],
    [1, 2, 'Z'],
    [1, 3, 'Z'],
    [1, 4, 'Z'],
    [2, 0, 'Z'],
    [2, 1, 'Z'],
    [2, 2, 'Z'],
    [2, 3, 'Z'],
    [3, 0, 'Z'],
    [3, 1, 'Z']
  ], 'sky-craft-creation:infinity_gear/shovel')
})
