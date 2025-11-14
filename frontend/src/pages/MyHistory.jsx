import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function MyHistory() {
  const { reservations, user } = useAuth();

  if (!user) {
    return <div className="p-6">Please log in to view your history.</div>;
  }

  // Collect all unique keys from reservations
  const allKeys = Array.from(
    reservations.reduce((set, res) => {
      Object.keys(res).forEach(k => set.add(k));
      return set;
    }, new Set())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My History</h2>
      {reservations.length === 0 ? (
        <div>No reservations found.</div>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              {allKeys.map(key => (
                <th key={key} className="py-2 px-4 border-b capitalize">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reservations.map(res => (
              <tr key={res.id}>
                {allKeys.map(key => (
                  <td key={key} className="py-2 px-4 border-b">
                    {res[key] !== undefined && res[key] !== null ? res[key].toString() : '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
