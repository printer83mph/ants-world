import { AntState, AntSimConfig } from '../types'

export interface AntOptions {
  initialState: AntState
}

class Ant {
  simConfig: AntSimConfig

  state: AntState

  constructor(config: AntSimConfig, options: AntOptions) {
    this.state = { ...options.initialState }
  }

  update(dt: number) {
    const {
      state: { position },
    } = this
    // position.x +=
  }
}

export default Ant
