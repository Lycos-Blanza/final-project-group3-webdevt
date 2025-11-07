import './App.css'
import Homepage from './pages/Homepage'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Homepage />
    </AuthProvider>
  )
}

export default App
