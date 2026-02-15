import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const Vision = ({ text, subtext }) => {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const isInView = useInView(headlineRef, { once: true, margin: "-15% 0px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
  const sectionY = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [60, 0, 0, -60]);

  const tokens = Array.isArray(text)
    ? text
    : String(text).split(' ').map(w => ({ word: w }));

  const words = tokens.map(t =>
    typeof t === 'string' ? { word: t, accent: false, color: null } : t
  );

  return (
    <section ref={containerRef} className="vision-section">
      <motion.div
        style={{ opacity: sectionOpacity, y: sectionY }}
        className="vision-wrapper"
      >
        <motion.div
          className="vision-rule"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />

        <h2 ref={headlineRef} className="vision-headline" aria-label={words.map(w => w.word).join(' ')}>
          {words.map((token, i) => (
            <span key={i} className="word-outer" aria-hidden="true">
              <motion.span
                className="word-inner"
                style={
                  token.color
                    ? { color: token.color }
                    : token.accent
                    ? { color: 'var(--color-accent, #FFFFFF)' }
                    : {}
                }
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : {}}
                transition={{
                  duration: 0.65,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {token.word}
              </motion.span>
            </span>
          ))}
        </h2>

        {subtext && (
          <motion.p
            className="vision-subtext"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: words.length * 0.06 + 0.1,
              ease: 'easeOut'
            }}
          >
            {subtext}
          </motion.p>
        )}

        <motion.div
          className="vision-rule"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      <style jsx>{`
        .vision-section {
          min-height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg);
          padding: 6vh 10vw;
          overflow: hidden;
          position: relative;
        }

        .vision-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 1000px;
          width: 100%;
          gap: 0;
        }

        .vision-rule {
          width: 48px;
          height: 1.5px;
          background: var(--color-primary, currentColor);
          opacity: 0.45;
          margin: 1.8rem 0;
          transform-origin: left center;
        }

        .vision-headline {
          font-size: clamp(1.9rem, 4.2vw, 3.8rem);
          font-weight: 800;
          line-height: 1.25;
          color: var(--extra-color-third);
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.28em 0.3em;
        }

        .word-outer {
          display: inline-block;
          overflow: hidden;
          padding-bottom: 0.08em;
          line-height: inherit;
        }

        .word-inner {
          display: inline-block;
          color: inherit;
          line-height: inherit;
        }

        .vision-subtext {
          margin-top: 0;
          margin-bottom: 0;
          font-size: clamp(0.78rem, 1.1vw, 0.95rem);
          color: var(--extra-color-third);
          max-width: 560px;
          line-height: 1.7;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.7;
        }
      `}</style>
    </section>
  );
};

export default Vision;