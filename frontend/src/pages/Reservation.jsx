// src/pages/Reservation.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTables } from '../contexts/TablesContext';
import { useAvailability } from '../hooks/useAvailability';
import PaymentModal from '../components/PaymentModal';

export default function Reservation() {
  const { user, addReservation, STATUS } = useAuth();
  const { tables } = useTables();
  const { isSlotAvailable } = useAvailability();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState('');
  const [tableId, setTableId] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [pendingRes, setPendingRes] = useState(null);

  const today = new Date().toISOString().split('T')[0];
  const minTime = "07:30", maxTime = "21:00";

  const addOneAndHalfHours = (t) => {
    const [h, m] = t.split(':').map(Number);
    const d = new Date(0, 0, 0, h, m);
    d.setMinutes(d.getMinutes() + 90);
    return d.toTimeString().slice(0,5);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSlotAvailable(date, time, guests)) {
      alert('Slot not available for selected guests');
      return;
    }

    const endTime = addOneAndHalfHours(time);
    const res = { date, time, endTime, guests: Number(guests), note, tableId: Number(tableId), status: STATUS.PENDING };
    setPendingRes(res);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    addReservation({ ...pendingRes, id: Date.now() });
    alert('Reservation confirmed! Payment received.');
    setShowPayment(false);
    setPendingRes(null);
    setDate(''); setTime(''); setGuests(1); setNote(''); setTableId('');
  };

  if (!user) return <div className="p-8 text-center">Please login</div>;

  return (
    <div className="pt-[56px] p-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Make Reservation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} min={today} required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label>Time</label>
            <input type="time" value={time} onChange={e => setTime(e.target.value)} min={minTime} max={maxTime} required className="w-full p-2 border rounded" />
            {time && <small>Ends: {addOneAndHalfHours(time)}</small>}
          </div>
          <div>
            <label>Guests</label>
            <input type="number" value={guests} onChange={e => setGuests(e.target.value)} min="1" max="20" required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label>Table</label>
            <select value={tableId} onChange={e => setTableId(e.target.value)} required className="w-full p-2 border rounded">
              <option value="">Select Table</option>
              {tables.map(t => (
                <option key={t.id} value={t.id}>Table {t.number} ({t.capacity} seats)</option>
              ))}
            </select>
          </div>
          <div>
            <label>Note</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} className="w-full p-2 border rounded" rows="2" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">Reserve & Pay</button>
        </form>
      </div>
      {showPayment && <PaymentModal reservation={pendingRes} onSuccess={handlePaymentSuccess} onClose={() => setShowPayment(false)} />}
    </div>
  );
}