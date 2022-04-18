import { MutableRefObject, useEffect, useState } from 'react'
import type { LiveData } from '../types'
import Pheremone from './pheremone'

const Pheremones = (props: { liveData: MutableRefObject<LiveData> }) => {
  const { liveData } = props
  const [pheremonesList, setPheremonesList] = useState<string[]>([])

  useEffect(() => {
    const iv = setInterval(() => {
      try {
        if (pheremonesList.length !== liveData.current.pheremones.length) {
          throw new Error()
        }
        liveData.current.pheremones.forEach(({ id }, index) => {
          if (pheremonesList[index] !== id) {
            throw new Error()
          }
        })
      } catch (err) {
        setPheremonesList(liveData.current.pheremones.map(({ id }) => id))
      }
    }, 50)

    return () => clearInterval(iv)
  }, [liveData, pheremonesList])

  return (
    <>
      {pheremonesList.map((id) => (
        <Pheremone id={id} liveData={liveData} key={id} />
      ))}
    </>
  )
}

export default Pheremones
