import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function History() {
  const { user, getAllReservations } = useAuth();

  if (!user || user.role !== 'admin') {
    return (
      <div className="p-8 text-center text-red-500">
        Access denied. Admins only.
      </div>
    );
  }

  const reservations = getAllReservations();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">All Reservations History</h1>
      {reservations.length === 0 ? (
        <div className="text-gray-500">No reservations found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">User Email</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Time</th>
                <th className="py-2 px-4 border-b">Guests</th>
                <th className="py-2 px-4 border-b">Note</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res, idx) => (
                <tr key={res.id || idx} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{res.id || '-'}</td>
                  <td className="py-2 px-4 border-b">{res.email}</td>
                  <td className="py-2 px-4 border-b">{res.date || '-'}</td>
                  <td className="py-2 px-4 border-b">{res.time || '-'}</td>
                  <td className="py-2 px-4 border-b">{res.guests || '-'}</td>
                  <td className="py-2 px-4 border-b">{res.note || '-'}</td>
                  <td className="py-2 px-4 border-b">{res.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
