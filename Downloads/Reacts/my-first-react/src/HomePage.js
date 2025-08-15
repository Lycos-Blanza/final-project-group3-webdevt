import React, { useEffect, useState, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smooth: true });
    lenisRef.current = lenis;

    AOS.init({ duration: 1000, once: false });

    function raf(time) {
      lenis.raf(time);
      AOS.refresh();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "home";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (section) => {
    setActiveSection(section);
    const target = document.getElementById(section);
    if (target && lenisRef.current) {
      lenisRef.current.scrollTo(target);
    }
  };

  return (
    <>
      <Header activeSection={activeSection} handleNavClick={handleNavClick} lenisRef={lenisRef} />
      <Home lenisRef={lenisRef} />
      <About />
      <Projects />
      <Contact />
    </>
  );
}
