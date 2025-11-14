import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { TablesProvider } from "./contexts/TablesContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Homepage from "./pages/Homepage";
import Reservation from "./pages/Reservation";
import MyReservations from "./pages/MyReservations";
import Dashboard from "./pages/Dashboard";
import ContactUs from "./pages/ContactUs";
import Messages from "./pages/Messages";
import History from "./pages/History";
import MyHistory from "./pages/MyHistory";
import AdminTables from './pages/AdminTables';

function App() {
  return (
    <AuthProvider>
      <TablesProvider>
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
            <Route path="/my-history" element={<MyHistory />} />
            <Route path="/admin-tables" element={<AdminTables />} />
          </Routes>
        </Router>
      </TablesProvider>
    </AuthProvider>
  );
}

export default App;
