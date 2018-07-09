let Items = require('./items');
let messaging = require('./messaging');
let Areas = require('./Areas');

//stuff you can encounter in adventure
let entities = [{
    name: "basic chick",
    hp: 1,
    dropitems: [{
      item: "coffee",
      qty: 1
    }],
    attacks: [{
      name: "omg cant event",
      damage: 0.01,
      description: "special attack"
    }]
  },
  {
    name: "britneypicklespears",
    hp: 5,
    dropitems: [{
      item: "vinegar",
      qty: 1
    }],
    attacks: [{
      name: "hit your baby one more time",
      damage: 0.01,
      description: "basic attack"
    }]
  },
  {
    name: "canada geese",
    hp: 2,
    dropitems: [{
      item: "feather",
      qty: 1
    }],
    attacks: [{
      name: "noisy gaggle",
      damage: 0.01,
      description: "a basic attack"
    }]
  },
  {
    name: "cheap skate",
    hp: 12,
    dropitems: [{
      item: "stone",
      qty: 1
    }],
    attacks: [{
      name: "penny pinch",
      damage: 0.01,
      description: "a basic attack"
    }]
  },
  {
    name: "cheshire cat",
    hp: 1,
    dropitems: [{
      item: "wood",
      qty: 1
    }],
    attacks: [{
      name: "hatted hairball",
      damage: 0.01,
      description: "basic attack"
    }]
  },
  {
    name: "chunky monkey",
    hp: 6,
    dropitems: [{
      item: "milk",
      qty: 1
    }],
    attacks: [{
      name: "dairy devil spin",
      damage: 0.02,
      description: "intermediate attack"
    }]
  },
  {
    name: "demigorgon",
    hp: 6,
    dropitems: [{
      item: "helium",
      qty: 1
    }],
    attacks: [{
      name: "medusa stoning",
      damage: 0.01,
      description: "special attack"
    }]
  },
  {
    name: "flea",
    hp: 1,
    dropitems: [{
      item: "salt",
      qty: 1
    }],
    attacks: [{
      name: "itchy bite",
      damage: 0.01,
      description: "a basic attack"
    }]
  },
  {
    name: "flower",
    dropitems: [{
      item: "oxygen",
      qty: 1
    }],
    attacks: [{
      name: "pollination",
      damage: 0.01,
      description: "a basic attack"
    }]
  },
  {
    name: "grumpy narwhal",
    hp: 10,
    dropitems: [{
      item: "water",
      qty: 3
    }],
    attacks: [{
      name: "pokey splash",
      damage: 0.01,
      description: "a basic attack"
    }]
  },
  {
    name: "guineapig",
    attacks: [{
      name: "poopy turd",
      damage: 0.01,
      description: "a basic attack"
    }]
  },
  {
    name: "mariah carried",
    hp: 4,
    dropitems: [{
      item: "covfefe",
      qty: 1
    }],
    attacks: [{
      name: "pterodactyl screech",
      damage: 0.01,
      description: "basic attack"
    }]
  },
  {
    name: "nacho",
    hp: 4,
    dropitems: [{
      item: "coin",
      qty: 1
    }],
    attacks: [{
      name: "cheesy lava",
      damage: 0.02,
      description: "intermediate attack"
    }]
  },
  {
    name: "olaf",
    hp: 4,
    dropitems: [{
      item: "water",
      qty: 1
    }],
    attacks: [{
      name: "cold shoulder",
      damage: 0.01,
      description: "a basic attack"
    }]
  },
  {
    name: "overwatch community",
    hp: 6,
    dropitems: [{
      item: "salt",
      qty: 1
    }],
    attacks: [{
      name: "poser mentality",
      damage: 0.02,
      description: "intermediate attack"
    }]
  },
  {
    name: "pickle",
    hp: 1,
    dropitems: [{
      item: "vinegar",
      qty: 1
    }],
    attacks: [{
      name: "acidic spit",
      damage: 0.01,
      description: "a basic attack"
    }]
  },
  {
    name: "potato"
  },
  {
    name: "slipper",
    hp: 3,
    dropitems: [{
      item: "wood",
      qty: 1
    }],
    attacks: [{
      name: "slipper slap",
      damage: 0.01,
      description: "a basic attack"
    }]
  },
  {
    name: "punintended",
    hp: 4,
    dropitems: [{
      item: "nitrous oxide",
      qty: 1
    }],
    attacks: [{
      name: "double entendre",
      damage: 0.02,
      description: "intermediate attack"
    }]
  },
  {
    name: "raccoon",
    hp: 7,
    dropitems: [{
      item: "wood",
      qty: 2
    }],
    attacks: [{
      name: "rabid scratch",
      damage: 0.02,
      description: "a basic attack"
    }]
  },
  {
    name: "violent evergarden",
    hp: 9,
    dropitems: [{
      item: "iron",
      qty: 3
    }],
    attacks: [{
      name: "scathing truth bomb",
      damage: 0.02,
      description: "intermediate attack"
    }]
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



class Entity {
  constructor(parameters) {
    this.name = parameters.name;
    this.maxHp = parameters.hp || 1;
    this.hp = parameters.hp || 1;
    this.str = parameters.str || 1;
    this.dropitems = parameters.dropitems || [];
    this.inventory = [];
    this.equipment = [];
    this.timeSpent = 0;
    this.attacks = parameters.attacks || [{
      name: "melee",
      damage: 0.01,
      description: "a basic attack"
    }];
  }

  Attack(entity, attack) {
    let dmg = attack.damage + this.str;
    messaging.attacks(this.name + " attacks " + entity.name + " with " + attack.name + " for " + dmg + " damage.");

    this.timeSpent++;
    entity.TakeDamage(dmg);
    this.str += 0.01;
  }

  DeconstructItem(itemName) {
    messaging.itemActions("You attempt to break apart " + itemName);
    const item = Items.LookupItem(itemName);

    if (item.dependencies.length > 0) {
      let itemRemoved = this.RemoveItemsFromInventory(itemName, 1);
      if (itemRemoved) {
        item.dependencies.forEach(dependency => {
          Items.GiveItems(this, dependency.item, dependency.qty);
        });

        this.timeSpent += item.craftTime / 2;
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

  Equip(itemName, equipPlace) {
    if (this.HasItems(itemName, 1)) {
      const item = Items.LookupItem(itemName);
      this.equipment.push({
        location: equipPlace,
        item: item
      });
      this.RemoveItemsFromInventory(itemName, 1);
      return true;
    }

    return false;
  }

  HasItems(itemName, qty) {
    const item = Items.LookupItem(itemName);

    if (item === null) {
      return false;
    }

    let hasItems = false;
    let hasEnough = false;

    this.inventory.forEach(playerItem => {
      if (playerItem.name === itemName) {
        if (playerItem.qty >= qty) {
          hasItems = true;
          hasEnough = true;
        }
      }
    });

    if (!hasItems) {
      Items.GiveItems(this, itemName, 0);
    }

    if (!hasEnough) {
      console.log(this.name + ' does not have enough ' + itemName);
    }

    return hasItems && hasEnough;
  }

  Loot(entity) {
    if (entity.hp > 0) {
      console.log(entity.name + ' is still alive and cannot be looted.');
      return false;
    }

    console.log(this.name + ' loots ' + entity.name + ' and finds ' + entity.dropitems.length + ' items.');

    entity.dropitems.forEach(dropitem => {
      Items.GiveItems(this, dropitem.item, dropitem.qty);
      dropitem.qty = 0;
    });

    return true;
  }

  MakeItem(itemName) {
    console.log("You set out to make " + itemName);
    const item = Items.LookupItem(itemName);
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
      Items.GiveItems(this, item.name, 1);
    } else {
      console.log(
        "Realizing you don't have the parts you need, you hang your head in shame."
      );
    }
  }

  RemoveItemsFromInventory(itemName, qty) {
    for (let index = 0; index < this.inventory.length; index++) {
      let item = this.inventory[index];
      if (item.name == itemName) {
        if (item.qty >= qty) {
          item.qty -= qty;
          if (item.qty === 0) {
            // that was the last one.
            this.inventory.splice(index, 1);
          }

          return true;
        } else {
          console.log("don't have enough of those.");

          return false;
        }
      }
    }
  }

  TakeDamage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      console.log(this.name + " has died to death.");
    }
  }

  Unequip(itemName, equipPlace) {
    for (let index = 0; index < this.equipment.length; index++) {
      let equippedItem = this.equipment[index];
      if (equippedItem.item.name == itemName && equippedItem.location == equipPlace) {
        this.equipment.splice(index, 1);
        Items.GiveItems(this, itemName, 1);

        return true;
      }
    }
    console.log(this.name + ' does not have that item equipped there');
    return false;
  }

  UseItem(itemName) {
    let itemUsed = false;
    const item = Items.LookupItem(itemName);
    if (item == null) {
      return false;
    }

    if (this.HasItems(item.name, 1)) {
      if (item.effect == undefined) {
        console.log(itemName + ' has no effect.');
        return false;
      }

      console.log("You used " + item.name + ".");
      item.effect(this);
      this.RemoveItemsFromInventory(item.name, 1);
      itemUsed = true;

    }

    return itemUsed;
  }
}


//returns a random object for the encounter
function GetRandomEntity(areaName) {
  let area = Areas.LookupArea(areaName);
  if (area == null) {
    return null;
  }

  return LookupEntity(area.entities[Math.floor(Math.random() * area.entities.length)]);
}

function LookupEntity(entityName) {
  //console.log('looking for ' + entityName);
  for (let index = 0; index < entities.length; index++) {
    const entity = entities[index];
    if (entity.name === entityName) {
      return new Entity(entity);
    }
  }

  console.log(entityName + ' does not exist');
  return null;
}

exports.Entity = Entity;
exports.GetRandomEntity = GetRandomEntity;
exports.LookupEntity = LookupEntity;
exports.entities = entities;