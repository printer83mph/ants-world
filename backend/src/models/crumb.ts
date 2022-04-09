import { v4 as uuidv4 } from 'uuid'
import type { Vector2 } from '../types'

const MIN_MASS = 5
const MAX_MASS = 20

export default class Crumb {
  id: string
  position: Vector2
  mass: number

  constructor(id: string, position: Vector2, mass: number) {
    this.id = id
    this.position = position
    this.mass = mass
  }

  static new(position: Vector2) {
    return new Crumb(
      uuidv4(),
      position,
      Math.random() * (MAX_MASS - MIN_MASS) + MIN_MASS
    )
  }

  static copy({ id, position, mass }: Crumb) {
    return new Crumb(id, position, mass)
  }

  /**
   * Take some mass from this crumb.
   * @param mass - desired mass to take from this crumb
   * @returns the amount of mass taken
   */
  takeMass(mass: number) {
    this.mass -= mass
    return this.mass <= 0
  }

  static toExport(crumb: Crumb) {
    return { id: crumb.id, position: crumb.position, mass: crumb.mass }
  }

  static toLive(crumb: Crumb) {
    return { position: crumb.position, mass: crumb.mass }
  }
}
