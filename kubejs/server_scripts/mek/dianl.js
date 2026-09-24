ServerEvents.recipes(event => {
//
    event.remove({ output: 'mekanism:advanced_control_circuit' });
    event.remove({ output: 'mekanism:elite_control_circuit' });
    event.remove({ output: 'mekanism:ultimate_control_circuit' });
//
    event.remove({ output: 'mekanism_extras:absolute_control_circuit' });
    event.remove({ output: 'mekanism_extras:supreme_control_circuit' });
    event.remove({ output: 'mekanism_extras:cosmic_control_circuit' });
    event.remove({ output: 'mekanism_extras:infinite_control_circuit' });
//
    event.shaped('mekanism:advanced_control_circuit', [
        ' A ',
        'BCB',
        ' A '
    ], {
        A: 'enderio:conductive_alloy_ingot',
        B: 'mekanism:alloy_infused',
        C: 'mekanism:basic_control_circuit'
    });
    event.shaped('mekanism:elite_control_circuit', [
        ' A ',
        'BCB',
        ' A '
    ], {
        A: 'enderio:energetic_alloy_ingot',
        B: 'mekanism:alloy_reinforced',
        C: 'mekanism:advanced_control_circuit'
    });
    event.shaped('mekanism:ultimate_control_circuit', [
        ' A ',
        'BCB',
        ' A '
    ], {
        A: 'enderio:vibrant_alloy_ingot',
        B: 'mekanism:alloy_atomic',
        C: 'mekanism:elite_control_circuit'
    });
//
event.shaped('mekanism_extras:absolute_control_circuit', [
        ' A ',
        'BCB',
        ' A '
    ], {
        A: 'enderio_evolution:crystalline_alloy_ingot',
        B: 'mekanism_extras:alloy_radiance',
        C: 'mekanism:ultimate_control_circuit'
    });
event.shaped('mekanism_extras:supreme_control_circuit', [
        ' A ',
        'BCB',
        ' A '
    ], {
        A: 'enderio_evolution:crystalline_pink_slime_ingot',
        B: 'mekanism_extras:alloy_thermonuclear',
        C: 'mekanism_extras:absolute_control_circuit'
    });
event.shaped('mekanism_extras:cosmic_control_circuit', [
        ' A ',
        'BCB',
        ' A '
    ], {
        A: 'enderio_evolution:melodic_alloy_ingot',
        B: 'mekanism_extras:alloy_shining',
        C: 'mekanism_extras:supreme_control_circuit'
    });
event.shaped('mekanism_extras:infinite_control_circuit', [
        ' A ',
        'BCB',
        ' A '
    ], {
        A: 'enderio_evolution:stellar_alloy_ingot',
        B: 'mekanism_extras:alloy_spectrum',
        C: 'mekanism_extras:cosmic_control_circuit'
    });





});