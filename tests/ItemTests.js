let assert = require('assert');
let Entity = require('../src/Entity');
let Items = require('../src/ItemActions');

describe('Items', function () {
    it('Can give the player 2 water', function () {
        let player = new Entity.Entity({
            name: "testplayer"
        });
        Items.GiveItems(player, 'water', 2);
        assert.equal(player.HasItems('water', 2), true);
    });
});