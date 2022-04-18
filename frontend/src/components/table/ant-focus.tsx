import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { Link, useSearchParams } from 'react-router-dom'
import { addToCollection, removeFromCollection } from '../../api/collection'
import useAuth from '../../hooks/use-auth'
import useCollection from '../../hooks/use-collection'

import antImage from '../../res/ant.svg'
import { PlusIcon } from '../../res/icons'

const AntFocus = () => {
  const [searchParams] = useSearchParams()
  // const { loading, liveData } = useContext(LiveDataContext)

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

  if (!antId || loading) return null

  const onAdd = async () => {
    await addToCollection(antId)
    mutate()
    toast.success('Added Ant to collection!')
  }

  const onRemove = async () => {
    await removeFromCollection(antId)
    mutate()
    toast.success('Remove Ant from collection.')
  }

  return (
    <div className="absolute flex bottom-0 w-full">
      <div className="mx-auto h-40 pb-10 bg-white shadow-lg rounded-t-xl w-96 flex flex-row">
        <img
          src={antImage}
          width={100}
          height={100}
          alt="Ant Preview"
          className="mt-6 mx-4 -rotate-90"
        />
        <div className="mt-4 mr-3">
          <h2 className="text-xl">{antId}</h2>
          {loggedIn ? (
            <button
              type="button"
              className={`${
                hasAnt ? 'border-[1px]' : 'bg-blue-500 text-white'
              } px-3 py-2 mt-2 rounded-md shadow hover:shadow-lg duration-100 flex gap-2`}
              onClick={hasAnt ? onRemove : onAdd}
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
    </div>
  )
}

export default AntFocus
