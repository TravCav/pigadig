let messaging = require('../messaging');
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

module.exports.items = items;