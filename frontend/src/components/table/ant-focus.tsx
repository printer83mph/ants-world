import { useContext, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useSearchParams } from 'react-router-dom'
import { addToCollection, removeFromCollection } from '../../api/collection'
import LiveDataContext from '../../context/live-data-context'
import useAuth from '../../hooks/use-auth'
import useCollection from '../../hooks/use-collection'

import antImage from '../../res/ant.svg'
import { PlusIcon, XIcon } from '../../res/icons'

const AntFocus = () => {
  const [posting, setPosting] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const { loading: liveDataLoading, liveData } = useContext(LiveDataContext)

  const { loading, ants, mutate } = useCollection()
  const { loggedIn } = useAuth()

  const antId = useMemo(() => {
    const params = new URLSearchParams(searchParams)
    return params.get('ant')
  }, [searchParams])

  const hasAnt = useMemo(
    () => ants && ants.indexOf(antId) !== -1,
    [ants, antId]
  )

  if (!antId || loading || liveDataLoading) return null

  const antExists = !!liveData.current.ants.find(({ id }) => id === antId)

  const onAdd = async () => {
    setPosting(true)
    try {
      await addToCollection(antId)
      await mutate()
      toast.success('Added Ant to collection!')
    } catch (err) {
      toast.error('Something went wrong.')
    }
    setPosting(false)
  }

  const onRemove = async () => {
    setPosting(true)
    try {
      await removeFromCollection(antId)
      await mutate()
      toast.success('Removed Ant from collection.')
    } catch (err) {
      toast.error('Something went wrong.')
    }
    setPosting(false)
  }

  return (
    <div className="absolute flex bottom-0 w-full">
      {antExists ? (
        <div className="mx-auto h-40 pb-10 bg-white shadow-lg rounded-t-xl w-[26rem] flex flex-row">
          <img
            src={antImage}
            width={100}
            height={100}
            alt="Ant Preview"
            className="mt-6 mx-4 -rotate-90"
          />
          <div className="mt-4 mr-3">
            <div className="flex items-start">
              <h2 className="text-xl mb-2 font-mono">{antId}</h2>
              <button
                type="button"
                onClick={() => setSearchParams('')}
                className="opacity-40 hover:opacity-100 hover:drop-shadow-lg duration-100"
              >
                <XIcon />
              </button>
            </div>
            {loggedIn ? (
              <button
                type="button"
                className={`${
                  hasAnt ? 'border-[1px]' : 'bg-blue-500 text-white font-medium'
                } ${
                  posting && 'opacity-40'
                } px-3 py-2 mt-2 rounded-md shadow hover:shadow-lg duration-100 flex gap-2`}
                onClick={hasAnt ? onRemove : onAdd}
                disabled={posting}
              >
                {hasAnt ? (
                  <>Remove from Collection</>
                ) : (
                  <>
                    <PlusIcon /> Add to Collection
                  </>
                )}
              </button>
            ) : (
              <div className="">
                <Link to="/login" className="">
                  Log in
                </Link>{' '}
                <span className="opacity-40">
                  to add Ants to your very own Ants collection!
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mx-auto h-40 pb-10 bg-white shadow-lg rounded-t-xl w-[26rem] flex justify-center items-center text-2xl">
          Ant not found!
        </div>
      )}
    </div>
  )
}

export default AntFocus
