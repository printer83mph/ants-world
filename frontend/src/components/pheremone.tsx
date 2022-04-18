import { MutableRefObject, useEffect, useRef } from 'react'
import { LiveData } from '../types'

export interface PheremoneProps {
  liveData: MutableRefObject<LiveData>
  id: string
}

const Pheremone = ({ liveData, id }: PheremoneProps) => {
  const pheremoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const {
      position: { x, y },
    } = liveData.current.pheremones.find(
      ({ id: pheremoneId }) => pheremoneId === id
    ) as {
      position: { x: number; y: number }
    }
    pheremoneRef.current!.style.left = `${x}px`
    pheremoneRef.current!.style.top = `${y}px`
  }, [id, liveData])

  return (
    <div ref={pheremoneRef} className="absolute bg-green-300 w-[1px] h-[1px]" />
  )
}

export default Pheremone
