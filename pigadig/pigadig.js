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
      if (canOutput(msgTypes.itemEffect)) {
        console.log('You feel a little refreshed.');
      }
    }
  }
];

//stuff you can encounter in adventure
const entities = [{
    name: "guineapig",
    hp: 1,
    dropitems: [],
    attacks: [{
      name: "poopy turd",
      damage: 1,
      description: "a basic attack"
    }]
  },
  {
    name: "flower",
    hp: 1,
    dropitems: []
  },
  {
    name: "potato",
    hp: 1,
    dropitems: []
  },
  {
    name: "watermelone",
    hp: 5,
    dropitems: [{
      item: "water",
      qty: 2
    }]
  }
];

const msgTypes = {
  none: 0,
  quest: 1,
  fight: 2,
  attacks: 4,
  itemEffect: 8
};

const outputs = msgTypes.fight | msgTypes.quest; // | msgTypes.attacks | msgTypes.itemEffects;

const canOutput = function (type) {
  return ((outputs & type) === type);
};

class Entity {
  constructor(parameters) {
    this.name = parameters.name;
    this.maxHp = parameters.hp;
    this.hp = parameters.hp;
    this.dropitems = parameters.dropitems || [];
    this.inventory = [];
    this.timeSpent = 0;
    this.attacks = parameters.attacks || [{
      name: "melee",
      damage: 1,
      description: "a basic attack"
    }];
  }

  Attack(entity, attack) {
    if (canOutput(msgTypes.attacks)) {
      console.log(
        this.name + " attacks " + entity.name + " with " + attack.name
      );
    }
    this.timeSpent++;
    entity.TakeDamage(attack);
  }

  DeconstructItem(itemName) {
    console.log("You attempt to break apart " + itemName);
    const item = LookupItem(itemName);

    if (item.dependencies.length > 0) {
      let itemRemoved = this.RemoveItemsFromInventory(itemName, 1);
      if (itemRemoved) {
        item.dependencies.forEach(dependency => {
          GiveItems(this, dependency.item, dependency.qty);
        });

        player.timeSpent += item.craftTime / 2;
        console.log("You are successful and store the parts in your bag.");
      } else {
        console.log(
          "Turns out you didn't have any " +
          itemName +
          " to break apart anyway."
        );
      }
    } else {
      console.log("You try to break it but, nothing happens.");
    }
  }

  HasItems(itemName, qty) {
    let hasItems = false;

    player.inventory.forEach(item => {
      if (item.name === itemName) {
        if (item.qty >= qty) {
          hasItems = true;
        }
      }
    });

    return hasItems;
  }

  MakeItem(itemName) {
    console.log("You set out to make " + itemName);
    const item = LookupItem(itemName);
    let canMakeItem = false;

    // does it have any requirements
    if (item.dependencies != undefined && item.dependencies.length > 0) {
      let missingItems = false;
      // can we meet the requirements
      item.dependencies.forEach(dependency => {
        missingItems |= !this.HasItems(dependency.item, dependency.qty);
      });

      if (!missingItems) {
        item.dependencies.forEach(dependency => {
          this.RemoveItemsFromInventory(dependency.item, dependency.qty);
        });

        canMakeItem = true;
      }
    }

    // We meet the requirements. Make the Item.
    if (canMakeItem) {
      console.log("After a bit of work you make " + item.name);
      this.timeSpent += item.craftTime;
      GiveItems(this, item.name, 1);
    } else {
      console.log(
        "Realizing you don't have the parts you need, you hang your head in shame."
      );
    }
  }

  RemoveItemsFromInventory(itemName, qty) {
    for (let index = 0; index < player.inventory.length; index++) {
      let item = player.inventory[index];
      if (item.name == itemName) {
        if (item.qty >= qty) {
          item.qty -= qty;
          if (item.qty === 0) {
            // that was the last one.
            player.inventory.splice(index, 1);
          }

          return true;
        } else {
          console.log("don't have enough of those.");

          return false;
        }
      }
    }
  }

