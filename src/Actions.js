let Items = require('./items');
let messaging = require('./messaging');
let Entity = require('./Entity');
let Areas = require('./Areas');

const action = [{
        name: "use"
    },
    {
        name: "combine"
    },
    {
        name: "eat"
    },
    {
        name: "discard"
    },
    {
        name: "give"
    },
    {
        name: "steal"
    },
    {
        name: "cook"
    },
    {
        name: "throw"
    },
    {
        name: "sell"
    },
    {
        name: "trade"
    },
    {
        name: "drink"
    },
    {
        name: "equip"
    },
    {
        name: "drink"
    },
];



function D20() {
    return Math.floor(Math.random() * 20) + 1;
}

//action taken against an entity in an encounter
function Fight(entity1, entity2) {
    console.log("You fight the", entity2.name);

    while (entity1.hp > 0 && entity2.hp > 0) {
        let entity1Attack =
            entity1.attacks[Math.floor(Math.random() * entity1.attacks.length)];
        entity1.Attack(entity2, entity1Attack);

        if (entity2.hp > 0) {
            let entity2Attack =
                entity2.attacks[Math.floor(Math.random() * entity2.attacks.length)];
            entity2.Attack(entity1, entity2Attack);
        }
    }

    if (entity1.hp > 0) {
        entity1.Loot(entity2);
    } else {
        entity2.Loot(entity1);
    }
}

//Adventure activity in which you encounter an object
function FightSomething(entity, areaName) {
    let entityToFight = Entity.GetRandomEntity(areaName);
    if (entityToFight==null){
        return false;
    }

    console.log("You encounter a", entityToFight.name);
    Fight(entity, entityToFight);

    return true;
}

//Adventure activity in which you encounter an object
function DeliveryQuest(entity) {
    console.log(
        "Nameless NPC needs " + Items.GetRandomItem().name + " to be delivered."
    );

    if (D20() < 5) {
        console.log("The delivery is not as uneventful as you had hoped.");
        FightSomething(entity);
    }

    if (entity.hp <= 0) {
        return;
    }

    console.log("You make the delivery and Nameless NPC is grateful.");
}

function WanderAbout(entity) {
    let randomItem = Items.GetRandomItem();
    Items.GiveItems(entity, randomItem.name, 1);
    entity.timeSpent += 5;
    console.log(
        "You wander aimlessly, but find no adventuring to be had. You did happen to find some " +
        randomItem.name +
        " though."
    );
}


exports.D20 = D20;
exports.DeliveryQuest = DeliveryQuest;
exports.Fight = Fight;
exports.FightSomething = FightSomething;
exports.WanderAbout = WanderAbout;