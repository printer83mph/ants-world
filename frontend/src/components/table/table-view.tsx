import { useCallback, useContext, useRef } from 'react'
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
    <div
      className={`absolute w-screen h-screen flex flex-col justify-center items-center overflow-hidden ${
        loading ? 'opacity-0' : 'opacity-100'
      } duration-500`}
      ref={containerRef}
    >
      <div
        className="relative w-[500px] h-[300px] bg-[linear-gradient(#f9f9f9,#fefefe)] shadow-lg"
        ref={tableRef}
      >
        <Ants liveData={liveData} />
        <Crumbs liveData={liveData} />
        {/* <Pheremones liveData={liveData} /> */}
      </div>
    </div>
  )
}

export default TableView
