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
        name: "fish",
        value: 1
    },
    {
        name: "apple",
        value: 1
    },
    {
        name: "mushroom",
        value: 1
    },
    {
        name: "knife",
        value: 1
    },
    {
        name: "stick",
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
        name: "stick",
        value: 1
    },
    {
        name: "stew",
        value: 1
    },
    {
        name: "bamboo",
        value: 1
    },
    {
        name: "egg",
        value: 1
    },
    {
        name: "backpack",
        value: 1
    },
    {
        name: "shoe",
        value: 1
    },
    {
        name: "sword",
        value: 1
    },
    {
        name: "vest",
        value: 1
    },
    {
        name: "hat",
        value: 1
    },
    {
        name: "pie",
        value: 1
    },
    {
        name: "strawberry",
        value: 1
    },
    {
        name: "paper",
        value: 1
    },
    {
        name: "hammer",
        value: 1
    },
    {
        name: "stick",
        value: 1
    },
    {
        name: "candle",
        value: 1
    },
    {
        name: "candy",
        value: 1
    },
    {
        name: "putty",
        value: 1
    },
    {
        name: "chip",
        value: 1
    },
    {
        name: "corn",
        value: 1
    },
    {
        name: "cotton",
        value: 1
    },
    {
        name: "wig",
        value: 1
    },
    {
        name: "lipstick",
        value: 1
    },
    {
        name: "tinder",
        value: 1
    },
    {
        name: "razor",
        value: 1
    },
    {
        name: "kitchen sink",
        value: 1
    },
    {
        name: "coffee",
        value: 1
    },
    {
        name: "covfefe",
        value: 1
    },
    {
        name: "spoon",
        value: 1
    },
    {
        name: "glasses",
        value: 1
    },
    {
        name: "googles",
        value: 1
    },
    {
        name: "gloves",
        value: 1
    },
    {
        name: "watch",
        value: 1
    },
    {
        name: "cake",
        value: 1
    },
    {
        name: "clock",
        value: 1
    },
    {
        name: "string",
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
            messaging.output("You feel a little refreshed.", messaging.msgTypes.itemEffect);

            // if (messaging.canOutput(messaging.msgTypes.itemEffect)) {
            //     console.log('You feel a little refreshed.');
            // }
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

function ThrowItems(entity, itemName, qty)
{
    entity.RemoveItemsFromInventory(itemName,qty);
}

function EatItems(entity, itemName, qty)
{
    entity.RemoveItemsFromInventory(itemName,qty);
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
exports.EatItems = EatItems;
exports.LookupItem = LookupItem;
exports.GetRandomItem = GetRandomItem;
exports.GiveItems = GiveItems;
exports.Trade = Trade;
exports.ThrowItems = ThrowItems;