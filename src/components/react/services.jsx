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
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <>
      <section className="services-section">
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="service-number">{service.id}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-text">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <style>{`
        .services-section {
          background-color: var(--color-bg);
          padding: var(--space-xl) var(--space-lg);
          display: flex;
          justify-content: center;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-lg);
          max-width: var(--max-width);
          width: 100%;
        }

        .service-card {
          background-color: var(--color-bg-secondary);
          padding: var(--space-xl) var(--space-lg);
          border-radius: var(--border-radius);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          transition: background-color 0.3s ease;
        }

        .service-number {
          background-color: var(--color-text);
          color: var(--color-bg);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-weight: 800;
          font-size: 0.9rem;
          margin-bottom: var(--space-sm);
        }

        .service-title {
          color: var(--color-text-primary, #ffffff);
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0;
        }

        .service-text {
          color: var(--color-text-secondary, rgba(255, 255, 255, 0.7));
          line-height: 1.6;
          margin: 0;
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default Services;