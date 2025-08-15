import React, { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import "./App.css";
import myAboutMe from "./my-aboutme.jpg";
import project1 from "./Project1.jpg";
import project2 from "./Project2.webp";
import project3 from "./Project3.png";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaDiscord,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaPython,
  FaJsSquare,
  FaNodeJs,
  FaApple
} from "react-icons/fa";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const lenisRef = React.useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
    });
    lenisRef.current = lenis;

    AOS.init({
      duration: 1000,
      once: false,
    });

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

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [errors, setErrors] = useState({ name: false, email: false, message: false });
const [errorMessages, setErrorMessages] = useState({ name: "", email: "", message: "" });

const handleContactSubmit = (e) => {
  e.preventDefault();
  let hasError = false;
  const newErrors = { name: false, email: false, message: false };
  const newErrorMessages = { name: "", email: "", message: "" };

  if (!name.trim()) {
    newErrors.name = true;
    newErrorMessages.name = "Name is required";
    hasError = true;
  }

  if (!email.trim()) {
    newErrors.email = true;
    newErrorMessages.email = "Email is required";
    hasError = true;
  } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) {
    newErrors.email = true;
    newErrorMessages.email = "Invalid email";
    hasError = true;
  }

  if (!message.trim()) {
    newErrors.message = true;
    newErrorMessages.message = "Message is required";
    hasError = true;
  }

  setErrors(newErrors);
  setErrorMessages(newErrorMessages);

  if (!hasError) {
    alert("Message sent!");
    setName("");
    setEmail("");
    setMessage("");
  }
};

  return (
    <>
      {/* HEADER */}
      <header>
        <a
          href="#"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            if (lenisRef.current) {
              lenisRef.current.scrollTo(0);
            }
          }}
        >
          My Portfolio
        </a>

        <nav>
          <a
            href="#home"
            className={activeSection === "home" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("home");
            }}
          >
            Home
          </a>
          <a
            href="#about"
            className={activeSection === "about" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("about");
              const target = document.getElementById("about");
              if (target && lenisRef.current) {
                const offset = -80;
                lenisRef.current.scrollTo(target, { offset });
              }
            }}
          >
            About me
          </a>

          <a
            href="#projects"
            className={activeSection === "projects" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("projects");
              const target = document.getElementById("projects");
              if (target && lenisRef.current) {
                const offset = -40; // header height in px
                lenisRef.current.scrollTo(target, { offset });
              }
            }}
          >
            Projects
          </a>
          
          <a
            href="#contact"
            className={activeSection === "contact" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("contact");
            }}
          >
            Contact
          </a>
        </nav>
      </header>

      {/* HOME SECTION */}
      <section className="home" id="home">
        <div className="home-img">
          <img src={myAboutMe} alt="Lycos Blanza" />
        </div>
        <div className="home-content">
          <h1>
            Hi, It's <span>Lycos</span>
          </h1>
          <h3 className="typing-text">
            I'm a <span></span>
          </h3>
          <p>
            A student from De La Salle Lipa who is working hard to become a good
            and skilled developer, always learning and improving to do well in technology.
          </p>
          <div className="social-icons">
          <a href="https://github.com/YourUsername" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://facebook.com/YourProfile" target="_blank" rel="noopener noreferrer">
           <FaFacebook />
          </a>
          <a href="https://discord.gg/YourInviteCode" target="_blank" rel="noopener noreferrer">
           <FaDiscord />
          </a>
          <a href="https://apple.com" target="_blank" rel="noopener noreferrer">
            <FaApple />
          </a>
          </div>
          
          <a
            href="#projects"
            className="view-work-link"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById("projects");
              if (target && lenisRef.current) {
                const offset = -80;
                lenisRef.current.scrollTo(target, { offset: -110 });
              }
            }}
          >
            View Work
          </a>

        </div>
      </section>

      {/* ABOUT & SKILLS */}
      <section id="about" className="about-skills">
        {/* About */}
        <div className="about-left" data-aos="fade-up" data-aos-delay="100">
          <h2 className="section-title">About Me</h2>
          <img src={myAboutMe} alt="Lycos Blanza" className="about-img" />
          <p>
            I am passionate about web development, specializing in building responsive
            and user-friendly websites. I enjoy learning new technologies and constantly
            improving my skills in both frontend and backend development.
          </p>
        </div>

        {/* Skills */}
        <div className="about-right" data-aos="fade-up" data-aos-delay="200">
          <h2 className="section-title">Skills</h2>

          <div className="skill">
            <FaHtml5 className="icon" /> HTML5 <span>50%</span>
            <div className="bar"><div style={{ width: "50%" }}></div></div>
          </div>

          <div className="skill">
            <FaCss3Alt className="icon" /> CSS3 <span>70%</span>
            <div className="bar"><div style={{ width: "70%" }}></div></div>
          </div>

          <div className="skill">
            <FaJsSquare className="icon" /> JavaScript <span>50%</span>
            <div className="bar"><div style={{ width: "50%" }}></div></div>
          </div>

          <div className="skill">
            <FaReact className="icon" /> React <span>40%</span>
            <div className="bar"><div style={{ width: "40%" }}></div></div>
          </div>

          <div className="skill">
            <FaNodeJs className="icon" /> Node.js <span>30%</span>
            <div className="bar"><div style={{ width: "30%" }}></div></div>
          </div>
        </div>
      </section>
      
      {/* PROJECTS */}
