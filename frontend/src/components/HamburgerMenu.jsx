import React from 'react';

export default function HamburgerMenu({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open menu"
      className="bg-none border-none cursor-pointer flex flex-col justify-center items-center h-10 w-10 p-0 ml-auto"
    >
      <span className="w-[26px] h-[3px] bg-white my-[3px] rounded-sm transition-all duration-300"></span>
      <span className="w-[26px] h-[3px] bg-white my-[3px] rounded-sm transition-all duration-300"></span>
      <span className="w-[26px] h-[3px] bg-white my-[3px] rounded-sm transition-all duration-300"></span>
    </button>
  );
}
