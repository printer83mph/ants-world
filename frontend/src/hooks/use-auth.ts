import useSWR from 'swr'
import fetcher from '../util/fetcher'

const useAuth = () => {
  const { data, error, mutate } = useSWR('/auth/me', fetcher)
  const loading = !data && !error
  const { username, loggedIn } = data || {}

  return { loading, username, loggedIn, fetchAuth: mutate }
}

export default useAuth
