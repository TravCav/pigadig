let assert = require('assert');
let Entity = require('../src/Entity');
let Items = require('../src/ItemActions');
let action = require('../src/Actions');

describe('Player', function () {

    it('Can drink water', function () {
        let player = new Entity.Entity({
            name: "testplayer"
        });
        
        Items.GiveItems(player, 'water', 1);
        
        var success = player.Drink("water");
        assert.equal(success,true);
    });

    it('Cannot drink non drinkable item', function () {
        let player = new Entity.Entity({
            name: "testplayer"
        });
        
        Items.GiveItems(player, 'wood', 1);
        
        var success = player.Drink("strawberry");
        assert.equal(success,false);
    });

    it('Can eat edible items', function () {
        let player = new Entity.Entity({
            name: "testplayer"
        });
        
        Items.GiveItems(player, 'strawberry', 1);
        
        var success = player.Eat("strawberry");
        assert.equal(success,true);
    });

    it('Cannot eat inedible items', function () {
        let player = new Entity.Entity({
            name: "testplayer"
        });
        
        Items.GiveItems(player, 'water', 1);
        
        var success = player.Eat("water");
        assert.equal(success,false);
    });

    it('Can fight an entity', function () {
        let player = new Entity.Entity({
            name: "testplayer"
        });
        let entity = Entity.LookupEntity('potato');

        action.Fight(player, entity);
    });

    it('Can fight something in an area', function () {
        let player = new Entity.Entity({
            name: "testplayer"
        });

        action.FightSomething(player, 'kitchen');
    });

    it('Can loot dead entities', function () {
        let player = new Entity.Entity({
            name: "testplayer"
        });

        let deadEntity = Entity.LookupEntity('watermelone');
        deadEntity.hp = 0;

        assert.equal(player.Loot(deadEntity), true);
        assert.equal(player.inventory.length === 1, true);
        assert.equal(deadEntity.dropitems[0].qty === 0, true);
    });

    it('Cannot loot living entities', function () {
        let player = new Entity.Entity({
            name: "testplayer"
        });

        let deadEntity = Entity.LookupEntity('watermelone');

        assert.equal(player.Loot(deadEntity), false);
        assert.equal(player.inventory.length === 1, false);
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
        assert.equal(player.HasItems('hat', 1), false);

    });

    it('Can unequip item', function () {
        let player = new Entity.Entity({
            name: "testplayer"
        });

        const hat = Items.LookupItem('hat');
        player.equipment.push({
            location: 'head',
            item: hat
        });

        assert.equal(player.Unequip('hat', 'head'), true);

        assert.equal(player.HasItems('hat', 1), true);
        assert.equal(player.equipment.length, 0);
    });
});