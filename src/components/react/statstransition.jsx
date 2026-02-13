import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Simple counter hook for that "counting up" effect
const Counter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const totalMiliseconds = duration * 1000;
      const incrementTime = totalMiliseconds / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

const StatsTransition = () => {
  const stats = [
    { label: "YEARS EXPERIENCE", value: "15", suffix: "+" },
    { label: "EVENTS MANAGED", value: "500", suffix: "+" },
    { label: "COUNTRIES REACHED", value: "50", suffix: "+" }
  ];

  return (
    <>
      <section className="stats-section">
        <div className="stats-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="stats-badge"
          >
            PROVEN TRACK RECORD
          </motion.div>

          <h2 className="stats-title">By The Numbers</h2>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-value">
                  <Counter value={stat.value} />{stat.suffix}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .stats-section {
          background-color: var(--color-bg); /* Charcoal in dark mode */
          padding: var(--space-xl) var(--space-lg);
          display: flex;
          justify-content: center;
          transition: background-color 0.3s ease;
        }

        .stats-container {
          max-width: var(--max-width);
          width: 100%;
          text-align: center;
          /* Matches the rounded container look from your screenshot */
          background-color: var(--color-bg-secondary);
          padding: var(--space-xl);
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .stats-badge {
          display: inline-block;
          background-color: rgba(68, 203, 165, 0.1); /* Subtle brand tint */
          color: var(--color-text); /* Orange/Teal brand color */
          padding: 8px 20px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: var(--space-md);
        }

        .stats-title {
          font-size: clamp(2rem, 4vw, 3rem);
          color: var(--color-text-primary);
          margin-bottom: var(--space-xl);
          font-weight: 800;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
        }

        .stat-value {
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 800;
          color: var(--color-text); /* Highlight brand color */
          line-height: 1;
        }

        .stat-label {
          margin-top: var(--space-sm);
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          letter-spacing: 1px;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: var(--space-xl);
          }
          .stats-container {
            border-radius: 24px;
          }
        }
      `}</style>
    </>
  );
};

export default StatsTransition;