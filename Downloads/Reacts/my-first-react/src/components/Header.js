import React from "react";

export default function Header({ activeSection, handleNavClick, lenisRef }) {
  return (
    <header>
      <a
        href="#"
        className="logo"
        onClick={(e) => {
          e.preventDefault();
          if (lenisRef.current) lenisRef.current.scrollTo(0);
        }}
      >
        My Portfolio
      </a>
      <nav>
        {["home", "about", "projects", "contact"].map((sec) => (
          <a
            key={sec}
            href={`#${sec}`}
            className={activeSection === sec ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(sec);
            }}
          >
            {sec.charAt(0).toUpperCase() + sec.slice(1)}
          </a>
        ))}
      </nav>
    </header>
  );
}
