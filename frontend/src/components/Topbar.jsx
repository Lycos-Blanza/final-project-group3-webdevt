import React, { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import Sidebar from "./Sidebar";

export default function Topbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div
        className="
    fixed top-0 left-0
    h-[56px] w-full
    bg-[#6d4c1b] text-white
    flex items-center
    px-4
    box-border text-[1.25rem]
    font-normal tracking-[1px]
    z-[100]
  "
      >
        <div
          className="
            font-[var(--headline-font)]
            text-[1.75rem]
            tracking-[2px]
          "
        >
          DINER28
        </div>

        <div className="flex-1" />

        <HamburgerMenu onClick={() => setSidebarOpen(true)} />
      </div>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
