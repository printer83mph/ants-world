export type Vector2 = {
  x: number
  y: number
}

export type LiveAnt = {
  position: Vector2
  angle: number
  carrying: number
  id: string
}

export type LiveData = {
  ants: LiveAnt[]
  pheremones: { position: Vector2; id: string }[]
  crumbs: { position: Vector2; mass: number; id: string }[]
}
