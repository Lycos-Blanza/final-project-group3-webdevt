import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Topbar from '../components/Topbar';

export default function Reservation() {
  const { user, addReservation } = useAuth();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReservation = {
      id: Date.now(),
      date,
      time,
      guests: Number(guests),
      note
    };
    addReservation(newReservation);
    alert(`Reserved for ${guests} guest(s) on ${date} at ${time}`);

    setDate('');
    setTime('');
    setGuests(1);
    setNote('');
  };

  return (
    <>
      <Topbar />

      {/* page container */}
      <div className="pt-[56px] mx-auto max-w-[1200px] px-4 bg-[#f6f0e7] min-h-screen relative">

        {/* Back button */}
        <Link
          to="/"
          className="
          absolute top-[72px] left-0 z-10 inline-block
          text-[#222] no-underline font-medium text-[1rem]
          transition-colors duration-200
          bg-white px-3 py-1 rounded-md
          shadow-[0_2px_8px_rgba(0,0,0,0.04)]
          hover:text-[#c00]
        "
        >
          ← Back
        </Link>

        {/* center content */}
        <div className="flex justify-center items-start pt-20 pb-20">
          <div className="text-[#222] bg-white rounded-2xl shadow-lg p-10 max-w-[450px] w-full">
            <h2 className="text-2xl font-bold mb-8 text-center">Make a Reservation</h2>

            {!user ? (
              <div className="mt-8 text-red-700 font-medium text-lg bg-[#ffeaea] p-4 rounded-lg text-center">
                You must <b>login</b> to access this feature.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <label className="flex flex-col text-left font-medium">
                  Date:
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                    className="mt-2 p-2 border border-gray-300 rounded-lg"
                  />
                </label>

                <label className="flex flex-col text-left font-medium">
                  Time:
                  <input
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    required
                    className="mt-2 p-2 border border-gray-300 rounded-lg"
                  />
                </label>

                <label className="flex flex-col text-left font-medium">
                  Number of Guests:
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={guests}
                    onChange={e => setGuests(e.target.value)}
                    required
                    className="mt-2 p-2 border border-gray-300 rounded-lg"
                  />
                </label>

                <label className="flex flex-col text-left font-medium">
                  Note (optional):
                  <textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    className="mt-2 p-2 border border-gray-300 rounded-lg resize-none"
                    rows={3}
                    placeholder="Add any special requests or notes..."
                  />
                </label>

                <button
                  type="submit"
                  className="
                    bg-brandBrown text-white font-bold text-lg tracking-wide
                    rounded-full px-8 py-3 mt-6 shadow-md
                    transition-transform
                    hover:scale-105 hover:shadow-lg
                  "
                >
                  RESERVE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
