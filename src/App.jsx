import './App.css'
import Homepage from './pages/Homepage'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Reservation from './components/Reservation'
import MyReservations from './pages/MyReservations'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/reserve" element={<Reservation />} />
          <Route path="/my-reservations" element={<MyReservations />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
