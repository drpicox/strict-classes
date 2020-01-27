import strict, {getPublicThis} from '../'

class Hedonist {
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name
  }
  getPrivateThis() {
    return this
  }
  getPublicThis() {
    return getPublicThis(this)
  }
}

test('This holds private information of the class and can be consulted', () => {
  const StrictHedonist = strict(Hedonist)

  const hedonist = new StrictHedonist('hedonismbot')
  expect(hedonist.getName()).toBe('hedonismbot')
  expect(hedonist.name).toBe(undefined)
})

test('This can be accessed and returned as any normal object', () => {
  const StrictHedonist = strict(Hedonist)

  const hedonist = new StrictHedonist('hedonismbot')
  expect(hedonist.getPrivateThis()).toBeDefined()
})

test('This is instance of the original class', () => {
  const StrictHedonist = strict(Hedonist)

  const hedonist = new StrictHedonist('hedonismbot')
  expect(hedonist.getPrivateThis()).toBeInstanceOf(Hedonist)
})

test('This contains the private members', () => {
  const StrictHedonist = strict(Hedonist)

  const hedonist = new StrictHedonist('hedonismbot')
  expect(hedonist.getPrivateThis().name).toBe('hedonismbot')
})

test('getPublicThis returns the public object from the private this that is constructed by the strict constructor', () => {
  const StrictHedonist = strict(Hedonist)

  const hedonist = new StrictHedonist('hedonismbot')
  expect(hedonist.getPublicThis()).toBe(hedonist)
})

test('getPublicThis works outside class methods', () => {
  const StrictHedonist = strict(Hedonist)

  const hedonist = new StrictHedonist('hedonismbot')
  const privateHedonist = hedonist.getPrivateThis()
  expect(hedonist.getPublicThis(privateHedonist)).toBe(hedonist)
})

test('getPublicThis fails if the received private instance is not created by a StrictClass', () => {
  expect(() => {
    getPublicThis({})
  }).toThrow()
})

test('getPublicThis fails if the constructor has not finished', () => {
  const StrictPremature = strict(
    class Premature {
      constructor() {
        getPublicThis(this)
      }
    },
  )
  expect(() => new StrictPremature()).toThrow()
})

test('If a class constructor fails, getPublicThis fails to get the public this', () => {
  let collateralSavedThis
  const StrictAbort = strict(
    class Abort {
      constructor() {
        collateralSavedThis = this
        throw Error('controlled abort')
      }
    },
  )

  try {
    // eslint-disable-next-line no-new
    new StrictAbort()
    // eslint-disable-next-line no-empty
  } catch (e) {}

  expect(collateralSavedThis).toBeDefined()
  expect(() => getPublicThis(collateralSavedThis)).toThrow()
})
