import { useCallback, useRef, useState } from 'react'
import useControls from '../hooks/use-controls'
import useLiveData from '../hooks/use-live-data'
import useTableZoom from '../hooks/use-table-zoom'
import { LiveData } from '../types'
import Ant from './ant'

const TableView = () => {
  const tableRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { pan, zoom } = useTableZoom(tableRef)

  const [liveData, setLiveData] = useState<
    { loading: true } | (LiveData & { loading: boolean })
  >({ loading: true })

  useLiveData<LiveData>(
    useCallback(
      (newLiveData) => {
        setLiveData({ ...newLiveData, loading: false })
      },
      [setLiveData]
    )
  )

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

  const { loading, ants, crumbs, pheremones } = liveData

  return (
    <div
      className="absolute w-screen h-screen flex flex-col justify-center items-center overflow-hidden"
      ref={containerRef}
    >
      {loading || (
        <div
          className="relative w-[500px] h-[300px] bg-[linear-gradient(black,gray)]"
          ref={tableRef}
        >
          {ants.map((ant) => (
            <Ant data={ant} key={ant.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TableView
