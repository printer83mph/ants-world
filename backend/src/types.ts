import type Ant from './models/ant'
import type Crumb from './models/crumb'
import type Pheremone from './models/pheremone'

// UTIL --------- --------- ---------

export type Vector2 = {
  x: number
  y: number
}

// ANT SIM STUFF --------- --------- ---------

export type AntSimState = {
  ants: Ant[]
  deadAnts: DeadAnt[]
  pheremones: Pheremone[]
  crumbs: Crumb[]
}

export interface AntSimConfig {
  size: Vector2
}

// SINGLE ANTS --------- --------- ---------

export type AntState = {
  position: Vector2
  angle: number
  lifeLeft: number
}

export type AntGenetics = {
  speed: number
  strength: number
  pheremoneFrequency: number
  pheremoneSensitivity: number
}

export type AntStats = {
  lifetime: number
  distanceWalked: number
  distanceCarried: number
  foodDelivered: number
}

export type DeadAnt = {
  id: string
  genetics: AntGenetics
  stats: AntStats
}