  SellItem(itemName) {
    const item = LookupItem(itemName);
    if (this.HasItems(itemName, 1)) {
      this.RemoveItemsFromInventory(itemName, 1);
      GiveItems(this, 'coin', item.value);
    }
  }

  BuyItem(itemName) {
    const item = LookupItem(itemName);
    if (this.HasItems('coin', item.value)) {
      this.RemoveItemsFromInventory('coin', item.value);
      GiveItems(this, itemName, 1);
      console.log('You bought a ' + item.name);
    } else {
      console.log('You don\'t have enough coin.');
    }
  }

  TakeDamage(attack) {
    this.hp -= attack.damage;
    if (this.hp <= 0) {
      console.log(this.name + " has died to death.");
    }
  }

  UseItem(itemName) {
    const item = LookupItem(itemName);
    if (this.HasItems(item.name, 1)) {
      console.log("You used " + item.name + ".");
      item.effect(this);
      this.RemoveItemsFromInventory(item.name, 1);
    }
  }
}

let player = new Entity({
  name: "player",
  hp: 10
});

function D20() {
  return Math.floor(Math.random() * 20) + 1;
}

//Adventure activity in which you encounter an object
function FightSomething() {
  let entity = GetRandomEntity();
  console.log("You encounter a", entity.name);
  Fight(entity);

  entity.dropitems.forEach(dropitem => {
    GiveItems(player, dropitem.item, dropitem.qty);
  });
}

function DeliveryQuest() {
  console.log(
    "Nameless NPC needs " + GetRandomItem().name + " to be delivered."
  );

  if (D20() < 5) {
    console.log("The delivery is not as uneventful as you had hoped.");
    FightSomething();
  }

  if (player.hp <= 0) {
    return;
  }

  console.log("You make the delivery and Nameless NPC is grateful.");
}

function WanderAbout() {
  let randomItem = GetRandomItem();
  GiveItems(player, randomItem.name, 1);
  player.timeSpent += 5;
  console.log(
    "You wander aimlessly, but find no adventuring to be had. You did happen to find some " +
    randomItem.name +
    " though."
  );
}

function GetRandomItem() {
  return items[Math.floor(Math.random() * items.length)];
}

function GoAdventuring() {
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      // Kill quest
      FightSomething();
      break;
    case 1:
      // Delivery quest
      DeliveryQuest();
      break;
      // // case 2:
      // //   // Gather quest
      // //   console.log("Nothing needs gathered.");
      // //   break;
      // // case 3:
      // //   // Escort quest
      // //   console.log("Nothing needs escorted.");
      // //   break;
    default:
      WanderAbout();
      break;
  }
}

//returns a random object for the encounter
function GetRandomEntity() {
  return new Entity(entities[Math.floor(Math.random() * entities.length)]);
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


//action taken against an entity in an encounter
function Fight(entity) {
  console.log("You fight the", entity.name);

  while (player.hp > 0 && entity.hp > 0) {
    let playerAttack =
      player.attacks[Math.floor(Math.random() * player.attacks.length)];
    player.Attack(entity, playerAttack);

    if (entity.hp > 0) {
      let entityAttack =
        entity.attacks[Math.floor(Math.random() * entity.attacks.length)];
      entity.Attack(player, entityAttack);
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

  return null;
}

console.log("And here our adventure begins...");

// // while (player.hp > 0) {
// //   while (player.HasItems('hydrogen', 2) && player.HasItems('oxygen', 1)) {
// //     player.MakeItem('water');
// //   }

// //   while (player.hp < player.maxHp && player.HasItems('water', 1)) {
// //     player.UseItem("water");
// //   }

// //   GoAdventuring();
// // }

// // player.SellItem('water');
// // player.BuyItem('hydrogen');
WanderAbout();
DeliveryQuest();
FightSomething();

GiveItems(player,'hydrogen', 2);
GiveItems(player,'oxygen', 1);
player.MakeItem('water');
player.UseItem('water');

GiveItems(player, 'water', 1);
player.DeconstructItem('water');

player.SellItem('hydrogen');

player.BuyItem('oxygen');

console.log("Finished with: \r\n", player);
console.log("Farewell");