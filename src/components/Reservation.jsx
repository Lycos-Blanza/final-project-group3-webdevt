import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Topbar from './Topbar';
import '../css/Reservation.css';

export default function Reservation() {
  const { user, addReservation } = useAuth();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);

  if (!user) {
    return (
      <>
        <Topbar />
        <Link to="/" className="reservation-back-link">← Back</Link>
        <div className="reservation-page-wrapper">
          <div className="reservation-container">
            <h2>Reservation</h2>
            <div className="reservation-login-message">
              You must <b>login</b> to access this feature.
            </div>
          </div>
        </div>
      </>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReservation = {
      id: Date.now(),
      date,
      time,
      guests: Number(guests)
    };
    addReservation(newReservation);
    alert(`Reserved for ${guests} guest(s) on ${date} at ${time}`);
    // Optionally reset form fields here
    setDate('');
    setTime('');
    setGuests(1);
  };

  return (
    <>
      <Topbar />
      <Link to="/" className="reservation-back-link">← Back</Link>
      <div className="reservation-page-wrapper">
        <div className="reservation-container">
          <h2>Make a Reservation</h2>
          <form className="reservation-form" onSubmit={handleSubmit}>
            <label>
              Date:
              <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
            </label>
            <label>
              Time:
              <input type="time" value={time} onChange={e => setTime(e.target.value)} required />
            </label>
            <label>
              Number of Guests:
              <input type="number" min="1" max="20" value={guests} onChange={e => setGuests(e.target.value)} required />
            </label>
            <button type="submit">Reserve</button>
          </form>
        </div>
      </div>
    </>
  );
}