<section id="projects" className="projects" data-aos="fade-up" data-aos-delay="100">
  <h2 className="section-title">Projects</h2>
  <div className="projects-grid">
    {/* Project 1 */}
    <div className="project-card">
      <img src={project1} alt="Project 1" />
      <div className="project-info">
        <h3>UI/UX Design</h3>
        <p>Designing intuitive, engaging, and visually appealing interfaces that enhance user satisfaction.</p>
        <button className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#projectModal1">
          Learn More
        </button>
      </div>
    </div>

    {/* Project 2 */}
    <div className="project-card">
      <img src={project2} alt="Project 2" />
      <div className="project-info">
        <h3>Coding Project</h3>
        <p>Various backend logic & algorithms built with C++.</p>
        <button className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#projectModal2">
          Learn More
        </button>
      </div>
    </div>

    {/* Project 3 */}
    <div className="project-card">
      <img src={project3} alt="Project 3" />
      <div className="project-info">
        <h3>Interactive Animation Project</h3>
        <p>A web-based animation project that creates dynamic and engaging visual effects for users.</p>
        <button className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#projectModal3">
          Learn More
        </button>
      </div>
    </div>

    {/* Project 4 */}
    <div className="project-card">
      <img src="https://www-cdn.bigcommerce.com/assets/_1200x630_crop_center-center_82_none/Article_Thumbnail_Ecommerce_Website.jpg?mtime=1681929277" alt="Project 4" />
      <div className="project-info">
        <h3>E-commerce Website</h3>
        <p>Developed a responsive online store with a secure payment gateway and product management system.</p>
        <button className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#projectModal4">
          Learn More
        </button>
      </div>
    </div>

    {/* Project 5 */}
    <div className="project-card">
      <img src="https://qodeinteractive.com/magazine/wp-content/uploads/2019/06/The-7-Elements-Every-Great-Portfolio-Website-Needs-Featured-Img.jpg" alt="Project 5" />
      <div className="project-info">
        <h3>Portfolio Redesign</h3>
        <p>Redesigned a personal portfolio site with improved UI, performance optimization, and accessibility features.</p>
        <button className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#projectModal5">
          Learn More
        </button>
      </div>
    </div>

    {/* Project 6 */}
    <div className="project-card">
      <img src="https://images.remotehub.com/58436f22bb9611ed93d756e41d17a5e0/original_thumb/36222be2.png?version=1678048997" alt="Project 6" />
      <div className="project-info">
        <h3>Weather App</h3>
        <p>Built a weather forecast app using React and a public API to display real-time weather data.</p>
        <button className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#projectModal6">
          Learn More
        </button>
      </div>
    </div>
  </div>
</section>

