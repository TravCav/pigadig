let assert = require('assert');
let Entity = require('../src/Entity');
let Items = require('../src/items');



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