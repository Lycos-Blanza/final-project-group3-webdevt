import React from "react";
import myAboutMe from "../assets/my-aboutme.jpg";
import { FaHtml5, FaCss3Alt, FaReact, FaJsSquare, FaNodeJs } from "react-icons/fa";

export default function About() {
  return (
    <section id="about" className="about-skills">
      <div className="about-left" data-aos="fade-up">
        <h2 className="section-title">About Me</h2>
        <img src={myAboutMe} alt="Lycos Blanza" className="about-img" />
        <p>
          I am passionate about web development, specializing in building responsive
          and user-friendly websites.
        </p>
      </div>
      <div className="about-right" data-aos="fade-up" data-aos-delay="200">
        <h2 className="section-title">Skills</h2>
        {[
          { icon: <FaHtml5 />, name: "HTML5", percent: "50%" },
          { icon: <FaCss3Alt />, name: "CSS3", percent: "70%" },
          { icon: <FaJsSquare />, name: "JavaScript", percent: "50%" },
          { icon: <FaReact />, name: "React", percent: "40%" },
          { icon: <FaNodeJs />, name: "Node.js", percent: "30%" },
        ].map((skill, i) => (
          <div className="skill" key={i}>
            {skill.icon} {skill.name} <span>{skill.percent}</span>
            <div className="bar"><div style={{ width: skill.percent }}></div></div>
          </div>
        ))}
      </div>
    </section>
  );
}
