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

  const handleScroll = useCallback(
    (evt: WheelEvent) => {
      console.log('hahaha')
      onZoom(evt.deltaY)
    },
    [onZoom]
  )

  const handleKeyDown = useCallback(
    (evt: KeyboardEvent) => {
      if (keysDown.current.indexOf(evt.key) !== -1) return
      keysDown.current.push(evt.key)
      console.log(keysDown.current)
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
    ref.current?.focus()
    ref.current!.addEventListener('wheel', handleScroll)
    console.log('troll')
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    const handle = setInterval(updatePan, 16)
    return () => {
      ref.current!.removeEventListener('wheel', handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      clearInterval(handle)
    }
  }, [ref, handleScroll, handleKeyDown, handleKeyUp, updatePan])
}

export default useControls
