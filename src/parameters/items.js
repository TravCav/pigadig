let messaging = require('../messaging');
const items = [
    { name: "apple" },
    { name: "backpack" },
    { name: "bamboo" },
    { name: "bronze ingot",
        craftTime: 1,
        dependencies: [{ item: "copper ore", qty: 1 }, { item: "tin ore", qty: 1 }] 
    },
    { name: "cake" },
    { name: "candle" },
    { name: "candy" },
    { name: "chip" },
    { name: "clock" },
    { name: "coal" },
    { name: "coffee" },
    { name: "coin" },
    { name: "corn" },
    { name: "copper ore" },
    { name: "copper ingot",
        craftTime: 1,
        dependencies: [{ item: "copper ore", qty: 1 }] 
    },
    { name: "cotton" },
    { name: "covfefe" },
    { name: "egg" },
    { name: "feather" },
    { name: "fish" },
    { name: "glasses" },
    { name: "gloves" },
    { name: "googles" },
    { name: "hammer" },
    { name: "hat" },
    { name: "helium" },
    { name: "hydrogen" },
    { name: "iron" },
    { name: "kitchen sink" },
    { name: "knife" },
    {
        name: "leather",
        craftTime: 1,
        dependencies: [{ item: "rawhide", qty: 1 }]
    },
    {
        name: "leather armor",
        craftTime: 1,
        dependencies: [{ item: "leather", qty: 4 }]
    },
    {
        name: "leather boots",
        craftTime: 1,
        dependencies: [{ item: "leather", qty: 2 }]
    },
    {
        name: "leather helmet",
        craftTime: 1,
        dependencies: [{ item: "leather", qty: 1 }]
    },
    {
        name: "leather pants",
        craftTime: 1,
        dependencies: [{ item: "leather", qty: 4 }]
    },
    { name: "lipstick" },
    { name: "milk" },
    { name: "mushroom" },
    { name: "nitrous oxide" },
    { name: "oxygen" },
    { name: "paper" },
    { name: "pie" },
    { name: "putty" },
    { name: "razor" },
    { name: "rawhide" },
    { name: "salt" },
    { name: "shoe" },
    { name: "spoon" },
    { name: "stew" },
    { name: "stick" },
    { name: "stick" },
    { name: "stone" },
    { name: "strawberry" },
    { name: "string" },
    { name: "sword" },
    { name: "tin ore" },
    { name: "tinder" },
    { name: "vest" },
    { name: "vinegar" },
    {
        name: "water",
        craftTime: 10,
        dependencies: [{ item: "hydrogen", qty: 2 }, { item: "oxygen", qty: 1 }],
        effect: function (entity) { entity.hp++; messaging.output("You feel a little refreshed.", messaging.msgTypes.itemEffect); }
    },
    { name: "watch" },
    { name: "wig" },
    { name: "wood" },
];

module.exports.items = items;