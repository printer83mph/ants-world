import { useRef } from 'react'

const TableView = () => {
  const boardRef = useRef<HTMLDivElement>(null)
  return (
    <div className="absolute w-screen h-screen flex flex-col justify-center items-center overflow-hidden">
      <div
        className="relative w-[500px] h-[300px] bg-[linear-gradient(black,white)]"
        ref={boardRef}
      />
    </div>
  )
}

export default TableView
