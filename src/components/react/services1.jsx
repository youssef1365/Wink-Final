import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { useRef, useEffect } from 'react';

const Services = () => {
  const containerRef = useRef(null);
  const scrollProgress = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const current = scrollProgress.get();

      if (latest > 0. && latest < 0.45) {
        const diff = latest - current;
        const slowedProgress = current + (diff * 0.45);
        scrollProgress.set(slowedProgress);
      } else if (latest > 0.45 && latest < 0.95) {
        const diff = latest - current;
        const slowedProgress = current + (diff * 0.45);
        scrollProgress.set(slowedProgress);
      } else {
        scrollProgress.set(latest);
      }
    });

    return unsubscribe;
  }, [scrollYProgress, scrollProgress]);

  const servicesData = [
    {
      id: "01",
      title: "B2B Matchmaking",
      description: "We identify and vet potential partners that align perfectly with your business goals, ensuring every connection has the potential to drive real value."
    },
    {
      id: "02",
      title: "Professional Networking",
      description: "Exclusive networking sessions designed to foster high-level, valuable business connections that extend beyond the event itself."
    },
    {
      id: "03",
      title: "Growth Strategy",
      description: "Data-driven insights and strategic planning to scale your business through partnerships, backed by proven methodologies."
    }
  ];

  const y = useTransform(scrollProgress, [0, 0.2, 0.95, 1], ["100vh", "0vh", "0vh", "-20vh"]);
  const opacity = useTransform(scrollProgress, [0, 0.15, 0.95, 1], [0, 1, 1, 0]);
  const contentOpacity = useTransform(scrollProgress, [0.15, 0.4], [0, 1]);

  const service1Y = useTransform(scrollProgress, [0.2, 0.4], ["48px", "0px"]);
  const service1Opacity = useTransform(scrollProgress, [0.2, 0.4], [0, 1]);

  const service2Y = useTransform(scrollProgress, [0.3, 0.5], ["48px", "0px"]);
  const service2Opacity = useTransform(scrollProgress, [0.3, 0.5], [0, 1]);

  const service3Y = useTransform(scrollProgress, [0.4, 0.6], ["48px", "0px"]);
  const service3Opacity = useTransform(scrollProgress, [0.4, 0.6], [0, 1]);

  const serviceAnimations = [
    { y: service1Y, opacity: service1Opacity },
    { y: service2Y, opacity: service2Opacity },
    { y: service3Y, opacity: service3Opacity }
  ];

  return (
    <>
      <style>{`

        .services-wrapper {
          min-height: 300vh;
          position: relative;
          background: var(--color-bg);
        }

        .services-sticky {
          position: sticky;
          top: 90px;
          height: calc(100vh - 90px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 0 1.5rem;
        }

        @media (min-width: 1024px) {
          .services-sticky {
            padding: 0 3rem;
          }
        }

        .services-card {
          width: 100%;
          max-width: 1400px;
          height: 85vh;
          max-height: 700px;
          border-radius: 16px;
          box-shadow: 0 32px 80px rgba(0, 77, 77, 0.4);
          overflow: hidden;
          position: relative;
          background: linear-gradient(to bottom right, rgba(44, 62, 80, 0.95), rgba(0, 77, 77, 0.95));
          backdrop-filter: blur(24px);
          border: 1px solid rgba(127, 205, 205, 0.15);
        }

        .services-card-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom right, rgba(127, 205, 205, 0.08), transparent, rgba(64, 201, 201, 0.08));
          pointer-events: none;
          z-index: 0;
        }

        .services-grain {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .services-content {
          position: relative;
          z-index: 1;
          height: 100%;
          padding: clamp(2rem, 4vw, 4rem);
          display: flex;
          flex-direction: column;
        }

        .services-header {
          margin-bottom: 3rem;
        }

        .services-eyebrow {
          font-size: 2rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--color-mint-light);
          margin-bottom: 0rem;
        }

        .services-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 0.2;
          letter-spacing: -0.04em;
          margin: 0 0 0 0;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .services-subtitle {
          font-size: 1.2rem;
          line-height: 1.5;
          color: var(--color-silver);
          max-width: 500px;
        }

        .services-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            overflow-y: visible;
          }
        }

        /* Custom scrollbar */
        .services-grid::-webkit-scrollbar {
          width: 6px;
        }

        .services-grid::-webkit-scrollbar-track {
          background: rgba(127, 205, 205, 0.1);
          border-radius: 3px;
        }

        .services-grid::-webkit-scrollbar-thumb {
          background: var(--color-teal);
          border-radius: 3px;
        }

        .services-grid::-webkit-scrollbar-thumb:hover {
          background: var(--color-aqua);
        }

        .service-item {
          position: relative;
          padding: 2rem;
          border-radius: 12px;
          background: rgba(0, 77, 77, 0.2);
          border: 1px solid rgba(127, 205, 205, 0.15);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .service-item:hover {
          border-color: var(--color-turquoise);
          background: rgba(0, 102, 102, 0.3);
          transform: translateY(-4px);
        }

        .service-item-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(64, 201, 201, 0.2), transparent);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }

        .service-item:hover .service-item-glow {
          opacity: 1;
        }

        .service-ghost-number {
          position: absolute;
          top: -1rem;
          right: -0.5rem;
          font-size: 120px;
          font-weight: 900;
          color: rgba(127, 205, 205, 0.05);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .service-number {
          display: inline-block;
          font-size: 0.75rem;
          font-family: monospace;
          color: var(--color-turquoise);
          padding: 0.25rem 0.75rem;
          background: rgba(64, 201, 201, 0.15);
          border-radius: 0.5rem;
          margin-bottom: 1.25rem;
          position: relative;
          z-index: 1;
        }

        .service-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.75rem;
          line-height: 1.3;
          position: relative;
          z-index: 1;
        }

        .service-divider {
          width: 2.5rem;
          height: 2px;
          background: linear-gradient(to right, var(--color-teal), var(--color-turquoise));
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }

        .service-description {
          font-size: 0.9rem;
          color: var(--color-silver);
          line-height: 1.7;
          position: relative;
          z-index: 1;
          margin-bottom: 1.5rem;
        }

        .service-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(to right, var(--color-ocean), var(--color-aqua));
          color: white;
          border-radius: 9999px;
          font-weight: 500;
          font-size: 0.875rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          z-index: 1;
        }

        .service-cta:hover {
          box-shadow: 0 10px 25px rgba(64, 201, 201, 0.4);
          transform: translateY(-2px);
          background: linear-gradient(to right, var(--color-teal), var(--color-turquoise));
        }

        .service-cta-icon {
          width: 0.875rem;
          height: 0.875rem;
          transition: transform 0.3s;
        }

        .service-cta:hover .service-cta-icon {
          transform: translateX(0.25rem);
        }
      `}</style>

      <div ref={containerRef} className="services-wrapper">
        <div className="services-sticky">
          <motion.div
            className="services-card"
            style={{ y, opacity }}
          >
            <div className="services-card-glow"></div>
            <div className="services-grain"></div>

            <motion.div
              className="services-content"
              style={{ opacity: contentOpacity }}
            >
              <div className="services-header">
                <div className="services-eyebrow">What We Deliver</div>
                <h2 className="services-title">Our Services</h2>
                <p className="services-subtitle">
                  Connecting decision-makers through carefully curated business experiences.
                </p>
              </div>

              <div className="services-grid">
                {servicesData.map((service, index) => (
                  <motion.div
                    key={service.id}
                    className="service-item"
                    style={serviceAnimations[index]}
                  >
                    <div className="service-item-glow"></div>
                    <div className="service-ghost-number">{service.id}</div>

                    <span className="service-number">{service.id}</span>

                    <h3 className="service-title">{service.title}</h3>

                    <div className="service-divider"></div>

                    <p className="service-description">
                      {service.description}
                    </p>

                    <button className="service-cta">
                      Learn More
                      <svg
                        className="service-cta-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Services;