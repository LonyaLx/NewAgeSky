// 天工创世 · 物流传输难度适中调整。
ServerEvents.recipes(event => {
  const tableSize = { 3: 7 }

  function tableRecipe(output, ingredients, tier, recipeId) {
    const size = tableSize[tier]
    const total = ingredients.reduce((sum, entry) => sum + entry[1], 0)
    if (total > size * size) {
      throw new Error(`Logistics recipe ${recipeId} uses ${total} items, max is ${size * size}`)
    }
    const grid = new Array(size * size).fill(' ')
    const key = {}
    let slot = 0
    ingredients.forEach((entry, index) => {
      const symbol = String.fromCharCode(65 + index)
      key[symbol] = { item: entry[0] }
      for (let count = 0; count < entry[1]; count++) grid[slot++] = symbol
    })
    const pattern = []
    for (let row = 0; row < size; row++) pattern.push(grid.slice(row * size, row * size + size).join(''))
    event.custom({
      type: 'avaritia:shaped_table',
      pattern: pattern,
      key: key,
      result: { id: output, count: 1 },
      tier: tier
    }).id(recipeId)
  }

  event.remove({ output: 'avaritia:tesseract' })
  tableRecipe('avaritia:tesseract', [
    ['minecraft:ender_pearl', 4],
    ['advanced_ae:quantum_core', 1],
    ['mekanism:ultimate_control_circuit', 2],
    ['ae2:interface', 2],
    ['draconicevolution:draconium_ingot', 2]
  ], 3, 'sky-craft-creation:logistics/tesseract')

  event.remove({ id: 'fluxnetworks:flux_core' })
  event.shaped('4x fluxnetworks:flux_core', [
    'fef',
    'oco',
    'fef'
  ], {
    f: 'fluxnetworks:flux_dust',
    e: 'minecraft:ender_eye',
    o: 'minecraft:obsidian',
    c: 'mekanism:advanced_control_circuit'
  }).id('sky-craft-creation:logistics/flux_core')

  event.remove({ id: 'entangled:block' })
  event.shaped('entangled:block', [
    'ABA',
    'RCR',
    'ABA'
  ], {
    A: 'minecraft:ender_pearl',
    B: 'minecraft:obsidian',
    R: 'minecraft:redstone',
    C: 'minecraft:chest'
  }).id('sky-craft-creation:logistics/entangled_block')
})
