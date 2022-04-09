import { v4 as uuidv4 } from 'uuid'
import type {
  AntState,
  AntSimConfig,
  AntSimState,
  AntStats,
  AntGenetics,
  DeadAnt,
  Vector2,
} from '../types'
import Crumb from './crumb'

import Vector from './util/vector'

const randomGenetic = () => Math.random() * 0.8 + 0.6

const MIN_LIFE = 60 * 60 * 1000 * 2
const MAX_LIFE = 60 * 60 * 1000 * 48

class Ant {
  id: string
  genetics: AntGenetics
  state: AntState
  stats: AntStats

  constructor(
    id: string,
    initialState: AntState,
    genetics: AntGenetics,
    stats: AntStats
  ) {
    this.id = id
    this.state = initialState
    this.genetics = genetics
    this.stats = stats
  }

  static new(position: Vector2) {
    const genetics: AntGenetics = {
      speed: randomGenetic() * 0.007,
      strength: randomGenetic(),
      pheremoneFrequency: randomGenetic(),
      pheremoneSensitivity: randomGenetic() * 50,
    }
    const stats: AntStats = {
      distanceCarried: 0,
      distanceWalked: 0,
      foodDelivered: 0,
      lifetime: 0,
    }
    const angle = Math.random() * Math.PI * 2
    const lifeLeft = Math.random() * (MAX_LIFE - MIN_LIFE) + MIN_LIFE
    return new Ant(uuidv4(), { angle, position, lifeLeft }, genetics, stats)
  }

  static copy({ id, state, genetics, stats }: Ant) {
    return new Ant(id, state, genetics, stats)
  }

  /**
   * Update function for an Ant
   * @param simState - state of the AntSim
   * @param simConfig - config of the AntSim
   * @param dt - time since last update in MS
   * @returns whether or not this ant is dead
   */
  update(simState: AntSimState, simConfig: AntSimConfig, dt: number) {
    const { state, genetics } = this
    const { position } = state

    // calculate the angle weight (complicated and stupid)
    let angleWeight = 0

    const forwardTargets = [...simState.pheremones, ...simState.crumbs].filter(
      (target) =>
        Vector.dot(
          Vector.sub(target.position, position),
          Vector.unit(state.angle)
        ) > 0
    )

    const closeTargets = forwardTargets.filter(
      (target) =>
        Vector.sqrMagnitude(Vector.sub(position, target.position)) <
        genetics.pheremoneSensitivity ** 2
    )

    closeTargets.forEach((target) => {
      const rightVector = Vector.unit(state.angle + Math.PI / 2)
      const onRight =
        Vector.dot(rightVector, Vector.sub(target.position, position)) > 0
      // add weight based on direction + type of target
      angleWeight += (onRight ? 1 : -1) * (target instanceof Crumb ? 5 : 1)
    })

    const randomTurning =
      (Math.random() * 1 - 0.5) / (Math.abs(angleWeight) + 1)

    // update angle
    state.angle += (randomTurning + angleWeight * 0.05) * genetics.speed * dt

    // clamp angle
    state.angle %= Math.PI * 2

    // update position
    const newPos = Vector.add(
      state.position,
      Vector.scale(Vector.unit(state.angle), genetics.speed * dt)
    )

    // clamp position + bounce
    if (newPos.x < 0 || newPos.x > simConfig.size.x) {
      newPos.x = Math.max(0, Math.min(newPos.x, simConfig.size.x))
      state.angle = Math.PI - state.angle
    }

    if (newPos.y < 0 || newPos.y > simConfig.size.y) {
      newPos.y = Math.max(0, Math.min(newPos.y, simConfig.size.y))
      state.angle = -state.angle
    }

    state.position = newPos

    // TODO: try take food, manage food state

    // remove life
    state.lifeLeft -= Math.random() * randomGenetic() * dt

    return state.lifeLeft <= 0
  }

  // get a dead version of this ant
  dead(): DeadAnt {
    return { genetics: this.genetics, stats: this.stats, id: this.id }
  }

  // export my mans
  static toExport(ant: Ant) {
    return { state: ant.state, genetics: ant.genetics, stats: ant.stats }
  }

  static toLive(ant: Ant) {
    return { ...ant.state, id: ant.id }
  }
}

export default Ant
