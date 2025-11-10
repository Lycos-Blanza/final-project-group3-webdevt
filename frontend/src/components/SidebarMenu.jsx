import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SidebarMenu({ onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
    if (onClose) onClose();
  }

  function handleHomeClick() {
    navigate('/');
    if (onClose) onClose();
  }

  return (
    <div className="flex flex-col items-start py-6">
      <div className="text-[#333] text-[1.2em] font-bold mb-5">
        Welcome, {user?.email}
      </div>

      <ul className="list-none p-0 m-0 mb-4 w-full">
        {user?.role === 'admin' ? (
          <>
            <li>
              <button
                className="bg-none border-0 text-[#333] text-[1em] text-left py-2 w-full cursor-pointer hover:text-[#007bff]"
                onClick={handleHomeClick}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className="bg-none border-0 text-[#333] text-[1em] text-left py-2 w-full cursor-pointer hover:text-[#007bff]"
                onClick={() => {
                  navigate('/dashboard');
                  if (onClose) onClose();
                }}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                className="bg-none border-0 text-[#333] text-[1em] text-left py-2 w-full cursor-pointer hover:text-[#007bff]"
                onClick={() => {
                  navigate('/messages');
                  if (onClose) onClose();
                }}
              >
                Messages
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button
                className="bg-none border-0 text-[#333] text-[1em] text-left py-2 w-full cursor-pointer hover:text-[#007bff]"
                onClick={handleHomeClick}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className="bg-none border-0 text-[#333] text-[1em] text-left py-2 w-full cursor-pointer hover:text-[#007bff]"
                onClick={() => {
                  navigate('/my-reservations');
                  if (onClose) onClose();
                }}
              >
                My Reservations
              </button>
            </li>
            <li>
              <button
                className="bg-none border-0 text-[#333] text-[1em] text-left py-2 w-full cursor-pointer hover:text-[#007bff]"
                onClick={() => {
                  navigate('/contact-us');
                  if (onClose) onClose();
                }}
              >
                Contact Us
              </button>
            </li>
          </>
        )}
      </ul>

      <hr className="w-full border-0 border-t border-[#ddd] my-4" />

      <button
        className="bg-[#e74c3c] text-white border-0 py-[10px] px-[18px] rounded cursor-pointer text-[1em] hover:bg-[#c0392b]"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
