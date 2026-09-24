ServerEvents.recipes(event => {
    const gates = {
        '256k': {
            circuit: 'mekanism:advanced_control_circuit',
            alloy: 'enderio:conductive_alloy_ingot'
        },
        '1m': {
            circuit: 'mekanism:elite_control_circuit',
            alloy: 'enderio:energetic_alloy_ingot'
        },
        '4m': {
            circuit: 'mekanism:ultimate_control_circuit',
            alloy: 'enderio:vibrant_alloy_ingot'
        },
        '16m': {
            circuit: 'mekanism_extras:absolute_control_circuit',
            alloy: 'enderio_evolution:crystalline_alloy_ingot'
        },
        '64m': {
            circuit: 'mekanism_extras:supreme_control_circuit',
            alloy: 'enderio_evolution:crystalline_pink_slime_ingot'
        },
        '256m': {
            circuit: 'mekanism_extras:infinite_control_circuit',
            alloy: 'enderio_evolution:stellar_alloy_ingot'
        }
    }

    const components = [
        { output: 'ae2:cell_component_256k', previous: 'ae2:cell_component_64k', processor: 'ae2:calculation_processor', tier: '256k' },

        { output: 'megacells:cell_component_1m', previous: 'ae2:cell_component_256k', processor: 'megacells:accumulation_processor', tier: '1m' },
        { output: 'megacells:cell_component_4m', previous: 'megacells:cell_component_1m', processor: 'megacells:accumulation_processor', tier: '4m' },
        { output: 'megacells:cell_component_16m', previous: 'megacells:cell_component_4m', processor: 'megacells:accumulation_processor', tier: '16m' },
        { output: 'megacells:cell_component_64m', previous: 'megacells:cell_component_16m', processor: 'megacells:accumulation_processor', tier: '64m' },
        { output: 'megacells:cell_component_256m', previous: 'megacells:cell_component_64m', processor: 'megacells:accumulation_processor', tier: '256m' },

        { output: 'ae2additions:cell_component_1024', previous: 'ae2:cell_component_256k', processor: 'ae2:engineering_processor', tier: '1m' },
        { output: 'ae2additions:cell_component_4096', previous: 'ae2additions:cell_component_1024', processor: 'ae2:engineering_processor', tier: '4m' },
        { output: 'ae2additions:cell_component_16384', previous: 'ae2additions:cell_component_4096', processor: 'ae2:engineering_processor', tier: '16m' },
        { output: 'ae2additions:cell_component_65536', previous: 'ae2additions:cell_component_16384', processor: 'ae2:engineering_processor', tier: '64m' },

        { output: 'ae2additions:super_cell_component_256k', previous: 'ae2:cell_component_256k', processor: 'ae2:engineering_processor', tier: '256k' },
        { output: 'ae2additions:super_cell_component_1024k', previous: 'ae2additions:cell_component_1024', processor: 'ae2:engineering_processor', tier: '1m' },
        { output: 'ae2additions:super_cell_component_4096k', previous: 'ae2additions:cell_component_4096', processor: 'ae2:engineering_processor', tier: '4m' },
        { output: 'ae2additions:super_cell_component_16m', previous: 'ae2additions:cell_component_16384', processor: 'ae2:engineering_processor', tier: '16m' },
        { output: 'ae2additions:super_cell_component_65m', previous: 'ae2additions:cell_component_65536', processor: 'ae2:engineering_processor', tier: '64m' },

        { output: 'enderdrives:ender_storage_component_256k', previous: 'ae2:cell_component_64k', processor: 'ae2:engineering_processor', tier: '256k' },

        { output: 'advanced_ae:quantum_storage_component', previous: 'megacells:cell_component_16m', processor: 'advanced_ae:quantum_processor', tier: '64m' },
        { output: 'bigger_ae2:quantum_cell_component', previous: 'megacells:cell_component_16m', processor: 'advanced_ae:quantum_processor', tier: '64m' },
        { output: 'bigger_ae2:digital_singularity_cell_component', previous: 'bigger_ae2:quantum_cell_component', processor: 'advanced_ae:quantum_processor', tier: '256m' }
    ]

    const omniFamilies = [
        { prefix: 'omni', processor: 'ae2omnicells:omni_link_processor' },
        { prefix: 'complex_omni', processor: 'ae2omnicells:complex_link_processor' },
        { prefix: 'quantum_omni', processor: 'ae2omnicells:multidimensional_expansion_processor' }
    ]
    const omniTiers = [
        { size: '256k', previous: '64k', tier: '256k' },
        { size: '1m', previous: '256k', tier: '1m' },
        { size: '4m', previous: '1m', tier: '4m' },
        { size: '16m', previous: '4m', tier: '16m' },
        { size: '64m', previous: '16m', tier: '64m' },
        { size: '256m', previous: '64m', tier: '256m' }
    ]

    omniFamilies.forEach(family => {
        omniTiers.forEach(tier => {
            components.push({
                output: 'ae2omnicells:' + family.prefix + '_cell_component_' + tier.size,
                previous: 'ae2omnicells:' + family.prefix + '_cell_component_' + tier.previous,
                processor: family.processor,
                tier: tier.tier
            })
        })
    })

    components.forEach(component => {
        const gate = gates[component.tier]
        event.remove({ output: component.output })
        event.shaped(component.output, [
            'ABA',
            'CCC',
            'ADA'
        ], {
            A: gate.alloy,
            B: component.processor,
            C: component.previous,
            D: gate.circuit
        })
    })
})