export type Vector2 = {
  x: number
  y: number
}

export type Ant = {
  position: Vector2
  angle: number
  id: string
}

export interface AntSimState {
  ants: Ant[]
}

export interface AntSimConfig {
  size: Vector2
}
