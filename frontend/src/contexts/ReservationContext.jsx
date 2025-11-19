// src/contexts/ReservationContext.jsx → 100% FRONTEND ONLY
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNotification } from "./NotificationContext";

const ReservationContext = createContext();

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) throw new Error("useReservation must be used within ReservationProvider");
  return context;
};

const DURATION = 90; // 90 minutes

const isOverlapping = (a, b) => {
  if (a.date !== b.date || a.tableNumber !== b.tableNumber) return false;
  if (a.status === "Cancelled") return false;

  const toMin = t => t.split(":").reduce((h, m) => h * 60 + +m, 0);
  const s1 = toMin(a.timeSlot), e1 = s1 + DURATION;
  const s2 = toMin(b.timeSlot), e2 = s2 + DURATION;
  return s1 < e2 && s2 < e1;
};

export function ReservationProvider({ children }) {
  const [allReservations, setAllReservations] = useState([]);
  const { user } = useAuth();
  const notify = useNotification();

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("diner28_reservations");
    if (saved) {
      try {
        setAllReservations(JSON.parse(saved));
      } catch (e) {
        console.error("Corrupted reservations data");
      }
    }
  }, []);

  // Save every time it changes
  useEffect(() => {
    localStorage.setItem("diner28_reservations", JSON.stringify(allReservations));
  }, [allReservations]);

  const createReservation = async (data) => {
    // Prevent double booking
    const conflict = allReservations.some(r => isOverlapping(r, data));
    if (conflict) {
      notify("This table is already booked for that time!", "error");
      throw new Error("Conflict");
    }

    const newRes = {
      _id: Date.now().toString(),
      userId: user?._id || "guest",
      userName: user?.name || "Guest",
      userEmail: user?.email || "guest@diner28.com",
      status: "Pending",
      createdAt: new Date().toISOString(),
      ...data,
    };

    setAllReservations(prev => [...prev, newRes]);
    notify("Reservation submitted! Waiting for approval.", "success");
    return newRes;
  };

  const updateStatus = (id, status) => {
    setAllReservations(prev =>
      prev.map(r => r._id === id ? { ...r, status } : r)
    );
    notify(`Reservation ${status.toLowerCase()}`, "success");
  };

  const refetch = () => {
    const saved = localStorage.getItem("diner28_reservations");
    if (saved) setAllReservations(JSON.parse(saved));
  };

  const myReservations = allReservations.filter(r => r.userId === user?._id);

  return (
    <ReservationContext.Provider value={{
      allReservations,
      myReservations,
      createReservation,
      updateStatus,
      cancelReservation: (id) => updateStatus(id, "Cancelled"),
      confirmReservation: (id) => updateStatus(id, "Confirmed"),
      completeReservation: (id) => updateStatus(id, "Completed"),
      refetch,
    }}>
      {children}
    </ReservationContext.Provider>
  );
}