import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './LandingPage.css';
import fireworks1 from './assets/fireworks1.mp4';
import music from './assets/music.mp4';
import performance from './assets/performance.mp4';
import conference from './assets/conference.mp4';

const LandingPage = () => {
  useEffect(() => {
    const cursor = document.querySelector('.glowing-cursor');

    const handleMouseMove = (event) => {
      cursor.style.left = `${event.pageX}px`;
      cursor.style.top = `${event.pageY}px`;
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="landing-page">
      <div className="glowing-cursor"></div>
      <div className="background-video">
        <ReactPlayer
          url={fireworks1}
          playing
          loop
          muted
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, objectFit: 'cover' }}
        />
      </div>
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to EventHub</h1>
          <p className="hero-subtitle">Experience the best events around the world</p>
          <a href="#events" className="cta-button">Explore Events</a>
        </div>
      </header>

      <section id="about" className="about-section">
        <div className="section-content">
          <h2 className="section-title">About Us</h2>
          <p className="section-text">At EventHub, we bring you the most amazing events from around the globe. Join us and make unforgettable memories.</p>
        </div>
      </section>

      <section id="events" className="events-section">
        <div className="section-content">
          <h2 className="section-title">Featured Events</h2>
          <div className="events-grid">
            <div className="event-item">
              <ReactPlayer url={music} playing loop muted width="100%" height="100%" style={{ objectFit: 'cover' }} />
              <div className="event-info">
                <h3>Event One</h3>
                <p>Experience the thrill of the best music festival.</p>
              </div>
            </div>
            <div className="event-item">
              <ReactPlayer url={performance} playing loop muted width="100%" height="100%" style={{ objectFit: 'cover' }} />
              <div className="event-info">
                <h3>Event Two</h3>
                <p>Join us for a night of incredible performances.</p>
              </div>
            </div>
            <div className="event-item">
              <ReactPlayer url={conference} playing loop muted width="100%" height="100%" style={{ objectFit: 'cover' }} />
              <div className="event-info">
                <h3>Event Three</h3>
                <p>Don't miss out on this amazing conference.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="section-content">
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-text">Have any questions? Feel free to reach out to us!</p>
          <div className="contact-info">
            <a href="mailto:info@eventhub.com">info@eventhub.com</a>
            <div className="social-icons">
              <a href="https://twitter.com/eventhub" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com/eventhub" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://linkedin.com/company/eventhub" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <p>&copy; 2024 EventHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
