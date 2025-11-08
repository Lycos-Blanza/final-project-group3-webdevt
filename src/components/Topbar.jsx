import React, { useState } from 'react';
import '../css/Topbar.css';
import HamburgerMenu from './HamburgerMenu';
import Sidebar from './Sidebar';

export default function Topbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="topbar">
        <div className="topbar-title">Diner28</div>
        <div style={{ flex: 1 }} />
        <HamburgerMenu onClick={() => setSidebarOpen(true)} />
      </div>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
