import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import CollectionPage from './pages/collection'

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/collection" element={<CollectionPage />} />
  </Routes>
)

export default App
