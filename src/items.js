let messaging = require('./messaging');

const items = [{
        name: "hydrogen",
        value: 1
    },
    {
        name: "helium",
        value: 1
    },
    {
        name: "oxygen",
        value: 1
    },
    {
        name: "coin",
        value: 1
    },
    {
        name: "vinegar",
        value: 1
    },
    {
        name: "feather",
        value: 1
    },
    {
        name: "stone",
        value: 1
    },
    {
        name: "wood",
        value: 1
    },
    {
        name: "iron",
        value: 1
    },
    {
        name: "salt",
        value: 1
    },
    {
        name: "milk",
        value: 1
    },
    {
        name: "nitrous oxide",
        value: 1
    },
    {
        name: "water",
        craftTime: 10,
        value: 3,
        dependencies: [{
                item: "hydrogen",
                qty: 2
            },
            {
                item: "oxygen",
                qty: 1
            }
        ],
        effect: function (entity) {
            entity.hp++;
            if (messaging.canOutput(messaging.msgTypes.itemEffect)) {
                console.log('You feel a little refreshed.');
            }
        }
    }
];


function GetRandomItem() {
    return items[Math.floor(Math.random() * items.length)];
}


function GiveItems(entity, itemName, qty) {
    const newItem = LookupItem(itemName);
    let alreadyHave = false;
    entity.inventory.forEach(item => {
        if (item.name == newItem.name) {
            item.qty += qty;
            alreadyHave = true;
        }
    });

    if (!alreadyHave) {
        entity.inventory.push({
            name: newItem.name,
            qty: qty
        });
    }
}


function LookupItem(itemName) {
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        if (item.name === itemName) {
            return item;
        }
    }

    console.log(itemName + ' does not exist');
    return null;
}

function Trade(entity1, trade1, entity2, trade2) {
    // trade = [{ item: 'item', qty: qty }]
    trade1.forEach(trade => {
        if (entity1.HasItems(trade.item, trade.qty)) {
            GiveItems(entity2, trade.item, trade.qty);
            entity1.RemoveItemsFromInventory(trade.item, trade.qty);
        }
    });

    trade2.forEach(trade => {
        if (entity2.HasItems(trade.item, trade.qty)) {
            GiveItems(entity1, trade.item, trade.qty);
            entity2.RemoveItemsFromInventory(trade.item, trade.qty);
        }
    });
}

exports.items = items;
exports.LookupItem = LookupItem;
exports.GetRandomItem = GetRandomItem;
exports.GiveItems = GiveItems;
exports.Trade = Trade;