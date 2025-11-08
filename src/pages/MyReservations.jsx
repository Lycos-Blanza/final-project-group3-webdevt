import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Topbar from '../components/Topbar';
import '../css/MyReservations.css';
import { Link } from 'react-router-dom';

export default function MyReservations() {
  const { user, reservations } = useAuth();

  if (!user) {
    return (
      <>
        <Topbar />
        <Link to="/" className="myreservations-back-link">← Back</Link>
        <div className="myreservations-page-wrapper">
          <div className="myreservations-container">
            <h2>My Reservations</h2>
            <div className="myreservations-login-message">
              You must <b>login</b> to access this feature.
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Topbar />
      <Link to="/" className="myreservations-back-link">← Back</Link>
      <div className="myreservations-page-wrapper">
        <div className="myreservations-container">
          <h2>My Reservations</h2>
          {reservations.length === 0 ? (
            <div className="myreservations-empty">No reservations found.</div>
          ) : (
            <ul className="myreservations-list">
              {reservations.map(res => (
                <li key={res.id} className="myreservations-item">
                  <span>Date: {res.date}</span>
                  <span>Time: {res.time}</span>
                  <span>Guests: {res.guests}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
