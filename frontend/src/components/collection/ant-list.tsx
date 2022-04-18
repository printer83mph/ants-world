import { useContext, useMemo } from 'react'
import LiveDataContext from '../../context/live-data-context'
import useCollection from '../../hooks/use-collection'
import AntCard from './ant-card'

const AntList = () => {
  const { liveData, loading: liveLoading } = useContext(LiveDataContext)
  const {
    loading: collectionLoading,
    ants: collection,
    mutate,
  } = useCollection()

  const reverso = useMemo(() => {
    const out = collectionLoading ? [] : [...collection]
    out.reverse()
    return out
  }, [collection, collectionLoading])

  if (liveLoading || collectionLoading) return <div>Loadink</div>

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-3 mt-6">
      {reverso.map((id: string) => (
        <AntCard id={id} liveData={liveData} key={id} mutate={mutate} />
      ))}
    </ul>
  )
}

export default AntList
