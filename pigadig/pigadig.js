const items = [{
    name: "hydrogen",
    time: 1,
    dependencies: []
  },
  {
    name: "helium",
    time: 1,
    dependencies: []
  },
  {
    name: "oxygen",
    time: 1,
    dependencies: []
  },
  {
    name: "water",
    time: 10,
    dependencies: [{
        item: "hydrogen",
        qty: 2
      },
      {
        item: "oxygen",
        qty: 1
      }
    ]
  }
];
let player = {
  inventory: [],
  timeSpent: 0
};

function AddToInventory(newItem, qty) {
  let alreadyHave = false;
  player.inventory.forEach(item => {
    if (item.name == newItem.name) {
      item.qty += qty;
      alreadyHave = true;
    }
  });

  if (!alreadyHave) {
    player.inventory.push({
      name: newItem.name,
      qty: qty
    });
  }
}

function DeconstructItem(itemName) {
  const item = LookupItem(itemName);

  if (item.dependencies.length > 0) {
    let itemRemoved = RemoveItemsFromInventory(itemName, 1);
    if (itemRemoved) {
      item.dependencies.forEach(dependency => {
        AddToInventory(LookupItem(dependency.item), dependency.qty);
      });

      player.timeSpent += item.time / 2;
    } else {
      console.log('You dig around in your pockets but, can\'t seem to find any ' + itemName);
    }
  } else {
    console.log("You try to break it but, nothing happens.");
  }
}

function GoAdventuring() {
  const randomItem = items[Math.floor(Math.random() * items.length)];
  AddToInventory(randomItem, 1);
  player.timeSpent += 10;
  console.log('You wander aimlessly, but find no adventuring to be had. You did happen to find some ' + randomItem.name + ' though.');
}

function HaveEnough(dependency) {
  ////console.log("checking for: ", dependency);
  let haveEnough = false;

  player.inventory.forEach(item => {
    ////console.log(item.name, dependency.item);
    if (item.name === dependency.item) {
      ////console.log("has " + item.qty + " " + item.name);
      if (item.qty < dependency.qty) {
        console.log(
          "need " + (dependency.qty - item.qty) + " more " + dependency.item
        );
      } else {
        haveEnough = true;
      }
    }
  });

  return haveEnough;
}

function LookupItem(itemName) {
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    if (item.name === itemName) {
      return item;
    }
  }
}

function MakeItem(itemName) {
  const item = LookupItem(itemName);
  let canMakeItem = false;

  // does it have any requirements
  if (item.dependencies.length === 0) {
    canMakeItem = true;
  } else {
    let missingItems = false;
    // can we meet the requirements
    item.dependencies.forEach(dependency => {
      missingItems |= !HaveEnough(dependency);
    });

    if (!missingItems) {
      item.dependencies.forEach(dependency => {
        RemoveItemsFromInventory(dependency.item, dependency.qty);
      });

      canMakeItem = true;
    }
  }

  // We meet the requirements. Make the Item.
  if (canMakeItem) {
    console.log('After a bit of work you make ', item.name);
    player.timeSpent += item.time;
    AddToInventory(item, 1);
  }
}

function RemoveItemsFromInventory(itemName, qty) {
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

console.log("And here our adventure begins...");

for (let index = 0; index < 10; index++) {
  GoAdventuring();
}

// // MakeItem("hydrogen");
// // MakeItem("hydrogen");
// // MakeItem("oxygen");
MakeItem("water");

DeconstructItem("water");

console.log("Finished with: \r\n", player.inventory);
console.log("Time Spent: ", player.timeSpent);
console.log("Farewell");