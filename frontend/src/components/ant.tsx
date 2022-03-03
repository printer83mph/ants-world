import { useEffect, useRef } from 'react'
import { AntData } from '../types'

export interface AntProps {
  initialData: AntData
}

const Ant = ({ initialData }: AntProps) => {
  const antRef = useRef<HTMLDivElement>(null)
  const antDataRef = useRef<AntData>(initialData)

  const updateAntDisplay = () => {
    antRef.current!.style.left = `${antDataRef.current!.position.x}px`
    antRef.current!.style.top = `${antDataRef.current!.position.y}px`
  }

  useEffect(() => {
    updateAntDisplay()
    // setInterval(() => {
    //   antDataRef.current.position.x += 1
    //   updateAntDisplay()
    // }, 200)
  }, [])

  return (
    <div
      ref={antRef}
      className="absolute w-[1px] h-[1px] bg-red-500 transition-[left,top] duration-300"
    />
  )
}

export default Ant
