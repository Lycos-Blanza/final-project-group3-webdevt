import React from 'react';
import '../css/SidebarMenu.css';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SidebarMenu({ onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    if (onClose) onClose();
  }

  function handleHomeClick() {
    navigate('/');
    if (onClose) onClose();
  }

  return (
    <div className="sidebar-menu">
      <div className="sidebar-welcome">Welcome, {user?.email}</div>
      <ul className="sidebar-links">
        {user?.role === 'admin' ? (
          <li>
            <button className="sidebar-link" onClick={onClose}>
              Dashboard
            </button>
          </li>
        ) : (
          <>
            <li>
              <button className="sidebar-link" onClick={handleHomeClick}>
                Home
              </button>
            </li>
            <li>
              <button
                className="sidebar-link"
                onClick={() => {
                  navigate('/my-reservations');
                  if (onClose) onClose();
                }}
              >
                My Reservations
              </button>
            </li>
            <li>
              <button className="sidebar-link" onClick={onClose}>
                Contact Us
              </button>
            </li>
          </>
        )}
      </ul>
      <hr className="sidebar-divider" />
      <button className="sidebar-logout" onClick={handleLogout}>Logout</button>
    </div>
  );
}
