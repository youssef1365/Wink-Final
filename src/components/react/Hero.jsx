import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Wink <br />
            <span className="highlight">Business Matchmaking, Done Right</span>
          </h1>
          <p className="hero-description">
            Wink is a global B2B matchmaking and business development firm that helps organizations
            turn meetings into measurable business outcomes.
          </p>
          <div className="hero-buttons">
            <button className="cta-button">Get Started</button>
            <a href="#work" className="secondary-link">View Our Work</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          min-height: 109vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 7rem 5rem 5rem;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hero-container {
          max-width: 70vw;
          width: 100%;
        }

        .hero-title {
          font-size: clamp(3rem, 10vw, 6rem);
          line-height: 1.1;
          font-weight: 800;
          color: var(--color-text);
          margin-bottom: 2rem;
        }

        .highlight {
          color: var(--color-text);
          font-size: clamp(3rem, 10vw, 5rem);
        }

        .hero-description {
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          line-height: 1.7;
          color: var(--color-text-secondary);
          max-width: 80%;
          margin: 0 auto 3rem;
        }

        .hero-buttons {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .cta-button {
          background-color: #44cba5;
          color: white;
          border: none;
          padding: 1rem 1rem;
          border-radius: var(--border-radius);
          font-weight: 900;
          cursor: pointer;
        }

        .cta-button:hover {
          background-color: var(--color-primary-hover);
        }

        .secondary-link {
          color: var(--color-text);
          text-decoration: none;
          font-weight: 500;
          font-size: 1.1rem;
        }

        .secondary-link:hover {
          color: var(--color-primary);
        }

        @media (max-width: 768px) {
          .hero-buttons {
            flex-direction: column;
            width: 100%;
          }

          .cta-button,
          .secondary-link {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;