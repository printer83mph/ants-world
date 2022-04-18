import useSWR from 'swr'
import fetcher from '../util/fetcher'

const useDeadAnts = () => {
  const { data, error, mutate } = useSWR('/table/dead', fetcher)

  const loading = !data && !error

  const deadAnts = data && data.deadAnts

  return { loading, deadAnts, error, mutate }
}

export default useDeadAnts
