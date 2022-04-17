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
      // //   messaging.output("Nothing needs gathered.");
      // //   break;
      // // case 3:
      // //   // Escort quest
      // //   messaging.output("Nothing needs escorted.");
      // //   break;
    default:
      Action.WanderAbout(entity);
      break;
  }
}


function DoAdventure() {

  messaging.output("And here our adventure begins...");

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

  console.log("Finished with: \r\n ", player);
  messaging.output("Farewell");
}
