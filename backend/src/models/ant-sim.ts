import { Ant, AntSimConfig, AntSimState } from '../types'

const DEFAULT_STATE: AntSimState = {
  ants: [],
}

const DEFAULT_CONFIG: AntSimConfig = {
  size: {
    x: 500,
    y: 300,
  },
}

const DEFAULT_ANT: Partial<Ant> = {
  position: { x: 0, y: 0 },
  angle: 0,
}

const updateAnt = (ant: Ant): void => {
  ant.position.x += Math.random() * 3 - 1.5
  ant.position.y += Math.random() * 3 - 1.5
}

const AntSim = (
  oldState: AntSimState = DEFAULT_STATE,
  config: AntSimConfig = DEFAULT_CONFIG
) => {
  const ants = oldState.ants

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

    ants.forEach(updateAnt)

    return { ants }
  }

  return { update }
}

export default AntSim
