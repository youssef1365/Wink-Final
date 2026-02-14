import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style jsx>{`
        .footer-wrapper {
          background-color: black;
          color: var(--color-text-secondary);
          border-top: 0px solid var(--color-border);
          transition: background-color var(--transition), color var(--transition);
        }

        .footer-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: var(--space-xl) 2rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }

        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
            gap: 2rem;
          }
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .footer-logo-link {
          display: block;
          text-decoration: none;
        }

        .footer-logo-img {
          background-image: var(--logo-url);
          background-size: contain;
          background-repeat: no-repeat;
          background-position: left center;
          height: 70px;
          width: 200px;
          transition: background-image var(--transition);
        }

        .footer-tagline {
          color: var(--color-text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 320px;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
        }

        .footer-title {
          font-size: 0.85rem;
          font-weight: 800;
          color: var(--color-text);
          margin: 0 0 1.5rem 0;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .footer-link {
          color: var(--color-text-secondary);
          text-decoration: none;
          font-size: 0.95rem;
          transition: all var(--transition);
          display: inline-block;
        }

        .footer-link:hover {
          color: var(--color-text);
        }

        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: var(--color-text-secondary);
          font-size: 0.95rem;
        }

        .footer-icon {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          margin-top: 3px;
          color: var(--color-text);
        }

        .footer-newsletter-form {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .footer-newsletter-input {
          flex: 1;
          padding: 0.75rem 1rem;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius);
          color: var(--color-text);
          font-size: 0.9rem;
          outline: none;
          transition: all var(--transition);
        }

        .footer-newsletter-input::placeholder {
          color: var(--color-text-secondary);
          opacity: 0.6;
        }

        .footer-newsletter-input:focus {
          border-color: var(--color-primary);
        }

        .footer-newsletter-button {
          padding: 0 1.2rem;
          background-color: var(--color-text);
          color: var(--color-bg);
          border: none;
          border-radius: var(--border-radius);
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition);
        }

        .footer-newsletter-button:hover {
          background-color: var(--color-primary);
          color: white;
          transform: translateY(-2px);
        }

        .footer-social {
          display: flex;
          gap: 0.75rem;
        }

        .footer-social-link {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius);
          color: var(--color-text);
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 700;
          transition: all var(--transition);
        }

        .footer-social-link:hover {
          background: var(--color-text);
          color: var(--color-bg);
          transform: translateY(-3px);
        }

        .footer-bottom {
          border-top: 1px solid var(--color-border);
          background: rgba(0, 0, 0, 0.15);
        }

        :root[data-theme="light"] .footer-bottom {
          background: rgba(0, 0, 0, 0.06);
        }

        .footer-bottom-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 1.5rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .footer-bottom-container {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        .footer-copyright {
          color: var(--color-text-secondary);
          font-size: 0.85rem;
          margin: 0;
        }

        .footer-back-to-top {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text-secondary);
          background: none;
          border: none;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: color var(--transition);
          padding: 0;
        }

        .footer-back-to-top:hover {
          color: var(--color-text);
        }

        .footer-back-to-top svg {
          width: 14px;
          height: 14px;
        }
      `}</style>

      <footer className="footer-wrapper">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo-box">
                <a href="/" className="footer-logo-link" aria-label="Wink Home">
                  <div className="footer-logo-img" />
                </a>
              </div>
              <p className="footer-tagline">
                High-impact B2B experiences that transform businesses and drive measurable results.
              </p>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">Explore</h4>
              <ul className="footer-list">
                {['Home', 'About', 'Services', 'Packages'].map((item) => (
                  <li key={item}>
                    <motion.a href={`#${item.toLowerCase()}`} className="footer-link" whileHover={{ x: 5 }}>
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">Contact</h4>
              <ul className="footer-list">
                <li className="footer-contact-item">
                  <svg className="footer-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Tangier, Morocco</span>
                </li>
                <li className="footer-contact-item">
                  <svg className="footer-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:hello@wink-consulting.com" className="footer-link">
                    hello@wink-consulting.com
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">Newsletter</h4>
              <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Email address" className="footer-newsletter-input" />
                <motion.button type="submit" className="footer-newsletter-button" whileTap={{ scale: 0.95 }}>
                  →
                </motion.button>
              </form>
              <div className="footer-social">
                {['LN', 'TW', 'IG'].map((social) => (
                  <motion.a key={social} href="#" className="footer-social-link" whileHover={{ y: -3 }}>
                    {social}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-container">
            <p className="footer-copyright">
              © {currentYear} PointVirgul, All Rights Reserved.
            </p>
            <motion.button onClick={scrollToTop} className="footer-back-to-top" whileHover={{ y: -3 }}>
              <span>Back to top</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;