// let assert = require('assert');
// let Entity = require('../src/Entity');
// let Items = require('../src/items');
// let action = require('../src/Actions');
// let Areas = require('../src/Areas');


class Attack {
    constructor(parameters) {
      this.name = "melee" || parameters.name;
      this.damage = 0.01 || parameters.damage;
      this.description = "a basic attack" || parameters.description;
    }

    DoAttack(entity){
        return this.damage + entity.str;
    }
}