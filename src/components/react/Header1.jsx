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
      if (targetId === 'services') {
        const travelDistance = window.innerHeight * 3;
        const expansionOffset = travelDistance * 0.7;
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
    <header className="header-shell">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`nav-pill ${isScrolled ? 'scrolled' : ''}`}
      >
        <nav className="nav">
          <div className="nav-logo">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="logo-wrapper">
              <div className="dynamic-logo" />
            </a>
          </div>

          <ul className="nav-links">
            {['home', 'events', 'services', 'packages'].map((item) => (
              <li key={item}>
                <a href={`#${item}`} onClick={(e) => handleNavClick(e, item)} className="nav-link">
                  <span className="nav-link-text">{item}</span>
                  <span className="nav-link-dot" />
                </a>
              </li>
            ))}

            <li
              className="dropdown-wrapper"
              onMouseEnter={() => setIsWinkOpen(true)}
              onMouseLeave={() => setIsWinkOpen(false)}
            >
              <button className="wink-trigger-btn nav-link" onClick={(e) => handleNavClick(e, 'about')}>
                <span className="nav-link-text">WINK</span>
                <span className="dropdown-arrow">
                  <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                    <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="nav-link-dot" />
              </button>
              <AnimatePresence>
                {isWinkOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
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
            <button className="theme-toggle-minimal" onClick={toggleTheme} aria-label="Toggle theme">
              <span className="theme-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
            </button>
            <button
              className="cta-button-high-end"
              onClick={() => window.dispatchEvent(new Event('openContactModal'))}
            >
              <span className="cta-text">Start a Project</span>
              <span className="cta-arrow">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
        </nav>
      </motion.div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@400;600;700;800&display=swap');

        .header-shell {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          justify-content: center;
          padding: 1rem 1rem 0;
          pointer-events: none; /* let clicks pass through the gap around the pill */
        }

        .nav-pill {
          pointer-events: all; /* re-enable clicks on the pill itself */
          width: 100%;
          max-width: 1280px;
          border-radius: 9999px;
          padding: 0 2rem;
          background: transparent;
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
                      0 1px 0 rgba(255, 255, 255, 0.04) inset;
          transition: padding 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                      background 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.5s ease;
        }

        .nav-pill.scrolled {
          background: rgba(5, 5, 8, 0.65);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.55),
                      0 1px 0 rgba(255, 255, 255, 0.06) inset;
        }

        .theme-icon {
          font-size: 1.4rem;
        }

        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          position: relative;
          padding: 0.6rem 0;
        }

        /* ── LOGO ── */
        .nav-logo {
          flex-shrink: 0;
          min-width: 200px;
        }

        .logo-wrapper {
          display: block;
          text-decoration: none;
        }

        .dynamic-logo {
          height: 64px;
          width: 220px;
          min-width: 220px;
          background-image: var(--logo-url, url('/WinkWhite.png'));
          background-size: contain;
          background-repeat: no-repeat;
          background-position: left center;
        }

        /* ── NAV LINKS ── */
        .nav-links {
          display: flex;
          gap: clamp(1.4rem, 2.5vw, 3.2rem);
          list-style: none;
          align-items: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          margin: 0;
          padding: 0;
        }

        .nav-link, .wink-trigger-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          font-weight: 700;
          color: var(--color-text-primary);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.4rem 0;
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          opacity: 0.75;
          transition: opacity 0.3s ease, color 0.3s ease;
        }

        .nav-link:hover, .wink-trigger-btn:hover {
          opacity: 1;
        }

        /* Elegant dot indicator on hover */
        .nav-link-dot {
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%) scale(0);
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--color-text-primary);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-link:hover .nav-link-dot,
        .wink-trigger-btn:hover .nav-link-dot {
          transform: translateX(-50%) scale(1);
        }

        .dropdown-arrow {
          display: flex;
          align-items: center;
          opacity: 0.6;
          transition: transform 0.3s ease;
        }

        .wink-trigger-btn:hover .dropdown-arrow {
          transform: translateY(2px);
        }

        /* ── DROPDOWN ── */
        .dropdown-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .dropdown-list {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 160px;
          background: rgba(5, 5, 8, 0.88);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          list-style: none;
          padding: 0.6rem 0;
          margin: 0;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 8px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5),
                      0 0 0 0.5px rgba(255,255,255,0.04);
          z-index: 1000;
        }

        .dropdown-list::before {
          content: '';
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 8px;
          height: 8px;
          background: rgba(5, 5, 8, 0.88);
          border-left: 1px solid rgba(255, 255, 255, 0.07);
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .dropdown-list li a {
          display: flex;
          align-items: center;
          padding: 0.65rem 1.4rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.62rem;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-weight: 600;
          transition: color 0.25s ease, padding-left 0.25s ease;
        }

        .dropdown-list li a:hover {
          color: rgba(255, 255, 255, 0.95);
          padding-left: 1.7rem;
        }

        /* ── CTA AREA ── */
        .nav-cta {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
        }

        .theme-toggle-minimal {
          background: transparent;
          border: none;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
          opacity: 0.65;
        }

        .theme-toggle-minimal:hover {
          background: transparent;
          opacity: 1;
        }

        .cta-button-high-end {
          background: var(--color-bg-secondary);
          color: #050508;
          border: none;
          padding: 0.85rem 2rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-weight: 800;
          cursor: pointer;
          border-radius: 100px;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
          box-shadow 0.35s ease,
          letter-spacing 0.35s ease;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 2px 16px rgba(255, 255, 255, 0.1);
        }

        .cta-button-high-end:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px;
          background: var(--color-bg-secondary);
          letter-spacing: 0.21em;
        }

        .cta-button-high-end:active {
          transform: translateY(0);
        }

        .cta-text {
          position: relative;
          z-index: 2;
        }

        .cta-arrow {
          display: flex;
          align-items: center;
          position: relative;
          z-index: 2;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .cta-button-high-end:hover .cta-arrow {
          transform: translateX(3px);
        }

        .cta-button-high-end::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--color-bg);
          transform: translateX(-120%);
          transition: transform 0.65s ease;
        }

        .cta-button-high-end:hover::before {
          transform: translateX(120%);
        }

        @media (max-width: 1024px) {
          .nav-links { display: none; }
          .header-shell { padding: 0.75rem 0.75rem 0; }
          .nav-pill { border-radius: 9999px; }
        }
      `}</style>
    </header>
  );
};

export default Header;