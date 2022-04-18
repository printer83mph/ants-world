import { MutableRefObject, useEffect, useState } from 'react'
import { LiveData, Vector2 } from '../../types'
import Crumb from './crumb'

export interface CrumbsProps {
  liveData: MutableRefObject<LiveData>
}

const mapCrumbs = (crumbs: { position: Vector2; mass: number; id: string }[]) =>
  crumbs.map(({ id }) => id)

const Crumbs = (props: CrumbsProps) => {
  const { liveData } = props

  const [crumbsList, setCrumbsList] = useState<string[]>([])
  // console.log(crumbsList)

  useEffect(() => {
    const iv = setInterval(() => {
      try {
        if (crumbsList.length !== liveData.current.crumbs.length) {
          throw new Error()
        }
        liveData.current.crumbs.forEach(({ id }, index) => {
          if (crumbsList[index] !== id) {
            throw new Error()
          }
        })
      } catch (err) {
        setCrumbsList(mapCrumbs(liveData.current.crumbs))
      }
    }, 50)
    return () => clearInterval(iv)
  }, [crumbsList, liveData])

  return (
    <>
      {crumbsList.map((id) => (
        <Crumb id={id} liveData={liveData} key={id} />
      ))}
    </>
  )
}

export default Crumbs
