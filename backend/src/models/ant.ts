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
import Nest from './nest'
import Pheremone from './pheremone'

import Vector from './util/vector'

const randomGenetic = () => Math.random() * 0.8 + 0.6

const MIN_LIFE = 60 * 60 * 1000 * 2
const MAX_LIFE = 60 * 60 * 1000 * 48

class Ant {
  id: string
  genetics: AntGenetics
  state: AntState
  stats: AntStats

  liveListeners: (() => any)[]

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
      speed: randomGenetic(),
      strength: randomGenetic(),
      pheremoneFrequency: randomGenetic(),
      pheremoneSensitivity: randomGenetic(),
    }
    const stats: AntStats = {
      distanceCarried: 0,
      distanceWalked: 0,
      foodDelivered: 0,
      lifetime: 0,
    }
    const angle = Math.random() * Math.PI * 2
    const lifeLeft = Math.random() * (MAX_LIFE - MIN_LIFE) + MIN_LIFE
    const carrying = 0
    const touched = false
    return new Ant(
      uuidv4(),
      { angle, position, lifeLeft, carrying, touched },
      genetics,
      stats
    )
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

    // calculate the angle weight (complicated and stupid)
    let angleWeight = 0

    const allTargets =
      state.carrying === 0
        ? [...simState.pheremones, ...simState.crumbs]
        : [...simState.pheremones, ...simState.nests]

    const forwardVector = Vector.unit(state.angle)
    const rightVector = Vector.unit(state.angle + Math.PI / 2)

    allTargets.forEach((target) => {
      const diffVector = Vector.sub(target.position, state.position)

      // filter out guys behind
      if (Vector.dot(diffVector, forwardVector) < 0) return

      // filter out guys out of radius
      if (
        Vector.sqrMagnitude(Vector.sub(state.position, target.position)) >
        (genetics.pheremoneSensitivity * 80) ** 2
      ) {
        return
      }

      const onRight = Vector.dot(rightVector, diffVector) > 0
      // add weight based on direction + type of target
      angleWeight +=
        (onRight ? 1 : -1) *
        (target instanceof Crumb || target instanceof Nest ? 45 : 1)
    })

    const randomTurning = (Math.random() - 0.5) / (Math.abs(angleWeight) + 1)

    // update angle
    state.angle +=
      (randomTurning + angleWeight * 0.002 * genetics.pheremoneSensitivity) *
      genetics.speed *
      0.007 *
      dt

    // clamp angle
    state.angle %= Math.PI * 2

    // try take food
    if (state.carrying === 0) {
      for (let index = 0; index < simState.crumbs.length; index += 1) {
        const crumb = simState.crumbs[index]
        if (
          Vector.sqrMagnitude(Vector.sub(crumb.position, state.position)) < 7
        ) {
          state.carrying = Math.min(genetics.strength * 3, crumb.mass)
          if (crumb.takeMass(state.carrying)) {
            simState.crumbs.splice(index, 1)
          }
          state.angle += Math.PI
          break
        }
      }
    } else {
      for (let index = 0; index < simState.nests.length; index += 1) {
        const nest = simState.nests[index]
        if (
          Vector.sqrMagnitude(Vector.sub(nest.position, state.position)) < 7
        ) {
          state.carrying = 0
          state.angle += Math.PI
          break
        }
      }

      // try drop pheremones
      if (Math.random() < (1 / dt) * 3) {
        simState.pheremones.push(Pheremone.new(state.position))
      }
    }

    // update position
    const newPos = Vector.add(
      state.position,
      Vector.scale(Vector.unit(state.angle), genetics.speed * 0.007 * dt)
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

    // remove life
    state.lifeLeft -= Math.random() * randomGenetic() * dt

    return state.lifeLeft <= 0
  }

  // get a dead version of this ant
  dead(): DeadAnt {
    return { genetics: this.genetics, stats: this.stats, id: this.id }
  }

  // note we touched this ant (so it's saved in dead ants)
  touch() {
    this.state.touched = true
  }

  // export my mans
  static toExport(ant: Ant) {
    return {
      id: ant.id,
      state: ant.state,
      genetics: ant.genetics,
      stats: ant.stats,
    }
  }

  static toLive(ant: Ant) {
    return { ...ant.state, id: ant.id, stats: ant.stats }
  }
}

export default Ant
