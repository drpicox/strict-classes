import strict from '../'

class Animal {
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name
  }
}

test('Strict methods are bounded to the private this', () => {
  const StrictAnimal = strict(Animal)

  const animal = new StrictAnimal('yogi')
  const {getName} = animal
  expect(animal).toBeInstanceOf(StrictAnimal)
  expect(getName()).toBe('yogi')
})
