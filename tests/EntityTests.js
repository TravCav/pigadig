let assert = require('assert');
let Entity = require('../src/Entity');
let Items = require('../src/ItemActions');


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
        assert.equal(player.HasItems('water', 1), true);
    });

    it('can throw things', function () {
        let player = new Entity.Entity({
            name: "testuser"
        });
        Items.GiveItems(player, 'stick', 3);
        Items.ThrowItems(player, 'stick', 2);

        assert.equal(player.HasItems('stick', 1), true);
    });

    it('can eat things', function () {
        let player = new Entity.Entity({
            name: "testuser"
        });
        Items.GiveItems(player, 'apple', 5);
        Items.EatItems(player, 'apple', 2);

        assert.equal(player.HasItems('apple', 3), true);
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