// src/App.jsx → FINAL WORKING VERSION (NO ERRORS)
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PROVIDERS — ORDER MATTERS!
import { NotificationProvider } from "./contexts/NotificationContext";
import { AuthProvider } from "./contexts/AuthContext";
import { TablesProvider } from "./contexts/TablesContext";
import { ReservationProvider } from "./contexts/ReservationContext";  // ← THIS WAS MISSING!

// PAGES
import Homepage from "./pages/Homepage";
import Reservation from "./pages/Reservation";
import CustomerReservations from "./pages/CustomerReservations";
import MyHistory from "./pages/MyHistory";
import MyProfile from "./pages/MyProfile";
import Dashboard from "./pages/Dashboard";
import AdminTables from "./pages/AdminTables";
import Messages from "./pages/Messages";
import ContactUs from "./pages/ContactUs";
import MenuPage from "./pages/MenuPage";

// COMPONENTS
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";

function AppLayout({ children }) {
  return (
    <>
      <Topbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <TablesProvider>
            <ReservationProvider>   {/* ← THIS IS THE FIX */}
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/reserve" element={<Reservation />} />
                  <Route path="/my-reservations" element={<CustomerReservations />} />
                  <Route path="/my-history" element={<MyHistory />} />
                  <Route path="/profile" element={<MyProfile />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/admin-tables" element={<AdminTables />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/menu" element={<MenuPage />} />
                  {/* Add more routes as needed */}
                </Routes>
              </AppLayout>
            </ReservationProvider>
          </TablesProvider>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
}