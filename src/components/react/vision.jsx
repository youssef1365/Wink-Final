import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Vision = ({ text, subtext }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section ref={containerRef} className="vision-transition-section">
      <motion.div
        style={{ opacity, scale, y }}
        className="vision-content-wrapper"
      >
        <div className="vision-line"></div>
        <h2 className="vision-headline">
          {text}
        </h2>
        {subtext && <p className="vision-subtext">{subtext}</p>}
        <div className="vision-line"></div>
      </motion.div>

      <style jsx>{`
        .vision-transition-section {
          height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg); /* Charcoal */
          padding: 0 10vw;
          overflow: hidden;
          position: relative;
        }

        .vision-content-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 1000px;
        }

        .vision-line {
          width: 60px;
          height: 2px;
          background: var(--color-primary); /* Orange */
          margin: 2rem 0;
          opacity: 0.6;
        }

        .vision-headline {
          font-size: clamp(1.8rem, 4vw, 3.5rem);
          font-weight: 800;
          line-height: 1.2;
          color: var(--color-primary); /* Orange */
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }

        .vision-subtext {
          margin-top: 1.5rem;
          font-size: 1rem;
          color: var(--color-text-secondary);
          max-width: 600px;
          line-height: 1.6;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
      `}</style>
    </section>
  );
};

export default Vision;