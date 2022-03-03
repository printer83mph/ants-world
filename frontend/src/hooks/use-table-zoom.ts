import { useCallback, useRef } from 'react'

interface Zoom {
  scale: number
  x: number
  y: number
}

const useTableZoom = (tableRef: React.RefObject<HTMLDivElement>) => {
  const zoomRef = useRef<Zoom>({ scale: 1, x: 0, y: 0 })

  const updateZoom = useCallback(() => {
    tableRef.current!.style.transform = `scale(${zoomRef.current.scale}) translate(${zoomRef.current.x}px, ${zoomRef.current.y}px)`
  }, [tableRef, zoomRef])

  const setZoom = useCallback(
    (newZoom: Partial<Zoom>) => {
      zoomRef.current = { ...zoomRef.current, ...newZoom }
      updateZoom()
    },
    [zoomRef]
  )

  const translate = useCallback(
    (x: number, y: number) => {
      zoomRef.current.x += x
      zoomRef.current.y += y
      updateZoom()
    },
    [zoomRef]
  )

  const zoom = useCallback(
    (scale: number) => {
      zoomRef.current.scale *= scale
      updateZoom()
    },
    [zoomRef]
  )

  // TODO: maybe a "frame" function

  return { setZoom, translate, zoom }
}

export default useTableZoom
