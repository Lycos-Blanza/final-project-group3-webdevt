import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function UpdateReservationButton({ reservation }) {
  const { user, reservations, updateReservation } = useAuth();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(reservation.date);
  const [time, setTime] = useState(reservation.time);
  const [guests, setGuests] = useState(reservation.guests);
  const [note, setNote] = useState(reservation.note || "");

  // Helper to add 1.5 hours to a time string (HH:mm)
  function addOneAndHalfHours(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    const dateObj = new Date(0, 0, 0, h, m);
    dateObj.setMinutes(dateObj.getMinutes() + 90);
    return dateObj.toTimeString().slice(0,5);
  }

  const today = new Date().toISOString().split('T')[0];
  const minTime = "07:30";
  const maxTime = "21:00";

  const handleUpdate = (e) => {
    e.preventDefault();
    updateReservation({
      ...reservation,
      date,
      time,
      endTime: addOneAndHalfHours(time),
      guests: Number(guests),
      note
    });
    setOpen(false);
  };

  // Only allow update if not approved/rejected
  const canUpdate = !["approved", "rejected"].includes(reservation.status);

  return (
    <>
      <button
        className="ml-2 px-3 py-1 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
        onClick={() => setOpen(true)}
        disabled={!canUpdate}
        title={canUpdate ? "Update reservation" : "Cannot update after confirmation"}
      >
        Update
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <form
            onSubmit={handleUpdate}
            className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] flex flex-col gap-4"
          >
            <h3 className="text-lg font-bold mb-2">Update Reservation</h3>
            <label>
              Date:
              <input
                type="date"
                value={date}
                min={today}
                onChange={e => setDate(e.target.value)}
                required
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
            <label>
              Time:
              <input
                type="time"
                value={time}
                min={minTime}
                max={maxTime}
                onChange={e => setTime(e.target.value)}
                required
                className="mt-1 p-2 border rounded w-full"
              />
              {time && (
                <span className="text-xs text-gray-600">
                  Block: {time} - {addOneAndHalfHours(time)}
                </span>
              )}
            </label>
            <label>
              Guests:
              <input
                type="number"
                min="1"
                max="20"
                value={guests}
                onChange={e => setGuests(e.target.value)}
                required
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
            <label>
              Note:
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                rows={2}
                className="mt-1 p-2 border rounded w-full resize-none"
                placeholder="Special requests..."
              />
            </label>
            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded font-semibold"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
