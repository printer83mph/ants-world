import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { LiveAnt, LiveData } from '../../types'

import antImage from '../../res/ant.svg'
import deadAntImage from '../../res/dead_ant.png'
import useDeadAnts from '../../hooks/use-dead-ants'
import { removeFromCollection } from '../../api/collection'

export interface AntCardProps {
  id: string
  liveData: MutableRefObject<LiveData>
  mutate: () => any
}

const AntCard = (props: AntCardProps) => {
  const { id, liveData, mutate } = props
  const [dead, setDead] = useState(false)
  const { deadAnts, loading } = useDeadAnts()

  const imageRef = useRef<HTMLImageElement>(null)
  // const statsRef = useRef<HTMLDivElement>(null)

  const onRemove = async () => {
    await removeFromCollection(id)
    mutate()
    toast.success('Removed Ant from collection!')
  }

  useEffect(() => {
    if (loading) return

    if (deadAnts.indexOf(id) !== -1) {
      // the ant is dea
      setDead(true)
      return
    }

    const updateDisplay = () => {
      const ant = (dead ? deadAnts : liveData.current.ants).find(
        ({ id: antId }: { id: string }) => id === antId
      ) as LiveAnt
      if (ant === undefined || dead) {
        if (!dead) setDead(true)
        return
      }
      imageRef.current!.style.transform = `rotate(${ant.angle}rad)`
      // statsRef.current!.innerHTML = `<div>${ant.angle}</div>`
    }

    const iv = setInterval(updateDisplay, 100)
    updateDisplay()
    return () => clearInterval(iv)
  }, [id, deadAnts, dead, liveData, loading])

  if (loading) {
    return null
  }

  return (
    <li className="p-6 m-3 hover:shadow-md duration-300 rounded-lg">
      <div className="flex items-center justify-around mb-2">
        <img
          src={dead ? deadAntImage : antImage}
          alt="Ant"
          width={96}
          height={96}
          ref={imageRef}
          className="mr-6"
        />
        {dead || (
          <Link
            to={`/?ant=${id}`}
            className="bg-blue-500 text-white text-lg px-4 py-2 rounded-md shadow hover:shadow-lg duration-100 font-medium"
          >
            Go to Ant
          </Link>
        )}
        <button
          type="button"
          onClick={onRemove}
          className="text-lg hover:text-red-500 duration-100 px-4 py-2 rounded-md border-[1px] border-transparent hover:border-red-500"
        >
          Remove
        </button>
      </div>
      <h3 className="text-gray-500">{id}</h3>
      {/* <p ref={statsRef} /> */}
    </li>
  )
}

export default AntCard
