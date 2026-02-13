import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Events = () => {
  const [filter, setFilter] = useState('upcoming');

  // Placeholder data for you to fill up
  const allEvents = [
    {
      id: 1,
      type: 'upcoming',
      name: 'Global Trade Summit',
      location: 'Casablanca, Morocco',
      date: 'Oct 2026',
      description: 'Connecting Mediterranean tech leaders with global investors.'
    },
    {
      id: 2,
      type: 'past',
      name: 'B2B Matchmaking Days',
      location: 'Paris, France',
      date: 'Jan 2026',
      description: 'High-level networking for retail and logistics stakeholders.'
    }
  ];

  const filteredEvents = allEvents.filter(event => event.type === filter);

  return (
    <>
      <section className="events-section">
        <div className="events-header">
          <h2 className="events-title">Our Events</h2>
          <p className="events-subtitle">
            Explore upcoming initiatives and past projects delivered across industries and markets.
          </p>

          {/* TABS OU FILTRES */}
          <div className="filter-tabs">
            <button
              className={`tab-btn ${filter === 'upcoming' ? 'active' : ''}`}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming Events
            </button>
            <button
              className={`tab-btn ${filter === 'past' ? 'active' : ''}`}
              onClick={() => setFilter('past')}
            >
              Past Events
            </button>
          </div>
        </div>

        <motion.div layout className="events-grid">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="event-card"
              >
                <div className="event-info">
                  <h3 className="event-name">{event.name}</h3>
                  <div className="event-meta">
                    <span>📍 {event.location}</span>
                    <span>📅 {event.date}</span>
                  </div>
                  <p className="event-desc">{event.description}</p>
                </div>
                <button className="view-event-cta">View Event</button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <style>{`
        .events-section {
          background-color: var(--color-bg);
          padding: var(--space-xl) var(--space-lg);
          min-height: 80vh;
          transition: background-color 0.3s ease;
        }

        .events-header {
          max-width: var(--max-width);
          margin: 0 auto var(--space-xl);
          text-align: center;
        }

        .events-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: var(--color-text-primary);
          font-weight: 800;
          margin-bottom: var(--space-sm);
        }

        .events-subtitle {
          color: var(--color-text-secondary);
          font-size: 1.15rem;
          max-width: 600px;
          margin: 0 auto var(--space-lg);
        }

        .filter-tabs {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
        }

        .tab-btn {
          background: var(--color-bg-secondary);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--color-text-secondary);
          padding: 0.8rem 1.5rem;
          border-radius: 100px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .tab-btn.active {
          background: var(--color-text); /* Your brand orange/accent */
          color: var(--color-bg); /* Charcoal */
          border-color: var(--color-text);
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: var(--space-lg);
          max-width: var(--max-width);
          margin: 0 auto;
        }

        .event-card {
          background: var(--color-bg-secondary);
          border-radius: var(--border-radius);
          padding: var(--space-lg);
          border: 1px solid rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .event-name {
          color: var(--color-text-primary);
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .event-meta {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          font-size: 0.85rem;
          color: var(--color-text); /* Orange highlight */
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .event-desc {
          color: var(--color-text-secondary);
          line-height: 1.5;
          font-size: 0.95rem;
        }

        .view-event-cta {
          margin-top: 1.5rem;
          background: none;
          border: 1px solid var(--color-text);
          color: var(--color-text);
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          align-self: flex-start;
        }

        .view-event-cta:hover {
          background: var(--color-text);
          color: var(--color-bg);
        }

        @media (max-width: 768px) {
          .events-grid { grid-template-columns: 1fr; }
          .filter-tabs { flex-direction: column; }
        }
      `}</style>
    </>
  );
};

export default Events;