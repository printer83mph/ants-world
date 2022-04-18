/* eslint-disable no-param-reassign */

import { cloneDeep } from 'lodash'

import { AntSimConfig, AntSimState } from '../types'
import Ant from './ant'
import Crumb from './crumb'
import Nest from './nest'
import Pheremone from './pheremone'

const DEFAULT_STATE: AntSimState = {
  ants: [],
  deadAnts: [],
  pheremones: [],
  crumbs: [],
  nests: [],
}

const DEFAULT_CONFIG: AntSimConfig = {
  size: {
    x: 500,
    y: 300,
  },
}

class AntSim {
  state: AntSimState
  config: AntSimConfig

  constructor(oldState?: AntSimState, config?: AntSimConfig) {
    this.config = { ...DEFAULT_CONFIG, ...config }
    // initialize state
    const { ants, deadAnts, crumbs, pheremones, nests } = {
      ...DEFAULT_STATE,
      ...cloneDeep(oldState),
    }
    this.state = {
      ants: ants.map(Ant.copy),
      deadAnts,
      crumbs: crumbs.map(Crumb.copy),
      pheremones: pheremones.map(Pheremone.copy),
      nests: nests.map(Nest.copy),
    }
  }

  // tick function
  update(dt: number) {
    // update ants
    const { ants, deadAnts, pheremones, nests, crumbs } = this.state

    // DEBUG NEST SPAWNING
    if (nests.length < 3) {
      nests.push(
        Nest.new({
          x: Math.random() * this.config.size.x,
          y: Math.random() * this.config.size.y,
        })
      )
    }

    // DEBUG ANT SPAWNING
    if (ants.length < 350) {
      const nest = nests[Math.floor(Math.random() * nests.length)]
      ants.push(Ant.new(nest.position))
    }

    // DEBUG CRUMB SPAWNING
    if (crumbs.length < 8) {
      crumbs.push(
        Crumb.new({
          x: Math.random() * this.config.size.x,
          y: Math.random() * this.config.size.y,
        })
      )
    }

    // DEBUG PHEREMONES
    // if (pheremones.length < 250) {
    //   const theta = Math.random() * Math.PI * 2
    //   pheremones.push(
    //     Pheremone.new({
    //       x: 110 * Math.cos(theta) + this.config.size.x / 2,
    //       y: 110 * Math.sin(theta) + this.config.size.y / 2,
    //     })
    //   )
    // }

    ants.forEach((ant, index) => {
      if (ant.update(this.state, this.config, dt)) {
        ants.splice(index, 1)
        deadAnts.push(ant.dead())
      }
    })

    // update pheremones
    pheremones.forEach((pheremone, index) => {
      if (pheremone.update(dt)) {
        pheremones.splice(index, 1)
      }
    })

    // update nests
    nests.forEach((nest, index) => {
      if (nest.update(dt)) {
        nests.splice(index, 1)
      }
    })
  }

  // transform for export
  toExport() {
    const { ants, deadAnts, crumbs, pheremones } = this.state
    return {
      ants: ants.map(Ant.toExport),
      deadAnts,
      crumbs: crumbs.map(Crumb.toExport),
      pheremones: pheremones.map(Pheremone.toExport),
    }
  }

  toLive() {
    const { ants, crumbs } = this.state
    return {
      ants: ants.map(Ant.toLive),
      crumbs: crumbs.map(Crumb.toLive),
    }
  }
}

export default AntSim
