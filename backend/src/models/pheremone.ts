import { v4 as uuidv4 } from 'uuid'

import type { Vector2 } from '../types'

const MIN_LIFETIME = 10 * 1000 * 60
const MAX_LIFETIME = 60 * 1000 * 60

export default class Pheremone {
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
    return new Pheremone(uuidv4(), position, lifetime)
  }

  static copy({ id, position, lifetime }: Pheremone) {
    return new Pheremone(id, position, lifetime)
  }

  // export method hehe
  static toExport(pheremone: Pheremone) {
    return {
      position: pheremone.position,
      lifetime: pheremone.lifetime,
      id: pheremone.id,
    }
  }

  static toLive(pheremone: Pheremone) {
    return { position: pheremone.position, id: pheremone.id }
  }

  /**
   * Tick method for a piece of pheremone.
   * @param dt - Time since last update
   * @returns Whether or not this pheremone should disappear
   */
  update(dt: number) {
    this.lifetime -= dt
    return this.lifetime <= 0
  }
}
