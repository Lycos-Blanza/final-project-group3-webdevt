import React from 'react';
import '../css/SidebarMenu.css';
import { useAuth } from '../contexts/AuthContext';

export default function SidebarMenu({ onClose }) {
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    if (onClose) onClose();
  }

  return (
    <div className="sidebar-menu">
      <div className="sidebar-welcome">Welcome, {user?.email}</div>
      <ul className="sidebar-links">
        <li><button className="sidebar-link" onClick={onClose}>Home</button></li>
        <li><button className="sidebar-link" onClick={onClose}>My Reservations</button></li>
        <li><button className="sidebar-link" onClick={onClose}>Contact Us</button></li>
      </ul>
      <hr className="sidebar-divider" />
      <button className="sidebar-logout" onClick={handleLogout}>Logout</button>
    </div>
  );
}
