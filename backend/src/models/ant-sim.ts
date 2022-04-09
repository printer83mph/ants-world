/* eslint-disable no-param-reassign */

import { cloneDeep } from 'lodash'

import { AntSimConfig, AntSimState } from '../types'
import Ant from './ant'
import Crumb from './crumb'
import Pheremone from './pheremone'

const DEFAULT_STATE: AntSimState = {
  ants: [],
  deadAnts: [],
  pheremones: [],
  crumbs: [],
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
    const { ants, deadAnts, crumbs, pheremones } = {
      ...DEFAULT_STATE,
      ...cloneDeep(oldState),
    }
    this.state = {
      ants: ants.map(Ant.copy),
      deadAnts,
      crumbs: crumbs.map(Crumb.copy),
      pheremones: pheremones.map(Pheremone.copy),
    }
  }

  // tick function
  update(dt: number) {
    // update ants
    const { ants, deadAnts, pheremones } = this.state

    // DEBUG ANT SPAWNING
    while (true && ants.length < 300) {
      ants.push(
        Ant.new({
          x: Math.random() * this.config.size.x,
          y: Math.random() * this.config.size.y,
        })
      )
    }

    // DEBUG PHEREMONES
    if (true && pheremones.length < 250) {
      const theta = Math.random() * Math.PI * 2
      pheremones.push(
        Pheremone.new({
          x: 110 * Math.cos(theta) + this.config.size.x / 2,
          y: 110 * Math.sin(theta) + this.config.size.y / 2,
        })
      )
    }

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
    const { ants, crumbs, pheremones } = this.state
    return {
      ants: ants.map(Ant.toLive),
      crumbs: crumbs.map(Crumb.toLive),
      pheremones: pheremones.map(Pheremone.toLive),
    }
  }
}

export default AntSim
