import React from 'react';
import { motion } from 'framer-motion';

const Packages = () => {
  const packageData = [
    {
      title: "Enterprises",
      items: ["Market Entry Roadshows", "Virtual Market Access", "Trade Show Deal Accelerator"],
      cta: "View Enterprise Packages"
    },
    {
      title: "Government & Associations",
      items: ["Trade Missions", "Trade Shows", "Investment Tours"],
      cta: "View Public Sector Packages"
    },
    {
      title: "Event Organizers",
      items: ["Hosted Buyers Programs", "B2B Meetings Organization", "Meetings Management Tool"],
      cta: "View Organizer Packages"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const openContactModal = () => {
    window.dispatchEvent(new Event('openContactModal'));
  };

  return (
    <section className="packages-section">
      <div className="full-width-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="packages-header"
        >
          <h1 className="packages-title">Packages</h1>
          <p className="packages-subtitle">Tailored Programs for Every Stakeholder</p>
          <p className="packages-description">
            Choose a package designed for your organization's objectives.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="packages-grid"
        >
          {packageData.map((pkg, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.01 }}
              className="package-card"
            >
              <div className="card-top-accent" />
              <div className="card-content">
                <h3 className="card-title" title={pkg.title}>{pkg.title}</h3>
                <ul className="package-list">
                  {pkg.items.map((item, i) => (
                    <li key={i} className="package-item">
                      <span className="bullet">◈</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>


              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="footer-cta-container"
        >
          <p className="footer-cta-text">
            Ready to explore a package that fits your goals?
          </p>
          <button className="contact-btn" onClick={openContactModal}>
            <span>👉</span>
            <span>Contact Wink</span>
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        .packages-section {
          min-height: 100vh;
          background-color: var(--color-bg);
          padding: var(--space-xl) 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .full-width-container {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
        }

        .packages-header {
          text-align: center;
          margin-bottom: var(--space-xl);
        }

        .packages-title {
          font-size: clamp(2.5rem, 5vw, 3.75rem);
          font-weight: 800;
          color: var(--color-text);
          margin-bottom: var(--space-sm);
        }

        .packages-subtitle {
          font-size: 1.25rem;
          color: var(--color-1);
          font-weight: 600;
        }

        .packages-description {
          font-size: 1.125rem;
          color: var(--color-text-secondary);
          margin-top: 1rem;
        }

        .packages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
          margin-bottom: var(--space-xl);
          align-items: stretch;
        }

        .package-card {
          position: relative;
          background-color: var(--color-bg-secondary);
          border-radius: var(--border-radius);
          overflow: hidden;
          border: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .card-top-accent {
          height: 4px;
          background-color: var(--color-text);
        }

        .card-content {
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-title {
          font-size: clamp(1.2rem, 1.5vw, 1.4rem);
          font-weight: 800;
          color: var(--color-text);
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          /* Prevents hidden/cropped text */
          overflow: visible;
          white-space: normal;
          line-height: 1.3;
        }

        .package-list {
          list-style: none;
          margin-bottom: 2.5rem;
          flex: 1;
        }

        .package-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: var(--color-text-secondary);
          margin-bottom: 1.2rem;
          font-size: 1rem;
          line-height: 1.5;
        }

        .bullet {
          color: var(--color-text);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .package-cta {
          width: 100%;
          background-color: var(--color-text);
          color: var(--color-bg);
          font-weight: 700;
          padding: 1.1rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.85rem;
        }

        .package-cta:hover {
          background-color: var(--color-1);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 206, 193, 0.3);
        }

        .footer-cta-container {
          text-align: center;
          padding: 3rem;
          background-color: rgba(255, 255, 255, 0.03);
          border-radius: var(--border-radius);
          border: 1px solid var(--color-border);
        }

        .footer-cta-text {
          font-size: 1.3rem;
          color: var(--color-text-secondary);
          margin-bottom: 1.5rem;
        }

        .contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background-color: var(--color-text);
          color: var(--color-bg);
          font-weight: 800;
          padding: 1.2rem 2.5rem;
          border-radius: var(--border-radius);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.1rem;
        }

        .contact-btn:hover {
          background-color: var(--color-primary-hover);
          transform: scale(1.05);
          color: white;
        }

        @media (max-width: 1100px) {
          .packages-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .packages-grid {
            grid-template-columns: 1fr;
          }
          .packages-section {
            padding: var(--space-xl) 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Packages;