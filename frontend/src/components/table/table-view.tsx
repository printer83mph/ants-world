import { useCallback, useContext, useRef } from 'react'
import { motion } from 'framer-motion'

import LiveDataContext from '../../context/live-data-context'
import useControls from '../../hooks/use-controls'
import useTableZoom from '../../hooks/use-table-zoom'
import Ants from './ants'
import Crumbs from './crumbs'

const TableView = () => {
  const tableRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { pan, zoom } = useTableZoom(tableRef)
  const { loading, liveData } = useContext(LiveDataContext)

  useControls(
    containerRef,
    useCallback(
      (dy) => {
        zoom(1 - dy * 0.001)
      },
      [zoom]
    ),
    useCallback(
      (dx, dy) => {
        pan(dx * 4, dy * 4)
      },
      [pan]
    )
  )

  return (
    <motion.div
      className="absolute w-screen h-screen flex flex-col justify-center items-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      ref={containerRef}
    >
      <div
        className="relative w-[500px] h-[300px] bg-[linear-gradient(#f9f9f9,#fefefe)] shadow-lg"
        ref={tableRef}
      >
        {loading || (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Ants liveData={liveData} />
            <Crumbs liveData={liveData} />
            {/* <Pheremones liveData={liveData} /> */}
          </motion.div>
        )}{' '}
      </div>
    </motion.div>
  )
}

export default TableView
