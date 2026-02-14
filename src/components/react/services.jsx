import { motion } from 'framer-motion';

const Services = () => {
  const servicesData = [
    {
      id: "01",
      title: "B2B Matchmaking",
      description: "We identify and vet potential partners that align perfectly with your business goals."
    },
    {
      id: "02",
      title: "Professional Networking",
      description: "Exclusive networking sessions designed to foster high-level, valuable business connections."
    },
    {
      id: "03",
      title: "Growth Strategy",
      description: "Data-driven insights and strategic planning to scale your business through partnerships."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <>
      <section className="services-section">
        <motion.h2
          className="services-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Our Services
        </motion.h2>
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={cardVariants}
            >
              {/* Hover spotlight */}
              <div className="card-spotlight" />

              {/* Large ghost number watermark */}
              <div className="service-number-bg">{service.id}</div>

              {/* Top bar */}
              <div className="card-top">
                <span className="service-number-label">{service.id}</span>
                <span className="card-tag">Service</span>
              </div>

              {/* Animated divider */}
              <motion.div
                className="card-line"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: index * 0.15 + 0.2, ease: [0.22, 1, 0.36, 1] }}
              />

              <h3 className="service-title">{service.title}</h3>

              <p className="service-text">{service.description}</p>

              <div className="card-arrow">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <style>{`
        .services-section {
          background-color: var(--color-bg);
          padding: var(--space-xl) var(--space-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .services-heading {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: var(--color-text-primary);
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin: 0 0 clamp(2rem, 4vw, 3rem) 0;
          text-align: center;
          max-width: var(--max-width);
          width: 100%;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.25rem;
          max-width: var(--max-width);
          width: 100%;
        }

        .service-card {
          position: relative;
          background: var(--color-bg-third);
          border: 5px solid var(--color-primary);
          border-radius: 3px;
          padding: 2.4rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 0;
          overflow: hidden;
          cursor: default;
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }

        .service-card:hover {
          border-color: rgba(255,255,255,0.13);
          box-shadow: 0 20px 55px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(255,255,255,0.05) inset;
          transform: translateY(-6px);
        }

        .card-spotlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 55% at 25% 15%, rgba(255,255,255,0.05) 0%, transparent 65%);
          opacity: 0;
          transition: opacity 0.45s ease;
          pointer-events: none;
        }
        .service-card:hover .card-spotlight { opacity: 1; }

        .service-number-bg {
          position: absolute;
          bottom: -0.5rem;
          right: 1rem;
          font-size: 7rem;
          font-weight: 800;
          color: rgba(255,255,255,0.028);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          transition: color 0.4s ease;
        }
        .service-card:hover .service-number-bg {
          color: rgba(255,255,255,0.055);
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.2rem;
        }

        .service-number-label {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          color: var(--color-bg);
          opacity: 0.9;
        }

        .card-tag {
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-bg);
          opacity: 0.18;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.2rem 0.55rem;
          border-radius: 100px;
        }

        .card-line {
          width: 100%;
          height: 1px;
          color: var(--color-bg);
          transform-origin: left;
          margin-bottom: 1.6rem;
        }

        .service-title {
          font-size: clamp(1.55rem, 2.2vw, 2.1rem);
          font-weight: 800;
          color: var(--color-bg);
          margin: 0 0 0.85rem 0;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .service-text {
          font-size: 0.82rem;
          font-weight: 400;
          color: var(--color-bg);
          line-height: 1.75;
          margin: 0;
          flex: 1;
        }

        /* Arrow footer */
        .card-arrow {
          margin-top: 2rem;
          color: var(--color-bg);
          opacity: 0.2;
          display: flex;
          align-items: center;
          transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .service-card:hover .card-arrow {
          opacity: 0.7;
          transform: translateX(5px);
        }

        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
};

export default Services;