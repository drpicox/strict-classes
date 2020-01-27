const {getOwnPropertyNames, getPrototypeOf} = Object

const privatePublicThisMap = new Map()

function delegatePrototype(self, delegate, prototype) {
  if (prototype.constructor === Object) return
  getOwnPropertyNames(prototype).forEach(key => {
    const value = delegate[key]
    if (typeof value === 'function') self[key] = value.bind(delegate)
  })
  delegatePrototype(self, delegate, getPrototypeOf(prototype))
}

export function getPublicThis(privateThis) {
  const value = privatePublicThisMap.get(privateThis)
  if (value == null)
    throw new TypeError(
      'Received privateThis is not a delegate of a StrictClass',
    )
  return value
}

export default function strict(Class) {
  return class {
    constructor(...args) {
      const delegate = new Class(...args)
      delegatePrototype(this, delegate, getPrototypeOf(delegate))
      privatePublicThisMap.set(delegate, this)
    }
  }
}
