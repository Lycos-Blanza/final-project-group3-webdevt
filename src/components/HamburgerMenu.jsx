import React from 'react';
import '../css/HamburgerMenu.css';

export default function HamburgerMenu({ onClick }) {
  return (
    <button className="hamburger-menu" onClick={onClick} aria-label="Open menu">
      <span className="hamburger-bar"></span>
      <span className="hamburger-bar"></span>
      <span className="hamburger-bar"></span>
    </button>
  );
}
