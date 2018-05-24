const items = [
  {
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
    dependencies: [
      {
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

//stuff you can encounter in adventure
const entities = [
  {
    name: "guineapig",
    time: 1,
    dropitems: []
  },
  {
    name: "flower",
    time: 1,
    dropitems: []
  },
  {
    name: "potato",
    time: 1,
    dropitems: []
  },
  {
    name: "watermelone",
    time: 5,
    dropitems: [
      {
        item: "water",
        qty: 2
      }
    ]
  }
];

let player = {
  inventory: [],
  timeSpent: 0
};

function AddToInventory(itemName, qty) {
  const newItem = LookupItem(itemName);
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
  console.log("You attempt to break apart " + itemName);
  const item = LookupItem(itemName);

  if (item.dependencies.length > 0) {
    let itemRemoved = RemoveItemsFromInventory(itemName, 1);
    if (itemRemoved) {
      item.dependencies.forEach(dependency => {
        AddToInventory(dependency.item, dependency.qty);
      });

      player.timeSpent += item.time / 2;
      console.log("You are successful and store the parts in your bag.");
    } else {
      console.log(
        "Turns out you didn't have any " + itemName + " to break apart anyway."
      );
    }
  } else {
    console.log("You try to break it but, nothing happens.");
  }
}

//Adventure activity in which you encounter an object
function GetEncounter() {
  let entity = GetRandomEntity();
  console.log("You encounter a", entity.name);
  Fight(entity);

  entity.dropitems.forEach(dropitem => {
    AddToInventory(dropitem.item, dropitem.qty);
  });
}

function GoAdventuring() {
  switch (Math.floor(Math.random() * 2)) {
    case 0:
      // Kill quest
      GetEncounter();
      break;
    case 1:
      // Delivery quest
      break;
    case 2:
      // Gather quest
      break;
    case 3:
      // Escort quest
      break;
    default:
      const randomItem = items[Math.floor(Math.random() * items.length)];
      AddToInventory(randomItem.name, 1);
      player.timeSpent += 5;
      console.log(
        "You wander aimlessly, but find no adventuring to be had. You did happen to find some " +
          randomItem.name +
          " though."
      );
      break;
  }
}

//returns a random object for the encounter
function GetRandomEntity() {
  return entities[Math.floor(Math.random() * entities.length)];
}

//action taken against an entity in an encounter
function Fight(entity) {
  console.log("You fight the", entity.name);
  player.timeSpent += 10;
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
  console.log("You set out to make " + itemName);
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
    console.log("After a bit of work you make " + item.name);
    player.timeSpent += item.time;
    AddToInventory(item.name, 1);
  } else {
    console.log(
      "Realizing you don't have the parts you need, you hang your head in shame."
    );
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
