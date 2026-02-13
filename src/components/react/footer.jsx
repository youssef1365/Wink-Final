import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-grid">

            {/* Column 1: Minimalist High-End Anchor */}
            <div className="footer-col brand-col">
              <div className="footer-logo">WINK<span>.</span></div>
              <h2 className="footer-statement">
                High-impact <br />
                B2B experiences<span>.</span>
              </h2>
            </div>

            {/* Column 2: Navigation */}
            <div className="footer-col">
              <h4 className="footer-heading">Navigation</h4>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#packages">Packages</a></li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className="footer-col">
              <h4 className="footer-heading">Contact</h4>
              <ul className="footer-links">
                <li>Tangier, Morocco</li>
                <li><a href="mailto:hello@wink.com">hello@wink-consulting.com</a></li>
              </ul>
            </div>

            {/* Column 4: Newsletter - Keep it to a single line */}
            <div className="footer-col">
              <h4 className="footer-heading">Stay Connected</h4>
              <form className="footer-newsletter">
                <input type="email" placeholder="Your email address" />
                <button type="submit">→</button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {currentYear} Wink B2B Agency.</span>
            <div className="social-minimal">
              <a href="#">LN</a> / <a href="#">TW</a> / <a href="#">IG</a>
            </div>
            <button className="back-to-top" onClick={scrollToTop}>Top ↑</button>
          </div>
        </div>
      </footer>

      <style>{`
        .footer-section {
          background-color: var(--color-bg); /* Charcoal */
          padding: 8rem 0 3rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          transition: background-color 0.3s ease;
        }

        .footer-container {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 var(--space-lg);
        }

        .footer-grid {
          display: grid;
          /* Gave the Brand-Col significantly more room (3 parts out of 6) */
          grid-template-columns: 3fr 1fr 1fr 1.5fr;
          gap: 4rem;
          margin-bottom: 6rem;
        }

        /* --- COLUMN 1: BRAND ANCHOR --- */
        .brand-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .footer-logo {
          font-size: 2.5rem;
          font-weight: 900;
          color: var(--color-text-primary);
          letter-spacing: -2px;
          margin: 0;
        }

        .footer-logo span {
          color: var(--color-text); /* Your Brand Orange */
        }

        .footer-statement {
          font-size: 2rem;
          line-height: 1;
          font-weight: 800;
          color: var(--color-text-primary);
          opacity: 0.2; /* Ghost effect: visible but not distracting */
          letter-spacing: -1px;
          margin: 0;
          text-transform: uppercase;
        }

        /* --- TYPOGRAPHY & LINKS --- */
        .footer-heading {
          color: var(--color-text-primary);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 2.5rem;
          font-weight: 700;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 1.2rem;
          font-size: 0.95rem;
          color: var(--color-text-secondary);
        }

        .footer-links a {
          color: inherit;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .footer-links a:hover {
          color: var(--color-text);
          transform: translateX(4px); /* Subtle high-end interaction */
        }

        /* --- NEWSLETTER: MINIMALIST LINE --- */
        .footer-newsletter {
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 0.5rem;
          transition: border-color 0.3s;
        }

        .footer-newsletter:focus-within {
          border-color: var(--color-text);
        }

        .footer-newsletter input {
          background: transparent;
          border: none;
          color: var(--color-text-primary);
          padding: 0.5rem 0;
          outline: none;
          width: 100%;
          font-size: 0.9rem;
        }

        .footer-newsletter button {
          background: transparent;
          border: none;
          color: var(--color-text);
          cursor: pointer;
          font-size: 1.2rem;
          padding-left: 1rem;
        }

        /* --- BOTTOM BAR --- */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 3rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          letter-spacing: 0.02em;
        }

        .social-minimal {
          display: flex;
          gap: 1.5rem;
        }

        .social-minimal a {
          text-decoration: none;
          color: inherit;
          font-weight: 700;
          transition: color 0.2s;
        }

        .social-minimal a:hover {
          color: var(--color-text);
        }

        .back-to-top {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--color-text-secondary);
          padding: 0.5rem 1rem;
          border-radius: 2px;
          cursor: pointer;
          font-size: 0.7rem;
          text-transform: uppercase;
          font-weight: 700;
          transition: all 0.3s;
        }

        .back-to-top:hover {
          border-color: var(--color-text);
          color: var(--color-text);
        }

        /* Responsive Adjustments */
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 3rem; }
          .footer-statement { font-size: 1.5rem; }
        }

        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; gap: 2rem; text-align: center; }
        }
      `}</style>
    </>
  );
};

export default Footer;