import { Link } from 'react-router-dom'
import AntList from '../components/collection/ant-list'
import Nav from '../components/nav'
import useAuth from '../hooks/use-auth'

const CollectionPage = () => {
  const { loggedIn, username, loading } = useAuth()
  return (
    <>
      <Nav />
      {loading || (
        <div className="mt-24 container mx-auto px-2 [max-height:calc(100vh-6rem)] overflow-y-scroll">
          <h1 className="text-4xl font-semibold tracking-tight">
            🔎 Ants Collection
          </h1>
          {loggedIn ? (
            <>
              <p className="my-5 text-gray-500 tracking-wide">
                Collection Link:{' '}
                <Link
                  to={`/collection/${username}`}
                  className="hover:text-black hover:drop-shadow-md duration-100"
                >
                  http://{window.location.host}/collection/{username}
                </Link>
              </p>
              <AntList />
            </>
          ) : (
            <div className="text-xl text-gray-500 mt-5">
              <Link to="/login" className="text-black drop-shadow-sm">
                Log in
              </Link>{' '}
              to collect ants!
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default CollectionPage
