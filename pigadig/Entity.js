let Items = require('./items');
let messaging = require('./messaging');

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
    dropitems: [{
      item:"oxygen",
      qty:1
    }],
    attacks: [{
      name:"pollination",
      damage:1,
      description: "a basic attack"
    }]
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
      if (messaging.canOutput(messaging.msgTypes.attacks)) {
        console.log(
          this.name + " attacks " + entity.name + " with " + attack.name
        );
      }
      this.timeSpent++;
      entity.TakeDamage(attack);
    }
  
    DeconstructItem(itemName) {
      console.log("You attempt to break apart " + itemName);
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
  
    HasItems(itemName, qty) {
      let hasItems = false;
  
      this.inventory.forEach(item => {
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
  
    SellItem(itemName) {
      const item = Items.LookupItem(itemName);
      if (this.HasItems(itemName, 1)) {
        this.RemoveItemsFromInventory(itemName, 1);
        Items.GiveItems(this, 'coin', item.value);
      }
    }
  
    BuyItem(itemName) {
      const item = Items.LookupItem(itemName);
      if (this.HasItems('coin', item.value)) {
        this.RemoveItemsFromInventory('coin', item.value);
        Items.GiveItems(this, itemName, 1);
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
      const item = Items.LookupItem(itemName);
      if (this.HasItems(item.name, 1)) {
        console.log("You used " + item.name + ".");
        item.effect(this);
        this.RemoveItemsFromInventory(item.name, 1);
      }
    }
  }


//returns a random object for the encounter
function GetRandomEntity() {
    return new Entity(entities[Math.floor(Math.random() * entities.length)]);
  }
  
  
  exports.Entity = Entity;
  exports.GetRandomEntity = GetRandomEntity;
