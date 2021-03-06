import 'express-session'

import type Ant from './models/ant'
import type Crumb from './models/crumb'
import type Nest from './models/nest'
import type Pheremone from './models/pheremone'

// OVERLOADING

declare module 'express-session' {
  interface SessionData {
    username: string
  }
}

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
  nests: Nest[]
}

export interface AntSimConfig {
  size: Vector2
}

// SINGLE ANTS --------- --------- ---------

export type AntState = {
  position: Vector2
  angle: number
  lifeLeft: number
  carrying: number
  touched: boolean
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
