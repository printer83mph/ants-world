import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import StatsPage from './pages/stats'

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/stats" element={<StatsPage />} />
  </Routes>
)

export default App
