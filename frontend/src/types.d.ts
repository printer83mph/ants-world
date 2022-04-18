export type Vector2 = {
  x: number
  y: number
}

export type LiveAnt = {
  position: Vector2
  angle: number
  carrying: number
  id: string
  stats: AntStats
}

export type AntStats = {
  lifetime: number
  distanceWalked: number
  distanceCarried: number
  foodDelivered: number
}

export type AntGenetics = {
  speed: number
  strength: number
  pheremoneFrequency: number
  pheremoneSensitivity: number
}

export type LiveData = {
  ants: LiveAnt[]
  // pheremones: { position: Vector2; id: string }[]
  crumbs: { position: Vector2; mass: number; id: string }[]
}
