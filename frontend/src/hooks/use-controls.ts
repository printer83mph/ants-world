import React, { useCallback, useEffect, useRef } from 'react'

const MOVEMENT_KEYS: { [key: string]: number[] } = {
  w: [0, -1],
  s: [0, 1],
  a: [-1, 0],
  d: [1, 0],
}

const VALID_KEYS = Object.keys(MOVEMENT_KEYS)

const useControls = (
  ref: React.RefObject<HTMLElement>,
  onZoom: (dY: number) => void,
  onPan: (dX: number, dY: number) => void
) => {
  const keysDown = useRef<string[]>([])
  const animFrame = useRef<number>()

  const handleScroll = useCallback(
    (evt: WheelEvent) => {
      onZoom(evt.deltaY)
    },
    [onZoom]
  )

  const handleKeyDown = useCallback(
    (evt: KeyboardEvent) => {
      if (keysDown.current.indexOf(evt.key) !== -1) return
      keysDown.current.push(evt.key)
    },
    [keysDown]
  )

  const handleKeyUp = useCallback(
    (evt: KeyboardEvent) => {
      const index = keysDown.current.indexOf(evt.key)
      if (index === -1) return
      keysDown.current.splice(index, 1)
    },
    [keysDown]
  )

  const updatePan = useCallback(() => {
    if (keysDown.current.length === 0) return
    let [dx, dy] = [0, 0]
    keysDown.current.forEach((key) => {
      if (!VALID_KEYS.includes(key)) return
      const [keyX, keyY] = MOVEMENT_KEYS[key]
      dx += keyX
      dy += keyY
    })
    onPan(dx, dy)
  }, [keysDown, onPan])

  useEffect(() => {
    const current = ref.current!
    const animationFrame = () => {
      updatePan()
      animFrame.current = window.requestAnimationFrame(animationFrame)
    }
    current.addEventListener('wheel', handleScroll)
    animFrame.current = window.requestAnimationFrame(animationFrame)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      current.removeEventListener('wheel', handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.cancelAnimationFrame(animFrame.current!)
    }
  }, [handleKeyDown, handleKeyUp, handleScroll, ref, updatePan])
}

export default useControls
