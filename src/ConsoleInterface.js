let Entity = require('./Entity');
let Action = require('./Actions');
let readline = require('readline');
const messaging = require('./messaging');




function InteractiveMode() {
    let player = new Entity.Entity({
        name: "player",
        hp: 10
    });

    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('What is your name? ', (answer) => {
        messaging.output(`Thanks for playing ${answer}`);
        messaging.output('Please choose what you want to do next.');
        messaging.output('You can Adventure, Quest, Fight, or Quit.');
        messaging.output('What do you want to do?');
        //DoAdventure();
    });


    rl.on('line', (line) => {
        messaging.output(`You chose to ${line}`);
        switch (line.toLowerCase()) {
            case 'adventure':
                Action.DoAdventure();
                messaging.output('You can Adventure, Quest, Fight, or Quit.');
                messaging.output('What do you want to do?');
                break;
            case 'quest':
                Action.DeliveryQuest();
                messaging.output('You can Adventure, Quest, Fight, or Quit.');
                messaging.output('What do you want to do?');
                break;
            case 'fight':
                Action.FightSomething();
                messaging.output('You can Adventure, Quest, Fight, or Quit.');
                messaging.output('What do you want to do?');
                break;
            case 'quit':
                messaging.output('Thanks for playing.');
                rl.close();
                break;
            default:
                Action.WanderAbout();
                messaging.output('You can Adventure, Quest, Fight, or Quit.');
                messaging.output('What do you want to do?');
                break;
        }
    });


}

exports.InteractiveMode = InteractiveMode;

