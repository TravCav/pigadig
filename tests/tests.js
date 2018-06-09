let assert = require('assert');
let Entity = require('../src/Entity');
let Items = require('../src/items');
let action = require('../src/action');


describe('Entity', function () {
    it('should be able to deconstruct item', function () {
        let player = new Entity.Entity({
            name: "testplayer"
        });
        Items.GiveItems(player, 'water', 2);
        player.DeconstructItem('water');
        assert.equal(player.HasItems('hydrogen', 2), true);
        assert.equal(player.HasItems('oxygen', 1), true);
    });

    it('should be able to trade items', function () {
        let player1 = new Entity.Entity({
            name: "player1"
        });
        let player2 = new Entity.Entity({
            name: "player2"
        });

        Items.GiveItems(player1, 'coin', 1);
        Items.GiveItems(player2, 'water', 1);

        Items.Trade(player1, [{
            item: 'coin',
            qty: 1
        }], player2, [{
            item: 'water',
            qty: 1
        }]);

        assert.equal(player1.HasItems('water', 1), true);
        assert.equal(player2.HasItems('coin', 1), true);
    });

    it('can attack things', function () {
        let player = new Entity.Entity({
            name: "testplayer"
        });

        let gpig = new Entity.Entity({
            name: "gpig"
        });

        player.Attack(gpig, gpig.attacks[0]);

    });

    it('can use things', function () {
        let player = new Entity.Entity({
            name: "user"
        });
        Items.GiveItems(player, 'water', 2);

        assert.equal(player.UseItem('water'), true);
        assert.equal(player.HasItems('water', 1),true);
    });

    it('can throw things', function () {
        let player = new Entity.Entity({
            name: "testuser"
        });
        Items.GiveItems(player, 'stick', 3);
        Items.ThrowItems(player, 'stick', 2);

        assert.equal(player.HasItems('stick', 1),true);
    });
    
    it('can eat things', function () {
        let player = new Entity.Entity({
            name: "testuser"
        });
        Items.GiveItems(player, 'apple', 5);
        Items.EatItems(player, 'apple', 2);
        
        assert.equal(player.HasItems('apple', 3),true);
    });

    it('cannot use things with no effect', function () {
        let player = new Entity.Entity({
            name: "user"
        });
        Items.GiveItems(player, 'milk', 1);

        assert.equal(player.UseItem('milk'), false);
    });

    it('cannot use things entity does not have', function () {
        let player = new Entity.Entity({
            name: "user"
        });

        assert.equal(player.UseItem('water'), false);
    });

});

describe('Items', function () {
    it('Can give the player 2 water', function () {
        let player = new Entity.Entity({
            name: "testplayer"
        });
        Items.GiveItems(player, 'water', 2);
        assert.equal(player.HasItems('water', 2), true);
    });
});


describe('Player', function () {
    it('Can fight something', function () {
        let player = new Entity.Entity({
            name: "testplayer"
        });

        action.FightSomething(player);
    });

    it('Can wander about', function () {
        let player = new Entity.Entity({
            name: "testplayer"
        });

        action.WanderAbout(player);
    });

    it('Can do a delivery quest', function () {
        let player = new Entity.Entity({
            name: "testplayer"
        });

        action.DeliveryQuest(player);
    });

    it('Can equip item', function () {
        let player = new Entity.Entity({
            name: "testplayer"
        });

        Items.GiveItems(player, 'hat', 1);

        player.Equip('hat', 'head');
        assert.equal(player.HasItems('hat',1), false);

    });

    it('Can unequip item', function() {
        let player = new Entity.Entity({
            name: "testplayer"
        });

        const hat = Items.LookupItem('hat');
        player.equipment.push({location: 'head', item: hat});

        assert.equal(player.Unequip('hat', 'head'), true);

        assert.equal(player.HasItems('hat',1), true);
        assert.equal(player.equipment.length, 0);
    });
});