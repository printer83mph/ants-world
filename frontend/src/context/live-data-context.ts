import { createContext } from 'react'

const LiveDataContext = createContext({
  liveData: { current: { ants: [], crumbs: [] } },
  loading: false,
})

export default LiveDataContext
