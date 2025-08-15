import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar">
      <a className="navbar-brand" href="#">My Portfolio</a>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}
