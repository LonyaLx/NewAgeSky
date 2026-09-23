// 天工创世 · 空岛锻造模板来源。
// 原版 17 个模板通常只从结构获取；这里提供统一的有序首件配方。
ServerEvents.recipes(event => {
  event.shaped('4x kubejs:smithing_template_blank', [
    'IDI',
    'DOD',
    'IDI'
  ], {
    I: 'minecraft:iron_ingot',
    D: 'minecraft:diamond',
    O: 'minecraft:obsidian'
  }).id('newagesky:smithing_templates/blank')

  const templates = [
    'minecraft:netherite_upgrade_smithing_template',
    'minecraft:coast_armor_trim_smithing_template',
    'minecraft:dune_armor_trim_smithing_template',
    'minecraft:eye_armor_trim_smithing_template',
    'minecraft:host_armor_trim_smithing_template',
    'minecraft:raiser_armor_trim_smithing_template',
    'minecraft:rib_armor_trim_smithing_template',
    'minecraft:sentry_armor_trim_smithing_template',
    'minecraft:shaper_armor_trim_smithing_template',
    'minecraft:silence_armor_trim_smithing_template',
    'minecraft:snout_armor_trim_smithing_template',
    'minecraft:spire_armor_trim_smithing_template',
    'minecraft:tide_armor_trim_smithing_template',
    'minecraft:vex_armor_trim_smithing_template',
    'minecraft:ward_armor_trim_smithing_template',
    'minecraft:wayfinder_armor_trim_smithing_template',
    'minecraft:wild_armor_trim_smithing_template'
  ]

  templates.forEach(id => {
    const name = id.replace('minecraft:', '').replace('_smithing_template', '')
    event.shaped(id, [
      'DTD',
      'TBT',
      'DTD'
    ], {
      D: 'minecraft:diamond',
      T: 'minecraft:gold_ingot',
      B: 'kubejs:smithing_template_blank'
    }).id('newagesky:smithing_templates/' + name)
  })
})