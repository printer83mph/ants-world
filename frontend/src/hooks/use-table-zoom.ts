import { useCallback, useRef } from 'react'
import { Vector2 } from '../types'

interface Zoom {
  scale: number
  x: number
  y: number
}

export interface TableZoomOptions {
  minZoom: number
  maxZoom: number
  minBounds: Vector2
  maxBounds: Vector2
}

const DEFAULT_TABLE_ZOOM_OPTIONS: TableZoomOptions = {
  minZoom: 0.75,
  maxZoom: 15,
  minBounds: { x: -250, y: -150 },
  maxBounds: { x: 250, y: 150 },
}

const useTableZoom = (
  tableRef: React.RefObject<HTMLDivElement>,
  options: TableZoomOptions = DEFAULT_TABLE_ZOOM_OPTIONS
) => {
  const zoomRef = useRef<Zoom>({ scale: 1, x: 0, y: 0 })

  const updateZoom = useCallback(() => {
    // we gotta update the style without big rerenders and such
    // eslint-disable-next-line no-param-reassign
    tableRef.current!.style.transform = `scale(${zoomRef.current.scale}) translate(${zoomRef.current.x}px, ${zoomRef.current.y}px)`
  }, [tableRef, zoomRef])

  const setZoom = useCallback(
    (newZoom: Partial<Zoom>) => {
      zoomRef.current = { ...zoomRef.current, ...newZoom }
      updateZoom()
    },
    [zoomRef, updateZoom]
  )

  const translate = useCallback(
    (x: number, y: number) => {
      const {
        minBounds: { x: minX, y: minY },
        maxBounds: { x: maxX, y: maxY },
      } = options
      zoomRef.current.x = Math.max(Math.min(zoomRef.current.x - x, maxX), minX)
      zoomRef.current.y = Math.max(Math.min(zoomRef.current.y - y, maxY), minY)
      updateZoom()
    },
    [zoomRef, options, updateZoom]
  )

  const pan = useCallback(
    (x: number, y: number) => {
      const inverseZoom = 1 / zoomRef.current.scale
      translate(x * inverseZoom, y * inverseZoom)
    },
    [translate]
  )

  const frame = useCallback(
    (x: number, y: number) => {
      zoomRef.current.x = options.maxBounds.x - x
      zoomRef.current.y = options.maxBounds.y - y
    },
    [zoomRef, options]
  )

  const zoom = useCallback(
    (scale: number) => {
      const { minZoom, maxZoom } = options
      zoomRef.current.scale = Math.max(
        Math.min(zoomRef.current.scale * scale, maxZoom),
        minZoom
      )
      updateZoom()
    },
    [zoomRef, options, updateZoom]
  )

  // TODO: maybe a "frame" function

  return { setZoom, translate, pan, zoom, frame }
}

export default useTableZoom
