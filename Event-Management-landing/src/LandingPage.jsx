import React, { useEffect } from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaEnvelope } from 'react-icons/fa';
import AOS from 'aos';

const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  return (
    <div className="landing-page">
      <header className="header">
        <nav className="navbar">
          <div className="logo">Event Management</div>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero" data-aos="fade-up">
          <div className="hero-content">
            <h1>Welcome to Event Management System</h1>
            <p>Organize and manage your events effortlessly.</p>
            <a href="#" className="cta-button">Get Started</a>
          </div>
        </section>

        <section className="features" data-aos="fade-up">
          <h2>Features</h2>
          <div className="feature">
            <h3>Create Events</h3>
            <p>Easily create and manage your events.</p>
          </div>
          <div className="feature">
            <h3>RSVP Management</h3>
            <p>Track and manage event attendees.</p>
          </div>
          <div className="feature">
            <h3>Notifications</h3>
            <p>Send reminders and updates to attendees.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="social-media">
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaEnvelope /></a>
        </div>
        <p>&copy; 2024 Event Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
