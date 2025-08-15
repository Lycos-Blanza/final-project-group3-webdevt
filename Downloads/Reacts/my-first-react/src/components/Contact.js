import React, { useState } from "react";
import { FaGithub, FaFacebook, FaDiscord, FaTwitter } from "react-icons/fa";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ name: false, email: false, message: false });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { name: false, email: false, message: false };

    if (!name.trim()) {
      newErrors.name = true;
      hasError = true;
    }
    if (!email.trim() || !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) {
      newErrors.email = true;
      hasError = true;
    }
    if (!message.trim()) {
      newErrors.message = true;
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      alert("Message sent!");
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <section id="contact" className="contact" data-aos="fade-up" data-aos-delay="100">
      <h2 className="section-title">Contact Me</h2>
      <div className="contact-container">
        
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ border: errors.name ? "2px solid red" : "1px solid #555" }}
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ border: errors.email ? "2px solid red" : "1px solid #555" }}
            />
          </div>

          <div>
            <textarea
              placeholder="Your Message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
  );
}
