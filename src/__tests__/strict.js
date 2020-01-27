import strict from '../'

class Animal {
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name
  }
  favoriteFood() {
    return 'nothing'
  }

  flies = () => {
    return false
  }
}

class Bear extends Animal {
  favoriteFood() {
    return 'Anything at the picnic table'
  }
}

test('Strict returns a valid class constructor', () => {
  const StrictAnimal = strict(Animal)

  const animal = new StrictAnimal('yogi')
  expect(animal).toBeInstanceOf(StrictAnimal)
})

test('Strict returned constructor is not the original', () => {
  const StrictAnimal = strict(Animal)

  const animal = new StrictAnimal('yogi')
  expect(animal).not.toBeInstanceOf(Animal)
})

test('Strict returs a working constructor of the current class', () => {
  const StrictAnimal = strict(Animal)

  const animal = new StrictAnimal('yogi')
  expect(animal.getName()).toBe('yogi')
})

test('Strict classes does not give access to non-prototipic values', () => {
  const StrictAnimal = strict(Animal)

  const animal = new StrictAnimal('yogi')
  expect(animal.name).toBe(undefined)
})

test('Strict inheritance gets the correct overwrite of functions', () => {
  const StrictBear = strict(Bear)

  const bear = new StrictBear('yogi')
  expect(bear.favoriteFood()).toBe('Anything at the picnic table')
})

test('Strict inheritance navigates through the inheritance tree', () => {
  const StrictBear = strict(Bear)

  const bear = new StrictBear('yogi')
  expect(bear.getName()).toBe('yogi')
})

test('Strict does not have access to instance methods', () => {
  const StrictAnimal = strict(Animal)

  const animal = new StrictAnimal('yogi')
  expect(animal.flies).toBe(undefined)
})

test('Strict constructor hides the inheritance tree', () => {
  const StrictBear = strict(Bear)

  const bear = new StrictBear('yogi')
  expect(bear).not.toBeInstanceOf(Bear)
  expect(bear).not.toBeInstanceOf(Animal)
})
