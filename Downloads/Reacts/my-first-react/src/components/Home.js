import React from "react";
import myAboutMe from "../assets/my-aboutme.jpg";
import { FaGithub, FaFacebook, FaDiscord, FaApple } from "react-icons/fa";

export default function Home({ lenisRef }) {
  return (
    <section className="home" id="home">
      <div className="home-img">
        <img src={myAboutMe} alt="Lycos Blanza" />
      </div>
      <div className="home-content">
        <h1>Hi, It's <span>Lycos</span></h1>
        <h3 className="typing-text">I'm a <span></span></h3>
        <p>
          A student from De La Salle Lipa who is working hard to become a good
          and skilled developer.
        </p>
        <div className="social-icons">
          <a href="https://github.com/YourUsername" target="_blank" rel="noreferrer"><FaGithub /></a>
          <a href="https://facebook.com/YourProfile" target="_blank" rel="noreferrer"><FaFacebook /></a>
          <a href="https://discord.gg/YourInviteCode" target="_blank" rel="noreferrer"><FaDiscord /></a>
          <a href="https://apple.com" target="_blank" rel="noreferrer"><FaApple /></a>
        </div>
        <a
          href="#projects"
          className="view-work-link"
          onClick={(e) => {
            e.preventDefault();
            const target = document.getElementById("projects");
            if (target && lenisRef.current) lenisRef.current.scrollTo(target, { offset: -110 });
          }}
        >
          View Work
        </a>
      </div>
    </section>
  );
}
