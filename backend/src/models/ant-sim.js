const Ant = require('./ant')

function AntSim(oldData) {
  this.intervalHandle = false
  this.ants = oldData.ants
}

/**
 * Moves the ant simulation forward by one tick.
 * @param {number} dt - time since last update in milliseconds
 */
AntSim.prototype.update = function (dt) {}

// TODO: saving / loading ant sim from persistent storage..?

// /**
//  * Starts the ant simulation.
//  * @param {number} timeStep - simulation tick time in milliseconds
//  */
// AntSim.prototype.start = function (timeStep) {
//   if (this.intervalHandle !== false) return
//   this.intervalHandle = setInterval(() => {
//     this.update(timeStep)
//   }, timeStep)
// }

// /**
//  * Stops the ant simulation.
//  */
// AntSim.prototype.stop = function () {
//   if (this.intervalHandle === false) return
//   clearInterval(this.intervalHandle)
// }

module.exports = AntSim
