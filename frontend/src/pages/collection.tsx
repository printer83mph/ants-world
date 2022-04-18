import AntList from '../components/collection/ant-list'
import Nav from '../components/nav'
import useAuth from '../hooks/use-auth'

const CollectionPage = () => {
  const { loggedIn, loading } = useAuth()
  return (
    <>
      <Nav />
      {loading || (
        <div className="mt-20 container mx-auto px-2">
          <h1 className="text-4xl font-semibold">Ants Collection</h1>
          {loggedIn ? (
            <AntList />
          ) : (
            <div className="mt-5 text-xl"> Log in to collect ants! </div>
          )}
        </div>
      )}
    </>
  )
}

export default CollectionPage
