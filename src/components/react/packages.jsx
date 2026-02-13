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

  return (
    <>
      <section className="packages-section">
        <div className="packages-header">
          <p className="packages-tag">Packages</p>
          <h2 className="packages-main-title">Tailored Programs for Every Stakeholder</h2>
          <p className="packages-subtitle">Choose a package designed for your organization’s objectives.</p>
        </div>

        <motion.div
          className="packages-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {packageData.map((pkg, index) => (
            <motion.div key={index} className="package-card" variants={cardVariants}>
              <h3 className="package-title">{pkg.title}</h3>
              <ul className="package-list">
                {pkg.items.map((item, i) => (
                  <li key={i} className="package-item">
                    <span className="bullet">◈</span> {item}
                  </li>
                ))}
              </ul>
              <button className="package-cta">{pkg.cta}</button>
            </motion.div>
          ))}
        </motion.div>

        <div className="cta-final-section">
            <h3>Ready to explore a package that fits your goals?</h3>
            <a href="#contact" className="contact-link">👉 Contact Wink</a>
        </div>
      </section>

      <style>{`
        .packages-section {
          background-color: var(--color-bg);
          padding: var(--space-xl) var(--space-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: background-color 0.3s ease;
        }

        .packages-header {
          text-align: center;
          margin-bottom: var(--space-xl);
          max-width: 800px;
        }

        .packages-tag {
          color: var(--color-text);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: var(--space-sm);
        }

        .packages-main-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          color: var(--color-text-primary);
          line-height: 1.2;
          margin: 0 0 var(--space-sm);
        }

        .packages-subtitle {
          color: var(--color-text-secondary);
          font-size: 1.1rem;
        }

        .packages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: var(--space-lg);
          max-width: var(--max-width);
          width: 100%;
        }

        .package-card {
          background-color: var(--color-bg-secondary);
          padding: var(--space-xl);
          border-radius: var(--border-radius);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 350px;
        }

        .package-title {
          color: var(--color-text-primary);
          font-size: 1.6rem;
          margin-bottom: var(--space-md);
          font-weight: 800;
        }

        .package-list {
          list-style: none;
          padding: 0;
          margin: 0 0 var(--space-xl);
          flex-grow: 1;
        }

        .package-item {
          color: var(--color-text-secondary);
          margin-bottom: 0.8rem;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1rem;
        }

        .bullet {
          color: var(--color-text);
          font-size: 0.8rem;
        }

        .package-cta {
          color: var(--color-text);
          background: none;
          border: none;
          padding: 0;
          font-weight: 700;
          text-align: left;
          cursor: pointer;
          font-size: 0.95rem;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .cta-final-section {
          margin-top: var(--space-xl);
          text-align: center;
          color: var(--color-text-primary);
        }

        .contact-link {
            display: inline-block;
            margin-top: 1rem;
            color: var(--color-text);
            font-weight: 800;
            text-decoration: none;
            font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .packages-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
};

export default Packages;