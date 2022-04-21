import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

import AntList from '../components/collection/ant-list'
import Nav from '../components/nav'

const OtherCollectionPage = () => {
  const { username } = useParams()
  return (
    <>
      <Nav />
      <div className="mt-24 container mx-auto px-2 [max-height:calc(100vh-6rem)] overflow-y-scroll">
        <motion.h1
          className="text-4xl font-semibold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🔎 {username}&apos;s Ants Collection
        </motion.h1>
        <AntList username={username} />
      </div>
    </>
  )
}

export default OtherCollectionPage
