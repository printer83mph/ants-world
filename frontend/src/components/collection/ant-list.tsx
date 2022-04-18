import { useContext } from 'react'
import useSWR from 'swr'
import LiveDataContext from '../../context/live-data-context'
import { LiveAnt } from '../../types'
import fetcher from '../../util/fetcher'

export interface AntListProps {
  ants: string[]
}

const AntList = (props: AntListProps) => {
  const { liveData } = useContext(LiveDataContext)
  const { data, error } = useSWR('/collection', fetcher)

  if (!data) return <div>Loadink</div>

  return <ul>{data.ants.map((ant) => {})}</ul>
}

export default AntList
