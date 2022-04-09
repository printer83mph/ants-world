import Vector from '../src/models/util/vector'

describe('Vector', () => {
  it('gets magnitude', () => {
    expect(Vector.magnitude({ x: 3, y: 4 })).toStrictEqual(5)
  })

  it('gets angle between', () => {
    expect(Vector.angleBetween({ x: 5, y: -5 }, { x: 5, y: 5 })).toStrictEqual(
      Math.PI / 2
    )
    expect(Vector.angleBetween({ x: 3, y: -2 }, { x: -3, y: 2 })).toStrictEqual(
      Math.PI
    )
    expect(Vector.angleBetween({ x: 3, y: -2 }, { x: 0, y: 0 })).toStrictEqual(
      Math.PI / 2
    )
  })
})
