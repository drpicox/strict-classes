import strict from '../'

let Animal
beforeEach(() => {
  function AnimalConstructor(name) {
    this.name = name
  }
  Animal = AnimalConstructor
  Animal.prototype.getName = function getName() {
    return this.name
  }
  Animal.prototype.color = 'camouflage'
})

test('Strict works with function class creators', () => {
  const StrictAnimal = strict(Animal)

  const animal = new StrictAnimal('yogi')
  expect(animal.getName()).toBe('yogi')
})

test('Strict returns a class, not a creator function, new is mandatory', () => {
  const StrictAnimal = strict(Animal)

  // eslint-disable-next-line babel/new-cap
  expect(() => StrictAnimal('yogi')).toThrow()
})

test('Strict classes only contains prototyped functions', () => {
  const StrictAnimal = strict(Animal)

  const animal = new StrictAnimal('yogi')
  expect(animal.color).toBeUndefined()
})

test('Strict does not reflects changes in the prototype after the new', () => {
  const StrictAnimal = strict(Animal)
  const animal = new StrictAnimal('yogi')

  Animal.prototype.setName = function setName(name) {
    this.name = name
  }
  expect(animal.setName).toBeUndefined()
})

test('Strict does reflects changes in the prototype before the new', () => {
  const StrictAnimal = strict(Animal)
  const yogi = new StrictAnimal('yogi')

  Animal.prototype.setName = function setName(name) {
    this.name = name
  }
  const booboo = new StrictAnimal('tobedefined')
  booboo.setName('boo-boo')

  expect(yogi.getName()).toBe('yogi')
  expect(booboo.getName()).toBe('boo-boo')
})
