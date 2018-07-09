let assert = require('assert');
let Entity = require('../src/Entity');
let Items = require('../src/items');
let action = require('../src/Actions');
let Areas = require('../src/Areas');

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

        entity1.str += 1;
        assert.equal(entity1.attacks[0].damage == 2, true, entity1.attacks[0].damage);
    });
});