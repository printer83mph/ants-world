export type Vector2 = {
  x: number
  y: number
}

export type Ant = {
  position: Vector2
}

export interface AntSimState {
  ants: Ant[]
}
