import { useCallback, useEffect, useState } from 'react'
import { LiveAnt, LiveData } from '../types'
import Ant from './ant'

export interface AntsProps {
  liveData: LiveData
}

const mapAnts = (ants: LiveAnt[]) => ants.map(({ id }) => id)

const Ants = (props: AntsProps) => {
  const { liveData } = props

  const [antsList, setAntsList] = useState<string[]>([])

  const runUpdate = useCallback(() => {
    const { ants: liveAnts } = liveData
    try {
      if (antsList.length !== liveAnts.length) {
        throw new Error()
      }
      antsList.forEach((id, index) => {
        if (antsList[index] !== id) {
          throw new Error()
        }
      })
    } catch (err) {
      setAntsList(mapAnts(liveAnts))
      console.log('hello')
    }
  }, [antsList, liveData])

  useEffect(() => {
    const iv = setInterval(runUpdate, 100)
    return () => clearInterval(iv)
  }, [runUpdate])

  return (
    <>
      {antsList.map((id) => (
        <Ant id={id} liveData={liveData} key={id} />
      ))}
    </>
  )
}

export default Ants
