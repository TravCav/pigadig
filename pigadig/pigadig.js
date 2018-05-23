const items = [{
        name: 'hydrogen',
        time: 1,
        dependencies: []
    },
    {
        name: 'helium',
        time: 1,
        dependencies: []
    },
    {
        name: 'oxygen',
        time: 1,
        dependencies: []
    },
    {
        name: 'water',
        time: 10,
        dependencies: [{
            item: "hydrogen",
            qty: 2
        }, {
            item: "oxygen",
            qty: 1
        }]
    },

];

var inventory = [];
var gathering = false;
var timeSpent = 0;

function AddToInventory(newItem) {
    let alreadyHave = false;
    inventory.forEach(item => {
        if (item.name == newItem.name) {
            item.qty++;
            alreadyHave = true;
        }
    });

    if (!alreadyHave) {
        inventory.push({
            name: newItem.name,
            qty: 1
        });
    }
}

function RemoveDependencyFromInventory(dependency) {
    ////console.log("remove: ", dependency);
    for (let index = 0; index < inventory.length; index++) {
        let item = inventory[index];
        if (item.name == dependency.item) {
            if (item.qty >= dependency.qty) {
                item.qty -= dependency.qty;
                if (item.qty === 0) {
                    // that was the last one.
                    inventory.splice(index, 1);
                }
            } else {
                console.log("don't have enough of those.");
            }
        }
    }
}

function LookupItem(itemName) {
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        if (item.name === itemName) {
            return item;
        }
    }
}

function MakeItem(itemName) {
    const item = LookupItem(itemName);
    let canMakeItem = false;

    // does it have any requirements
    if (item.dependencies.length === 0) {
        canMakeItem = true;
    } else {
        let missingItems = false;
        // can we meet the requirements
        item.dependencies.forEach(dependency => {
            missingItems |= !HaveEnough(dependency);
        });

        ////console.log("Has All Items: ", !missingItems);
        if (!missingItems) {
            item.dependencies.forEach(dependency => {
                RemoveDependencyFromInventory(dependency);
            });

            canMakeItem = true;
        }
    }

    // We meet the requirements. Make the Item.
    if (canMakeItem) {
        ////console.log('Making: ', item.name);
        timeSpent += item.time;
        AddToInventory(item);
    }
}

function HaveEnough(dependency) {
    ////console.log("checking for: ", dependency);
    let haveEnough = false;

    inventory.forEach(item => {
        ////console.log(item.name, dependency.item);
        if (item.name === dependency.item) {
            ////console.log("has " + item.qty + " " + item.name);
            if (item.qty < dependency.qty) {
                console.log("need " + (dependency.qty - item.qty) + " more " + dependency.item);
            } else {
                haveEnough = true;
            }
        }
    });

    return haveEnough;
}

console.log("And here our adventure begins...");

MakeItem("hydrogen");
MakeItem("hydrogen");
MakeItem("oxygen");
MakeItem("water");

console.log("Finished with: \r\n", inventory);
console.log("Time Spent: ", timeSpent);
console.log("Farewell");