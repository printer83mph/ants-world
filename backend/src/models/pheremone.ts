import type { Vector2 } from '../types'

const MIN_LIFETIME = 0.1 * 1000
const MAX_LIFETIME = 100 * 1000

export default class Pheremone {
  position: Vector2
  lifetime: number

  constructor(position: Vector2, lifetime: number) {
    this.position = position
    this.lifetime = lifetime
  }

  static new(position: Vector2) {
    const lifetime =
      Math.random() * (MAX_LIFETIME - MIN_LIFETIME) + MIN_LIFETIME
    return new Pheremone(position, lifetime)
  }

  static copy({ position, lifetime }: Pheremone) {
    return new Pheremone(position, lifetime)
  }

  // export method hehe
  static toExport(pheremone: Pheremone) {
    return {
      position: pheremone.position,
      lifetime: pheremone.lifetime,
    }
  }

  static toLive(pheremone: Pheremone) {
    return { position: pheremone.position }
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
