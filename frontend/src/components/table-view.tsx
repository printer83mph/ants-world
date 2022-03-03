import { useEffect, useRef } from 'react'
import useTableZoom from '../hooks/use-table-zoom'
import { AntData } from '../types'
import Ant from './ant'

const TableView = () => {
  const tableRef = useRef<HTMLDivElement>(null)
  const { setZoom, translate, zoom } = useTableZoom(tableRef)

  const ants: AntData[] = [
    {
      position: { x: 10, y: 40 },
      id: 'ant1',
    },
  ]

  return (
    <div className="absolute w-screen h-screen flex flex-col justify-center items-center overflow-hidden">
      <div
        className="relative w-[500px] h-[300px] bg-[linear-gradient(black,gray)]"
        ref={tableRef}
      >
        {ants.map((ant) => (
          <Ant initialData={ant} />
        ))}
      </div>
    </div>
  )
}

export default TableView
