'use strict';

class Animal {
  static alive = [];

  constructor(name, health = 100) {
    this.name = name;
    this.health = health;

    // Jeśli tworzymy Herbivore, ustaw hidden na false
    if (this instanceof Herbivore) {
      this.hidden = false;
    }

    Animal.alive.push(this);
  }

  checkAlive() {
    if (this.health <= 0) {
      const index = Animal.alive.indexOf(this);
      if (index !== -1) {
        Animal.alive.splice(index, 1);
      }
    }
  }
}

class Herbivore extends Animal {
  hide() {
    this.hidden = true;
  }
}

class Carnivore extends Animal {
  bite(prey) {
    // działa tylko na Herbivore i tylko jeśli nie ukryty
    if (!(prey instanceof Herbivore)) return;
    if (prey.hidden) return;

    prey.health -= 50;
    if (prey.health <= 0) {
      prey.checkAlive();
    }
  }
}

module.exports = {
  Animal,
  Herbivore,
  Carnivore
};
