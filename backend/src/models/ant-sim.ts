import { AntSimState } from '../types'

const DEFAULT_STATE: AntSimState = {
  ants: [],
}

function AntSim(oldData: AntSimState = DEFAULT_STATE) {
  this.intervalHandle = false
  this.ants = oldData.ants
}

/**
 * Moves the ant simulation forward by one tick.
 * @param {number} dt - time since last update in milliseconds
 */
AntSim.prototype.update = function (dt: number) {
  console.log(dt)
}

export default AntSim
