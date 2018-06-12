////let entities = require('./Entity').entities;

const areas = [{
    name: 'kitchen',
    entities: ['nacho', 'potato', 'pickle', 'chunky monkey', 'watermelone']
}, {
    name: 'coffee shop',
    entities: ['britneypicklespears', 'basic chick']
}];

// // let arena = {
// //     name: 'arena',
// //     entities: []
// // };

// // console.log(entities.length);
// // entities.forEach(entity => {
// //     arena.entities.push(entity.name);
// // });

// // areas.push(arena);

function LookupArea(areaName) {
    for (let index = 0; index < areas.length; index++) {
        const area = areas[index];
        if (area.name === areaName) {
            return area;
        }
    }

    console.log(areaName + ' does not exist');
    return null;
}

exports.areas = areas;
exports.LookupArea = LookupArea;