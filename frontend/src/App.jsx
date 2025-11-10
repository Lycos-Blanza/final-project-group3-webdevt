import './App.css'
import Homepage from './pages/Homepage'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Reservation from './pages/Reservation'
import MyReservations from './pages/MyReservations'
import Dashboard from './pages/Dashboard'
import ContactUs from './pages/ContactUs'
import Messages from './pages/Messages'
import History from './pages/History'
import Topbar from './components/Topbar'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Topbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/reserve" element={<Reservation />} />
          <Route path="/my-reservations" element={<MyReservations />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
