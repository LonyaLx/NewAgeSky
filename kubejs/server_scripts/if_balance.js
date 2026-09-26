// 天工创世 · Industrial Foregoing 平衡调整。
ServerEvents.recipes(event => {
  // 激光钻头：从简单合成升级为后期终极矿石自动化设备。
  event.remove({ output: 'industrialforegoing:laser_drill' })

  event.shapeless('industrialforegoing:laser_drill', [
    '2x industrialforegoing:machine_frame_advanced',
    'industrialforegoing:fluid_laser_base',
    '8x industrialforegoing:pink_slime',
    '16x industrialforegoing:plastic',
    '8x minecraft:obsidian',
    '2x industrialforegoing:machine_frame_supreme'
  ]).id('sky-craft-creation:if/laser_drill')
})