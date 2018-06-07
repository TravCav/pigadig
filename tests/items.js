let assert = require('assert');
let Entity = require('../src/Entity');
let Items = require('../src/items');
let messaging = require('../src/messaging');

messaging.outputs = 0;

describe('Entity', function () {
    it('should have 2 water', function () {
        let player = new Entity.Entity({
            name: "testplayer"
        });
        Items.GiveItems(player, 'water', 2);
        assert.equal(player.HasItems('water', 2), true);
    });

    it('should be able to deconstruct item', function () {
        let player = new Entity.Entity({
            name: "testplayer"
        });
        Items.GiveItems(player, 'water', 2);
        player.DeconstructItem('water');
        assert.equal(player.HasItems('hydrogen', 2), true);
        assert.equal(player.HasItems('oxygen', 1), true);
    });
});