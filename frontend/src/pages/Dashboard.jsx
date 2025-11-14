// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ReservationStatusUpdater from '../components/ReservationStatusUpdater';

export default function Dashboard() {
  const { user, getAllReservations, STATUS } = useAuth();
  const [allReservations, setAllReservations] = useState([]);

  useEffect(() => {
    setAllReservations(getAllReservations());
  }, []);

  const updateReservationStatus = (email, id, newStatus) => {
    const key = `reservations_${email}`;
    const reservations = JSON.parse(localStorage.getItem(key)) || [];
    const updated = reservations.map(r =>
      r.id === id ? { ...r, status: newStatus } : r
    );
    localStorage.setItem(key, JSON.stringify(updated));
    setAllReservations(getAllReservations());
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 text-red-700 p-6 rounded-lg shadow-lg">
          Access denied. Admins only.
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[56px] mx-auto max-w-5xl px-4 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 mt-10 text-center text-gray-900">All Reservations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 text-left font-semibold">User Email</th>
              <th className="py-3 px-4 text-left font-semibold">Date</th>
              <th className="py-3 px-4 text-left font-semibold">Time</th>
              <th className="py-3 px-4 text-left font-semibold">Guests</th>
              <th className="py-3 px-4 text-left font-semibold">Note</th>
              <th className="py-3 px-4 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {allReservations.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 px-4 text-center text-gray-500">
                  No reservations found.
                </td>
              </tr>
            ) : (
              allReservations.map((r) => (
                <tr key={r.id} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{r.email}</td>
                  <td className="py-3 px-4">{r.date}</td>
                  <td className="py-3 px-4">
                    {r.time} - {r.endTime || <span className="text-gray-400 italic">?</span>}
                  </td>
                  <td className="py-3 px-4">{r.guests}</td>
                  <td className="py-3 px-4">{r.note || <span className="text-gray-400 italic">No note</span>}</td>
                  <td className="py-3 px-4">
                    <ReservationStatusUpdater
                      status={r.status}
                      STATUS={STATUS}
                      onUpdate={newStatus => updateReservationStatus(r.email, r.id, newStatus)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}