import React, { useRef, useState } from 'react';
import '../css/Sidebar.css';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import SidebarMenu from './SidebarMenu';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar({ open, onClose }) {
  const sidebarRef = useRef();
  const [showSignUp, setShowSignUp] = useState(false);
  const { user } = useAuth();

  function handleBackdropClick(e) {
    if (e.target === sidebarRef.current) {
      onClose();
    }
  }

  return (
    <div
      ref={sidebarRef}
      className={`sidebar-backdrop${open ? ' open' : ''}`}
      onClick={handleBackdropClick}
      tabIndex={-1}
    >
      <div className={`sidebar${open ? ' open' : ''}`}>
        <button className="sidebar-close" onClick={onClose} aria-label="Close">&times;</button>
        {!user ? (
          <>
            <div className="sidebar-title">{showSignUp ? 'Sign In' : 'Log-In'}</div>
            {!showSignUp ? (
              <LogInForm onSignUpClick={() => setShowSignUp(true)} />
            ) : (
              <SignUpForm onLogInClick={() => setShowSignUp(false)} />
            )}
          </>
        ) : (
          <SidebarMenu onClose={onClose} />
        )}
      </div>
    </div>
  );
}
