let assert = require('assert');
let Entity = require('../src/Entity');
let Items = require('../src/items');
let action = require('../src/Actions');
let Areas = require('../src/Areas');
let Attack = require('../src/Attack');

describe('Combat', function () {
    it('attack makes entity stronger', function () {
        let entity1 = new Entity.Entity({
            name: "entity1"
        });

        let entity2 = new Entity.Entity({
            name: "entity2"
        });

        entity1.Attack(entity2, entity1.attacks[0]);
        assert.equal(entity1.str > 1, true);
    });

    it('damage increases with str', function () {
        let entity1 = new Entity.Entity({
            name: "entity1"
        });
        
        let entity2 = new Entity.Entity({
            name: "entity2",
            hp: 10
        });

        entity1.Attack(entity2, entity1.attacks[0]);

        assert.equal(entity2.hp == 8.99, true, entity2.hp);

        entity1.Attack(entity2, entity1.attacks[0]);

        assert.equal(entity2.hp == 7.970000000000001, true, entity2.hp);
    });
});