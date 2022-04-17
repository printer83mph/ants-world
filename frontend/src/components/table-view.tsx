import { useCallback, useRef, useState } from 'react'
import useControls from '../hooks/use-controls'
import useLiveData from '../hooks/use-live-data'
import useTableZoom from '../hooks/use-table-zoom'
import { LiveData } from '../types'
import Ants from './ants'

const TableView = () => {
  const tableRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { pan, zoom } = useTableZoom(tableRef)

  const [liveData, setLiveData] = useState<LiveData>({
    ants: [],
    crumbs: [],
    pheremones: [],
  })

  useLiveData<LiveData>(
    useCallback((newLiveData) => {
      setLiveData(newLiveData)
    }, [])
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

  return (
    <div
      className="absolute w-screen h-screen flex flex-col justify-center items-center overflow-hidden"
      ref={containerRef}
    >
      <div
        className="relative w-[500px] h-[300px] bg-[linear-gradient(black,gray)]"
        ref={tableRef}
      >
        <Ants liveData={liveData} />
      </div>
    </div>
  )
}

export default TableView
