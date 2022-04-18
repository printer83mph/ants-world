import { MutableRefObject, useEffect, useRef } from 'react'
import { LiveData } from '../types'

import antImage from '../res/ant.svg'

export interface AntProps {
  liveData: MutableRefObject<LiveData>
  id: string
}

const Ant = ({ liveData, id }: AntProps) => {
  const antRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const iv = setInterval(() => {
      const ant = liveData.current.ants.find(({ id: antId }) => antId === id)
      // TODO: optimize this LOL
      if (!ant) return
      antRef.current!.style.left = `${ant.position.x - 1}px`
      antRef.current!.style.top = `${ant.position.y - 1}px`
      antRef.current!.style.transform = `rotate(${ant.angle}rad)`
    }, 20)
    return () => clearInterval(iv)
  }, [id, liveData])

  return (
    <div
      ref={antRef}
      className="absolute w-[2px] h-[2px] bg-cover transition-[left,top] duration-300 ease-linear"
      style={{ backgroundImage: `url(${antImage})` }}
    />
  )
}

export default Ant
