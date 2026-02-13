import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWinkOpen, setIsWinkOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      let offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        if (targetId === 'about') {
        const travelDistance = window.innerHeight * 2.8;
        const expansionOffset = travelDistance * 0.3;
        offsetPosition += expansionOffset;
      }

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsWinkOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <nav className="nav">
          <div className="nav-logo">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>
              <img src="/WinkWhite.png" alt="Wink Logo" />
            </a>
          </div>

          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}><span className="nav-link-text">Home</span><span className="nav-link-underline"></span></a></li>
            <li><a href="#events" onClick={(e) => handleNavClick(e, 'events')}><span className="nav-link-text">Events</span><span className="nav-link-underline"></span></a></li>
            <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}><span className="nav-link-text">Services</span><span className="nav-link-underline"></span></a></li>
            <li><a href="#packages" onClick={(e) => handleNavClick(e, 'packages')}><span className="nav-link-text">Packages</span><span className="nav-link-underline"></span></a></li>

            <li
              className="dropdown-wrapper"
              onMouseEnter={() => setIsWinkOpen(true)}
              onMouseLeave={() => setIsWinkOpen(false)}
            >
              <button className="wink-trigger-btn" onClick={(e) => handleNavClick(e, 'about')}>
                <span className="nav-link-text">WINK</span>
                <span className="dropdown-arrow">▼</span>
                <span className="nav-link-underline"></span>
              </button>
              <AnimatePresence>
                {isWinkOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="dropdown-list"
                  >
                    <li><a href="#engage" onClick={(e) => handleNavClick(e, 'engage')}>Engage</a></li>
                    <li><a href="#insights" onClick={(e) => handleNavClick(e, 'insights')}>Insights</a></li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          </ul>

          <div className="nav-cta">
            <button className="theme-toggle-minimal" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button
              className="cta-button-high-end"
              onClick={() => window.dispatchEvent(new Event('openContactModal'))}
            >
              <span className="cta-text">Talk to an Expert</span>
              <div className="cta-shimmer"></div>
            </button>
          </div>
        </nav>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          width: 100%;
          padding: 1.8rem 0;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg) 70%, transparent 100%);
        }

        .header.scrolled {
          padding: 1rem 0;
          background: rgba(1, 62, 86, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .nav-container {
          width: 100%;
          padding: 0 4vw;
          box-sizing: border-box;
        }

        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          position: relative;
        }

        .nav-logo img {
          height: 52px;
          transition: all 0.5s ease;
        }

        .header.scrolled .nav-logo img {
          height: 38px;
        }

        .nav-links {
          display: flex;
          gap: clamp(1.2rem, 2.5vw, 3rem);
          list-style: none;
          align-items: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .nav-links a, .wink-trigger-btn {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-weight: 700;
          color: var(--color-text-primary);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem 0;
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .nav-link-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: var(--color-text);
          transition: width 0.4s ease;
        }

        .nav-links a:hover .nav-link-underline,
        .wink-trigger-btn:hover .nav-link-underline {
          width: 100%;
        }

        .dropdown-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .dropdown-list {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          min-width: 180px;

          /* Premium Glassmorphism */
          background: rgba(1, 62, 86, 0.9);
          backdrop-filter: blur(12px) saturate(160%);
          -webkit-backdrop-filter: blur(12px) saturate(160%);

          list-style: none;
          padding: 0.5rem 0;
          margin: 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-top: none;
          border-radius: 0 0 8px 8px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
          z-index: 1000;
        }

        .dropdown-list li a {
          display: block;
          padding: 0.8rem 1.5rem;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .dropdown-list li a:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--color-text);
          padding-left: 1.8rem;
        }

        .nav-cta {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          flex-shrink: 0;
        }

        .theme-toggle-minimal {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .theme-toggle-minimal:hover {
          border-color: var(--color-text);
        }

        .cta-button-high-end {
          background: transparent;
          color: var(--color-text-primary);
          border: 1px solid var(--color-text);
          padding: 0.7rem 1.6rem;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 800;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
        }

        .cta-text { position: relative; z-index: 2; }

        .cta-button-high-end::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--color-text);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 1;
        }

        .cta-button-high-end:hover::before {
          transform: scaleX(1);
          transform-origin: left;
        }

        .cta-button-high-end:hover .cta-text {
          color: var(--color-bg);
        }

        @media (max-width: 1024px) {
          .nav-links { display: none; }
        }
      `}</style>
    </header>
  );
};

export default Header;