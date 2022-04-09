export type Vector2 = {
  x: number
  y: number
}

export type LiveAnt = {
  position: Vector2
  id: string
}

export type LiveData = {
  ants: LiveAnt[]
  pheremones: { position: Vector2 }
  crumbs: { position: Vector2 }
}
