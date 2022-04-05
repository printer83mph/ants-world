export type Vector2 = {
  x: number
  y: number
}

export type AntState = {
  position: Vector2
  angle: number
  id: string
}

export interface AntSimState {
  ants: AntState[]
}

export interface AntSimConfig {
  size: Vector2
}
