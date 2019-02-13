let messaging = require('../messaging');
const items = [
    { name: "apple", edible: true },
    { name: "backpack" },
    { name: "bamboo" },
    { name: "bronze ingot",
        craftTime: 1,
        dependencies: [{ item: "copper ore", qty: 1 }, { item: "tin ore", qty: 1 }] 
    },
    { name: "cake", edible: true  },
    { name: "candle" },
    { name: "candy", edible: true  },
    { name: "chocolate chip", edible: true  },
    { name: "clock" },
    { name: "coal" },
    { name: "coffee", drinkable: true, energy: 1 },
    { name: "coin" },
    { name: "corn", edible: true  },
    { name: "copper ore" },
    { name: "copper ingot",
        craftTime: 1,
        dependencies: [{ item: "copper ore", qty: 1 }] 
    },
    { name: "cotton" },
    {
        name: "cloth",
        craftTime: 1,
        dependencies: [{ item: "cotton", qty: 2 }]
    },
    {
        name: "cotton shirt",
        craftTime: 1,
        dependencies: [{ item: "cloth", qty: 2 }]
    },
    { name: "covfefe" },
    { name: "egg", edible: true  },
    { name: "feather" },
    { name: "fish", edible: true  },
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
    { name: "milk", drinkable: true },
    { name: "mushroom", edible: true  },
    { name: "nitrous oxide" },
    { name: "oxygen" },
    { name: "paper" },
    { name: "pie", edible: true  },
    { name: "putty" },
    { name: "razor" },
    { name: "rawhide" },
    { name: "salt" },
    { name: "shoe" },
    { name: "spoon" },
    { name: "stew", edible: true  },
    { name: "stick" },
    { name: "stone" },
    { name: "strawberry", edible: true  },
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
        drinkable: true,
        effect: function (entity) { entity.hp++; messaging.output("You feel a little refreshed.", messaging.msgTypes.itemEffect); }
    },
    { name: "watch" },
    { name: "wig" },
    { name: "wood" },
    {
        name: "wooden shield",
        craftTime: 1,
        dependencies: [{ item: "wood", qty: 2 }]
    },
    {
        name: "wooden sword",
        craftTime: 1,
        dependencies: [{ item: "wood", qty: 1 }]
    },
    { name: "wool" },
    {
        name: "wool cloth",
        craftTime: 1,
        dependencies: [{ item: "wool", qty: 1 }]
    },
    {
        name: "wool coat",
        craftTime: 1,
        dependencies: [{ item: "wool cloth", qty: 5 }]
    },
];

module.exports.items = items;