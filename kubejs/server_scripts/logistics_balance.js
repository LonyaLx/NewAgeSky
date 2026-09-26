// 天工创世 · 物流传输难度适中调整。
ServerEvents.recipes(event => {
  const tableSize = { 3: 7 }

  function tableRecipe(output, ingredients, tier, recipeId) {
    const size = tableSize[tier]
    const total = ingredients.reduce((sum, entry) => sum + entry[1], 0)
    if (total > size * size) {
      throw new Error(`Logistics recipe ${recipeId} uses ${total} items, max is ${size * size}`)
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
