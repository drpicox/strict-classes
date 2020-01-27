strict classes
==============

Javascript is known of no having privates and no members (are plain functions).
Recently a new proposal has raised for the standard to have privates using the `#` symbol.

This package creates a new method of creating class constructors that have methods
and everything else is private.

```javascript
import strict from 'strict-classes';

class Animal {
  constructor(name, sound) {
    this.name = name;
    this.#sound = sound;
  }
  getName() {
    return this.name;
  }
  getSound() {
    return this.#sound;
  }
}

const animal = new Animal('yogi', 'nyam');
expect(animal.getName()).toBe('yogi')
expect(animal.getSound()).toBe('nyam')
expect(animal.name).toBe('yogi')
// animal.#sound throws
let {getName, getSound} = animal;
// getName() throws
// getSound() throws

const StrictAnimal = strict(Animal);
const strictAnimal = new StrictAnimal('yogi', 'nyam');
expect(strictAnimal.getName()).toBe('yogi')
expect(strictAnimal.getSound()).toBe('nyam')
expect(strictAnimal.name).toBeUndefined()
// animal.#sound throws
({getName, getSound} = animal);
expect(getName()).toBe('yogi')
expect(getSound()).toBe('nyam')
```

### Accessing the public this

There are two this, the private this, only visible by the class,
and the public this, visible by anyone.

The class itself can ask for the public this by calling `getPublicThis`.

```javascript
import strict, { getPublicThis } from 'strict-classes';

class Animal {
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
    return getPublicThis(this);
  }
}

const animal = new Animal();
expect(animal.setName()).toBe(animal);
expect(animal.setName('yogi').getName()).toBe('yogi');
```
