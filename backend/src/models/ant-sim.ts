/* eslint-disable no-param-reassign */

import { AntState, AntSimConfig, AntSimState } from '../types'

const DEFAULT_STATE: AntSimState = {
  ants: [],
}

const DEFAULT_CONFIG: AntSimConfig = {
  size: {
    x: 500,
    y: 300,
  },
}

const DEFAULT_ANT: Partial<AntState> = {
  position: { x: 0, y: 0 },
  angle: 0,
}

const updateAnt = (ant: AntState, dt: number): void => {
  ant.position.x += (Math.random() - 0.5) * 0.1 * dt
  ant.position.y += (Math.random() - 0.5) * 0.1 * dt
}

const AntSim = (
  oldState: AntSimState = DEFAULT_STATE,
  config: AntSimConfig = DEFAULT_CONFIG
) => {
  const { ants } = oldState

  const update = (dt: number) => {
    if (true && ants.length < 250) {
      ants.push({
        ...DEFAULT_ANT,
        position: {
          x: Math.random() * config.size.x,
          y: Math.random() * config.size.y,
        },
        angle: 0,
        id: JSON.stringify({ haha: Date.now() }),
      })
    }

    ants.forEach((ant) => updateAnt(ant, dt))

    return { ants }
  }

  return { update }
}

export default AntSim
