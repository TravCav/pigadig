let assert = require('assert');
let Entity = require('../src/Entity');
let Items = require('../src/items');



describe('Items', function () {
    describe('Give Items', function () {

        it('should have 2 water', function () {
            let player = new Entity.Entity({
                name: "player",
                hp: 10
            });
            Items.GiveItems(player, 'water', 2);
            assert.equal(player.HasItems('water', 2), true);
        });
    });
});