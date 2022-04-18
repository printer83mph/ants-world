import { v4 as uuidv4 } from 'uuid'

import type { Vector2 } from '../types'

const MIN_LIFETIME = 1 * 1000 * 60 * 60 * 24
const MAX_LIFETIME = 10 * 1000 * 60 * 60 * 24

export default class Nest {
  id: string
  position: Vector2
  lifetime: number

  constructor(id: string, position: Vector2, lifetime: number) {
    this.position = position
    this.lifetime = lifetime
    this.id = id
  }

  static new(position: Vector2) {
    const lifetime =
      Math.random() * (MAX_LIFETIME - MIN_LIFETIME) + MIN_LIFETIME
    return new Nest(uuidv4(), position, lifetime)
  }

  static copy({ id, position, lifetime }: Nest) {
    return new Nest(id, position, lifetime)
  }

  // export method hehe
  static toExport(nest: Nest) {
    return {
      position: nest.position,
      lifetime: nest.lifetime,
      id: nest.id,
    }
  }

  static toLive(nest: Nest) {
    return { position: nest.position, id: nest.id }
  }

  /**
   * Tick method for a nest.
   * @param dt - Time since last update
   * @returns Whether or not this nest should disappear
   */
  update(dt: number) {
    this.lifetime -= dt
    return this.lifetime <= 0
  }
}
