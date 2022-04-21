import { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import LiveDataContext from '../../context/live-data-context'
import useCollection from '../../hooks/use-collection'
import AntCard from './ant-card'

export interface AntListProps {
  username?: string
}

const AntList = ({ username }: AntListProps) => {
  const { liveData, loading: liveLoading } = useContext(LiveDataContext)
  const {
    error,
    loading: collectionLoading,
    ants: collection,
    mutate,
  } = useCollection(username)

  const reverso = useMemo(() => {
    const out = error || collectionLoading ? [] : [...collection]
    out.reverse()
    return out
  }, [collection, collectionLoading, error])

  if (error) return <div className="text-xl">404 - User not found.</div>

  if (liveLoading || collectionLoading) return <ul className="opacity-0" />

  if (reverso.length === 0) {
    return (
      <div className="text-lg">
        You have no Ants in your collection! Go add some from the{' '}
        <Link to="/">Table</Link>.
      </div>
    )
  }

  return (
    <motion.ul
      className="opacity-100 duration-100 grid grid-cols-2 lg:grid-cols-3"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {reverso.map((id: string) => (
        <AntCard
          id={id}
          liveData={liveData}
          key={id}
          mutate={mutate}
          isOwner={!username}
        />
      ))}
    </motion.ul>
  )
}

export default AntList
