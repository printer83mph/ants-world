import { MutableRefObject, useEffect, useState } from 'react'
import { LiveData } from '../types'
import Ant from './ant'

export interface AntsProps {
  liveData: MutableRefObject<LiveData>
}

const mapThings = (things: { id: string }[]) => things.map(({ id }) => id)

const Ants = (props: AntsProps) => {
  const { liveData } = props

  const [antsList, setAntsList] = useState<string[]>([])

  useEffect(() => {
    const iv = setInterval(() => {
      try {
        if (antsList.length !== liveData.current.ants.length) {
          throw new Error()
        }
        liveData.current.ants.forEach(({ id }, index) => {
          if (antsList[index] !== id) {
            throw new Error()
          }
        })
      } catch (err) {
        setAntsList(mapThings(liveData.current.ants))
        // console.log('new ants list!')
      }
    }, 50)
    return () => clearInterval(iv)
  }, [antsList, liveData])

  return (
    <>
      {antsList.map((id) => (
        <Ant id={id} liveData={liveData} key={id} />
      ))}
    </>
  )
}

export default Ants
