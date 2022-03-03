import { useCallback, useEffect, useRef, useState } from 'react'
import useControls from '../hooks/use-controls'
import useLiveData from '../hooks/use-live-data'
import useTableZoom from '../hooks/use-table-zoom'
import { ClientAntData } from '../types'
import Ant from './ant'

const TableView = () => {
  const tableRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { setZoom, translate, zoom } = useTableZoom(tableRef)

  const [ants, setAnts] = useState<ClientAntData[]>([
    {
      position: { x: 10, y: 40 },
      id: 'ant1',
    },
  ])

  useLiveData((data: { ants: ClientAntData[] }) => {
    setAnts(data.ants)
  })

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
        translate(dx * 2, dy * 2)
      },
      [translate]
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
        {ants.map((ant) => (
          <Ant data={ant} key={ant.id} />
        ))}
      </div>
    </div>
  )
}

export default TableView
