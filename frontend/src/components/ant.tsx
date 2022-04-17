import { useCallback, useEffect, useRef } from 'react'
import { LiveData } from '../types'

export interface AntProps {
  liveData: LiveData
  id: string
}

const Ant = ({ liveData, id }: AntProps) => {
  const antRef = useRef<HTMLDivElement>(null)

  const updateAntDisplay = useCallback((x: number, y: number) => {
    antRef.current!.style.left = `${x}px`
    antRef.current!.style.top = `${y}px`
  }, [])

  useEffect(() => {
    const iv = setInterval(() => {
      const ant = liveData.ants.find(({ id: antId }) => antId === id)
      // TODO: optimize this LOL
      if (!ant) return
      updateAntDisplay(ant.position.x, ant.position.y)
    }, 20)
    return () => clearInterval(iv)
  }, [id, liveData, updateAntDisplay])

  return (
    <div
      ref={antRef}
      className="absolute w-[1px] h-[1px] bg-red-500 transition-[left,top] duration-300"
    />
  )
}

export default Ant