{/* MODALS */}
<div className="modal fade" id="projectModal1" tabIndex="-1" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content bg-dark text-white">
      <div className="modal-header border-0">
        <h5 className="modal-title">UI/UX Design</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div className="modal-body">
        <p><strong>Project Description:</strong> This UI/UX design project focuses on creating intuitive and visually appealing user interfaces. The goal is to enhance user experience through user-centered design principles, wireframing, prototyping, and usability testing.</p>
        <p><strong>Technologies Used:</strong></p>
        <ul>
          <li>Figma for design and prototyping</li>
          <li>Adobe XD</li>
          <li>HTML, CSS, and JavaScript for front-end implementation</li>
        </ul>
        <p><strong>Project Timeline:</strong> February 2025 - June 2025</p>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="projectModal2" tabIndex="-1" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content bg-dark text-white">
      <div className="modal-header border-0">
        <h5 className="modal-title">Coding Project</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div className="modal-body">
        <p><strong>Project Description:</strong> This coding project involves building backend algorithms and solving programming challenges using C++. Focused on efficiency, modularity, and performance optimization.</p>
        <p><strong>Technologies Used:</strong></p>
        <ul>
          <li>C++ for backend logic and algorithms</li>
          <li>Data structures (arrays, linked lists, trees)</li>
          <li>Sorting and search algorithms</li>
        </ul>
        <p><strong>Project Timeline:</strong> January 2025 - April 2025</p>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="projectModal3" tabIndex="-1" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content bg-dark text-white">
      <div className="modal-header border-0">
        <h5 className="modal-title">Interactive Animation Project</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div className="modal-body">
        <p><strong>Project Description:</strong> A web-based interactive animation project that enhances user engagement through dynamic visual effects. Focuses on smooth transitions, interactive elements, and responsive animations triggered by user actions.</p>
        <p><strong>Technologies Used:</strong></p>
        <ul>
          <li>JavaScript and HTML5 Canvas</li>
          <li>CSS animations and transitions</li>
          <li>Responsive design principles</li>
        </ul>
        <p><strong>Project Timeline:</strong> March 2025 - May 2025</p>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="projectModal4" tabIndex="-1" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content bg-dark text-white">
      <div className="modal-header border-0">
        <h5 className="modal-title">E-commerce Website</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div className="modal-body">
        <p><strong>Project Description:</strong> A fully responsive e-commerce website with user authentication, product management, shopping cart, and secure payment integration. Designed for scalability and optimized user experience.</p>
        <p><strong>Technologies Used:</strong></p>
        <ul>
          <li>React for frontend</li>
          <li>Node.js and Express for backend</li>
          <li>MongoDB for database</li>
          <li>Stripe API for payment integration</li>
        </ul>
        <p><strong>Project Timeline:</strong> February 2025 - July 2025</p>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="projectModal5" tabIndex="-1" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content bg-dark text-white">
      <div className="modal-header border-0">
        <h5 className="modal-title">Portfolio Redesign</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div className="modal-body">
        <p><strong>Project Description:</strong> A redesign of a personal portfolio website to improve UI/UX, accessibility, and overall performance. The project focuses on modern design principles, responsive layout, and smooth navigation.</p>
        <p><strong>Technologies Used:</strong></p>
        <ul>
          <li>React for frontend</li>
          <li>CSS Grid and Flexbox for responsive layouts</li>
          <li>SEO optimization techniques</li>
        </ul>
        <p><strong>Project Timeline:</strong> January 2025 - May 2025</p>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="projectModal6" tabIndex="-1" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content bg-dark text-white">
      <div className="modal-header border-0">
        <h5 className="modal-title">Weather App</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div className="modal-body">
        <p><strong>Project Description:</strong> A real-time weather application displaying current weather, 7-day forecasts, and location-based results. Focus on user-friendly interface, dynamic updates, and accurate data presentation.</p>
        <p><strong>Technologies Used:</strong></p>
        <ul>
          <li>React for frontend</li>
          <li>Public weather APIs (OpenWeatherMap)</li>
          <li>CSS for styling and responsive design</li>
        </ul>
        <p><strong>Project Timeline:</strong> March 2025 - June 2025</p>
      </div>
    </div>
  </div>
</div>

{/* CONTACT SECTION */}
<section id="contact" className="contact" data-aos="fade-up" data-aos-delay="100">
  <h2 className="section-title">Contact Me</h2>
  <div className="contact-container">
    <form className="contact-form" onSubmit={handleContactSubmit}>
  <div>
    <input
      type="text"
      placeholder="Your Name"
      value={name}
      onChange={(e) => {
        setName(e.target.value);
        if (errors.name) setErrors({ ...errors, name: false });
      }}
      style={{ border: errors.name ? "2px solid red" : "1px solid #555" }}
    />
  </div>

  <div>
    <input
      type="email"
      placeholder="Your Email"
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
        if (errors.email) setErrors({ ...errors, email: false });
      }}
      style={{ border: errors.email ? "2px solid red" : "1px solid #555" }}
    />
  </div>

  <div>
    <textarea
      placeholder="Your Message"
      rows="5"
      value={message}
      onChange={(e) => {
        setMessage(e.target.value);
        if (errors.message) setErrors({ ...errors, message: false });
      }}
      style={{ border: errors.message ? "2px solid red" : "1px solid #555" }}
    ></textarea>
  </div>

  <button type="submit">Send Message</button>
</form>

    <div className="contact-info">
      <p>Email: blanzalycos@gmail.com</p>
      <p>Phone: +63 995 678 3687</p>
      <div className="contact-socials">
        <FaGithub />
        <FaFacebook />
        <FaDiscord />
        <FaTwitter />
      </div>
    </div>
  </div>
</section>
    </>
  );
}

