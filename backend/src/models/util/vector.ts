import { Vector2 } from '../../types'

const Vector = {
  add: (v1: Vector2, v2: Vector2): Vector2 => ({
    x: v1.x + v2.x,
    y: v1.y + v2.y,
  }),

  sub: (v1: Vector2, v2: Vector2): Vector2 => ({
    x: v1.x - v2.x,
    y: v1.y - v2.y,
  }),

  scale: (v: Vector2, s: number): Vector2 => ({ x: v.x * s, y: v.y * s }),

  dot: (v1: Vector2, v2: Vector2): number => v1.x * v2.x + v1.y * v2.y,

  sqrMagnitude: (v: Vector2): number => v.x ** 2 + v.y ** 2,

  magnitude: (v: Vector2) => Math.sqrt(Vector.sqrMagnitude(v)),

  angle: (v: Vector2) => Math.atan2(v.y, v.x),

  angleBetween: (v1: Vector2, v2: Vector2) => {
    const mv1 = Vector.sqrMagnitude(v1)
    const mv2 = Vector.sqrMagnitude(v2)
    if (mv1 === 0 || mv2 === 0) return Math.PI / 2

    return Math.acos(Vector.dot(v1, v2) / Math.sqrt(mv1 * mv2))
  },

  unit: (angle: number): Vector2 => ({
    x: Math.cos(angle),
    y: Math.sin(angle),
  }),
}

export default Vector
