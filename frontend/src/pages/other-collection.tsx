import { useParams } from 'react-router-dom'
import AntList from '../components/collection/ant-list'
import Nav from '../components/nav'

const OtherCollectionPage = () => {
  const { username } = useParams()
  return (
    <>
      <Nav />
      <div className="mt-24 container mx-auto px-2 [max-height:calc(100vh-6rem)] overflow-y-scroll">
        <h1 className="text-4xl font-semibold mb-6">
          🔎 {username}&apos;s Ants Collection
        </h1>
        <AntList username={username} />
      </div>
    </>
  )
}

export default OtherCollectionPage
