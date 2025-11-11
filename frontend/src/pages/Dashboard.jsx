import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function getAllReservations() {
  const reservations = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('reservations_')) {
      const email = key.replace('reservations_', '');
      const userReservations = JSON.parse(localStorage.getItem(key));
      userReservations.forEach(r => {
        reservations.push({ ...r, email, status: r.status || 'processing' });
      });
    }
  }
  return reservations;
}

function updateReservationStatus(email, id, newStatus) {
  const key = `reservations_${email}`;
  const reservations = JSON.parse(localStorage.getItem(key)) || [];
  const updated = reservations.map(r =>
    r.id === id ? { ...r, status: newStatus } : r
  );
  localStorage.setItem(key, JSON.stringify(updated));
}

export default function Dashboard() {
  const { user } = useAuth();
  const [allReservations, setAllReservations] = useState([]);

  useEffect(() => {
    setAllReservations(getAllReservations().filter(r => r.status !== 'cancelled'));
  }, []);

  function handleStatusChange(email, id, newStatus) {
    updateReservationStatus(email, id, newStatus);
    setAllReservations(getAllReservations().filter(r => r.status !== 'cancelled'));
  }

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
    <>
      <div className="pt-[56px] mx-auto max-w-[1200px] px-4 bg-[#f6f0e7] min-h-screen">
        <h2 className="text-3xl font-bold mb-8 mt-10 text-center text-brandBrown">All Reservations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-brandBrown text-white">
                <th className="py-3 px-4 text-left">User Email</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Guests</th>
                <th className="py-3 px-4 text-left">Note</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {allReservations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 px-4 text-center text-gray-500">
                    No reservations found.
                  </td>
                </tr>
              ) : (
                allReservations.map((r, idx) => (
                  <tr key={r.id || idx} className="border-b">
                    <td className="py-2 px-4">{r.email}</td>
                    <td className="py-2 px-4">{r.date}</td>
                    <td className="py-2 px-4">{r.time}</td>
                    <td className="py-2 px-4">{r.guests}</td>
                    <td className="py-2 px-4">{r.note || <span className="text-gray-400 italic">No note</span>}</td>
                    <td className="py-2 px-4">
                      <select
                        value={r.status || 'processing'}
                        onChange={e => handleStatusChange(r.email, r.id, e.target.value)}
                        className="border rounded px-2 py-1 bg-white"
                      >
                        <option value="processing">Processing</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
