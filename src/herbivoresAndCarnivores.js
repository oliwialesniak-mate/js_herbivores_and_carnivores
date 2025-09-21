'use strict';

class Animal {
  static alive = [];

  constructor(name, health = 100) {
    this.name = name;
    this.health = health;

    // Herbivore może mieć hidden
    if (this instanceof Herbivore) {
      this.hidden = false;
    }

    // Dodajemy instancję do tablicy żywych
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
  constructor(name) {
    super(name);
    this.hidden = false;
  }

  hide() {
    this.hidden = true;
  }
}

class Carnivore extends Animal {
  constructor(name) {
    super(name);
  }

  bite(prey) {
    // działa tylko na Herbivore i jeśli nie jest ukryty
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
  Carnivore,
};
