import { MutableRefObject, useEffect, useRef } from 'react'
import { LiveData } from '../types'

export interface CrumbProps {
  liveData: MutableRefObject<LiveData>
  id: string
}

const Crumb = ({ liveData, id }: CrumbProps) => {
  const crumbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const {
      position: { x, y },
    } = liveData.current.crumbs.find(({ id: crumbId }) => crumbId === id) as {
      position: { x: number; y: number }
    }
    crumbRef.current!.style.left = `${x}px`
    crumbRef.current!.style.top = `${y}px`
    const iv = setInterval(() => {
      const crumb = liveData.current.crumbs.find(
        ({ id: crumbId }) => crumbId === id
      )
      // TODO: optimize this LOL
      if (!crumb) return
      const size = crumb.mass ** (1 / 3) * 0.3
      crumbRef.current!.style.width = `${size}px`
      crumbRef.current!.style.height = `${size}px`
    }, 50)
    return () => clearInterval(iv)
  }, [id, liveData])

  return (
    <div
      ref={crumbRef}
      className="absolute bg-blue-500 transform-[translate(-50%,-50%)]"
    />
  )
}

export default Crumb
