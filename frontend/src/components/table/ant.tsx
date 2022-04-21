import { MutableRefObject, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LiveData } from '../../types'

import antImage from '../../res/ant.svg'

export interface AntProps {
  liveData: MutableRefObject<LiveData>
  id: string
}

const Ant = ({ liveData, id }: AntProps) => {
  // TODO: implement ant LODs
  // TODO: ant tracking
  const antRef = useRef<HTMLDivElement>(null)
  const [, setSearchParams] = useSearchParams()

  useEffect(() => {
    const updateAnt = () => {
      const ant = liveData.current.ants.find(({ id: antId }) => antId === id)
      // TODO: optimize this LOL (probably need rewrite using listeners and such)
      if (!ant) return
      antRef.current!.style.left = `${ant.position.x - 1}px`
      antRef.current!.style.top = `${ant.position.y - 1}px`
      antRef.current!.style.transform = `rotate(${ant.angle}rad)`
      antRef.current!.onclick = () => {
        setSearchParams(`?ant=${ant.id}`)
      }
    }
    const iv = setInterval(updateAnt, 100)
    updateAnt()
    return () => clearInterval(iv)
  }, [id, liveData, setSearchParams])

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      ref={antRef}
      className="absolute w-[2px] h-[2px] p-[3px] rounded-full bg-center transition-[left,top] duration-300 ease-linear
      [background-repeat:no-repeat] [background-size:2px_2px] hover:bg-[rgba(0,0,0,.2)]"
      style={{ backgroundImage: `url(${antImage})` }}
    />
  )
}

export default Ant
