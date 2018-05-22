////var Items = require('./items');
const items = [
    { name: 'hydrogen', time: 5, dependencies: [] },
    { name: 'helium', time: 10, dependencies: [] }];

var inventory = [];
var gathering = false;

function FindItem(itemName) {
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        if(item.name === itemName) {
            return item;
        }
    }
}
function DoneGathering(wat) {
    gathering = false;
    console.log(wat);
    return;
}

function GatherItem(itemName) {
    const item = FindItem(itemName);
    console.log('Gathering: ', item.name);
    gathering = true;
    setTimeout(DoneGathering(1), item.time);

    console.log('Done gathering: ', item.name);
}


console.log("And here our adventure begins...");

GatherItem("hydrogen");


console.log("Farewell");