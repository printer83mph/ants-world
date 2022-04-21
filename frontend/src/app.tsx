import { Route, Routes } from 'react-router-dom'
import { useCallback, useRef } from 'react'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/home'
import CollectionPage from './pages/collection'
import LiveDataContext from './context/live-data-context'
import useLiveData from './hooks/use-live-data'
import { LiveData } from './types'
import LoginPage from './pages/login'
import NotFoundPage from './pages/not-found'
import OtherCollectionPage from './pages/other-collection'

const App = () => {
  const liveData = useRef<LiveData>({
    ants: [],
    crumbs: [],
  })

  const { loading } = useLiveData<LiveData>(
    useCallback((newLiveData) => {
      liveData.current = newLiveData
    }, [])
  )

  return (
    // @ts-ignore
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <LiveDataContext.Provider value={{ loading, liveData }}>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/collection/:username" element={<OtherCollectionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </LiveDataContext.Provider>
  )
}

export default App
