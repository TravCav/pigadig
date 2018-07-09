let Entity = require('./Entity');
let Action = require('./Actions');
let readline = require('readline');

let player = new Entity.Entity({
  name: "player",
  hp: 10
});


function GoAdventuring(entity) {
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      // Kill quest
      Action.FightSomething(entity, 'kitchen');
      break;
    case 1:
      // Delivery quest
      Action.DeliveryQuest(entity);
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
      Action.WanderAbout(entity);
      break;
  }
}


function DoAdventure() {

  console.log("And here our adventure begins...");

  while (player.hp > 0) {
    while (player.HasItems('hydrogen', 2) && player.HasItems('oxygen', 1)) {
      player.MakeItem('water');
    }

    while (player.hp < player.maxHp && player.HasItems('water', 1)) {
      player.UseItem("water");
    }

    GoAdventuring(player);
  }

  // // // // player.SellItem('water');
  // // // // player.BuyItem('hydrogen');
  // // WanderAbout();
  // // DeliveryQuest();
  // // FightSomething();

  // // Items.GiveItems(player, 'hydrogen', 2);
  // // Items.GiveItems(player, 'oxygen', 1);
  // // player.MakeItem('water');
  // // player.UseItem('water');

  // // Items.GiveItems(player, 'water', 1);
  // // player.DeconstructItem('water');

  console.log("Finished with: \r\n", player);
  console.log("Farewell");
}

function InteractiveMode() {

  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('What is your name? ', (answer) => {
    console.log(`Thanks for playing ${answer}`);
    console.log('Please choose what you want to do next.');
    console.log('You can Adventure, Quest, Fight, or Quit.');
    console.log('What do you want to do?');
    //DoAdventure();

  });


  rl.on('line', (line) => {
    console.log(`You chose to ${line}`);
    switch (line.toLowerCase()) {
      case 'adventure':
        Action.DoAdventure();
        console.log('You can Adventure, Quest, Fight, or Quit.');
        console.log('What do you want to do?');
        break;
      case 'quest':
        Action.DeliveryQuest();
        console.log('You can Adventure, Quest, Fight, or Quit.');
        console.log('What do you want to do?');
        break;
      case 'fight':
        Action.FightSomething();
        console.log('You can Adventure, Quest, Fight, or Quit.');
        console.log('What do you want to do?');
        break;
      case 'quit':
        console.log('Thanks for playing.');
        rl.close();
        break;
      default:
        Action.WanderAbout();
        console.log('You can Adventure, Quest, Fight, or Quit.');
        console.log('What do you want to do?');
        break;
    }
  });
}


DoAdventure();
//InteractiveMode();