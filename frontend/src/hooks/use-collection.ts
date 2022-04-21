import useSWR from 'swr'
import fetcher from '../util/fetcher'

const useCollection = (username?: string) => {
  const { data, error, mutate } = useSWR(
    `/collection-api${username ? `/${username}` : ''}`,
    fetcher
  )

  const loading = !data && !error

  const ants = data && data.ants

  return { loading, ants, error, mutate }
}

export default useCollection
