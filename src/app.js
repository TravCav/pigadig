function Areas() {

    const areas = [{
        name: 'kitchen',
        entities: ['nacho', 'potato', 'pickle', 'chunky monkey', 'watermelone']
    }, {
        name: 'coffee shop',
        entities: ['britneypicklespears', 'basic chick']
    }];

    // // let arena = {
    // //     name: 'arena',
    // //     entities: []
    // // };

    // // messaging.output(entities.length);
    // // entities.forEach(entity => {
    // //     arena.entities.push(entity.name);
    // // });

    // // areas.push(arena);

    function LookupArea(areaName) {
        for (let index = 0; index < areas.length; index++) {
            const area = areas[index];
            if (area.name === areaName) {
                return area;
            }
        }

        messaging.output(areaName + ' does not exist');
        return null;
    }
}

class Attack {
    constructor(parameters) {
        this.name = "melee" || parameters.name;
        this.damage = 0.01 || parameters.damage;
        this.description = "a basic attack" || parameters.description;
    }

    DoAttack(entity) {
        return this.damage + entity.str;
    }
}

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
          messaging.output("You are successful and store the parts in your bag.");
        } else {
          messaging.output(
            "Turns out you didn't have any " +
            itemName +
            " to break apart anyway."
          );
        }
      } else {
        messaging.output("You try to break it but, nothing happens.");
      }
    }
  
    Drink(itemName) {
      if (this.HasItems(itemName, 1)) {
        const item = Items.LookupItem(itemName);
        if (item.drinkable == true){
          this.RemoveItemsFromInventory(itemName, 1);
          messaging.output("You drank the " + item.name);
          return true;
        }
      }
  
      return false;
    }
  
    Eat(itemName) {
      if (this.HasItems(itemName, 1)) {
        const item = Items.LookupItem(itemName);
        if (item.edible == true){
          this.RemoveItemsFromInventory(itemName, 1);
          messaging.output("You ate the " + item.name);
          return true;
        }
      }
  
      return false;
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
        messaging.output(this.name + ' does not have enough ' + itemName);
      }
  
      return hasItems && hasEnough;
    }
  
    Loot(entity) {
      if (entity.hp > 0) {
        messaging.output(entity.name + ' is still alive and cannot be looted.');
        return false;
      }
  
      messaging.output(this.name + ' loots ' + entity.name + ' and finds ' + entity.dropitems.length + ' items.');
  
      entity.dropitems.forEach(dropitem => {
        Items.GiveItems(this, dropitem.item, dropitem.qty);
        dropitem.qty = 0;
      });
  
      return true;
    }
  
    MakeItem(itemName) {
      messaging.output("You set out to make " + itemName);
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
        messaging.output("After a bit of work you make " + item.name);
        this.timeSpent += item.craftTime;
        Items.GiveItems(this, item.name, 1);
      } else {
        messaging.output(
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
            messaging.output("don't have enough of those.");
  
            return false;
          }
        }
      }
    }
  
    TakeDamage(damage) {
      this.hp -= damage;
      if (this.hp <= 0) {
        messaging.output(this.name + " has died to death.");
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
      messaging.output(this.name + ' does not have that item equipped there');
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
          messaging.output(itemName + ' has no effect.');
          return false;
        }
  
        messaging.output("You used " + item.name + ".");
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
    //messaging.output('looking for ' + entityName);
    for (let index = 0; index < entities.length; index++) {
      const entity = entities[index];
      if (entity.name === entityName) {
        return new Entity(entity);
      }
    }
  
    messaging.output(entityName + ' does not exist');
    return null;
  }

function messaging() {

    const msgTypes = {
        any: 0,
        quest: 1,
        fight: 2,
        attacks: 4,
        itemEffect: 8,
        itemActions: 16
    };

    const outputs = {
        none: 0,
        console: 1,
        document: 2,
        util: 4
    };

    const outputTypes = msgTypes.fight | msgTypes.quest | msgTypes.attacks | msgTypes.itemEffect | msgTypes.itemActions;
    const outputMethods = outputs.console;

    const canOutput = function (type) {
        return ((outputTypes & type) === type);
    };

    const output = function (msg, type) {
        type |= type;
        if (canOutput(type)) {
            if ((outputMethods & outputs.console) === outputs.console) {
                console.log(msg);
            }

            if ((outputMethods & outputs.document) === outputs.document) {
                document.writeln(msg);
            }

            if ((outputMethods & outputs.util) === outputs.util) {
                util.log(msg);
            }
        }
    };

}