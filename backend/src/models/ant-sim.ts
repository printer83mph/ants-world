import { AntSimState } from '../types'

const DEFAULT_STATE: AntSimState = {
  ants: [],
}

class AntSim {
  state: AntSimState

  constructor(oldData: AntSimState = DEFAULT_STATE) {
    this.state = { ...oldData }
  }

  /**
   * Moves the ant simulation forward by one tick.
   * @param {number} dt - time since last update in milliseconds
   */
  update(dt: number) {
    console.log(dt)
  }
}

export default AntSim
