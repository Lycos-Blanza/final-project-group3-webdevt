import React from "react";
import project1 from "../assets/Project1.jpg";
import project2 from "../assets/Project2.webp";
import project3 from "../assets/Project3.png";

export default function Projects() {
  return (
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
  );
}
