class Attack {
    constructor(parameters) {
        this.name = "melee" || parameters.name;
        this.damage = 0.01 || parameters.damage;
        this.description = "a basic attack" || parameters.description;
    }

    DoAttack(entity) {
        return this.damage + entity.str;
    }
}