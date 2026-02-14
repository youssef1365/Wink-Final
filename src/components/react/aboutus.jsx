import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function AboutUs() {
  const containerRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const scrollProgress = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const current = scrollProgress.get();

      if (latest > 0.15 && latest < 0.45) {
        const diff = latest - current;
        const slowedProgress = current + (diff * 0.15);
        scrollProgress.set(slowedProgress);
      } else if (latest > 0.45 && latest < 0.95) {
        const diff = latest - current;
        const slowedProgress = current + (diff * 0.2);
        scrollProgress.set(slowedProgress);
      } else {
        scrollProgress.set(latest);
      }
    });

    return unsubscribe;
  }, [scrollYProgress, scrollProgress]);

  const y = useTransform(scrollProgress, [0, 0.2, 0.95, 1], ["100vh", "0vh", "0vh", "-20vh"]);
  const opacity = useTransform(scrollProgress, [0, 0.15, 0.95, 1], [0, 1, 1, 0]);
  const contentOpacity = useTransform(scrollProgress, [0.15, 0.4], [0, 1]);
  const col1Y = useTransform(scrollProgress, [0.2, 0.4], ["32px", "0px"]);
  const col2Y = useTransform(scrollProgress, [0.25, 0.45], ["32px", "0px"]);

  const slideProgress = useTransform(scrollProgress, [0.6, 0.8], [0, 1]);

  useEffect(() => {
    const unsubscribe = slideProgress.on('change', (v) => {
      const newIndex = Math.round(v);
      if (newIndex !== slideIndex) {
        setSlideIndex(newIndex);
      }
    });
    return unsubscribe;
  }, [slideProgress, slideIndex]);

  const values = [
    { icon: '◈', label: 'Quality over quantity', desc: 'Every detail is intentional — we never trade craft for volume.' },
    { icon: '◉', label: 'Business-driven', desc: 'Every event is designed to generate real, measurable outcomes.' },
    { icon: '◎', label: 'Global mindset', desc: 'Connecting decision-makers across borders and industries.' },
  ];

  const vmSlides = [
    { label: 'Mission', text: 'We design, organize, and deliver events that generate real business outcomes.' },
    { label: 'Vision', text: 'To become the leading platform for meaningful B2B connections worldwide.' },
  ];

  return (
    <>
      <style>{`
        .aus-wrapper {
          min-height: 300vh;
          position: relative;
        }
        .aus-sticky {
          position: sticky;
          top: 90px;
          height: calc(100vh - 90px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .aus-card {
          width: 90vw;
          max-width: 1400px;
          height: 85vh;
          max-height: 700px;
          border-radius: 16px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.55);
          overflow: hidden;
          position: relative;
        }
        .aus-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 100%;
          overflow: hidden;
        }
        .aus-left {
          display: flex;
          flex-direction: column;
          padding: clamp(2rem, 3.5vw, 3.5rem);
          background: #F5F5F5;
          position: relative;
          border-right: 1px solid rgba(0,62,86,0.1);
        }
        .aus-eyebrow {
          font-size:1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(0,62,86,0.4);
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }
        .aus-heading {
          font-size: 5rem;
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.04em;
          margin: 0 0 1.2rem 0;
          color: #003f5c;
          position: relative;
          z-index: 1;
        }
        .aus-subtext {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(0,62,86,0.6);
          max-width: 340px;
          margin: 0 0 1.5rem 0;
          position: relative;
          z-index: 1;
        }
        .aus-values-label {
          font-size: 2rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(0,62,86,0.35);
          border-top: 0px solid ;
          padding-top: 0rem;
          margin-bottom: 0rem;
          position: relative;
          z-index: 1;
        }
        .aus-value-row {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          padding: 1rem 0;
          position: relative;
          z-index: 1;
          font-size: 0.7rem;
        }
        .aus-value-row + .aus-value-row {
          border-top: 1px solid rgba(0,62,86,0.08);
        }
        .aus-value-icon {
          color: var(--color-primary, #17b8c8);
          font-size: 0.7rem;
          margin-top: 0.05rem;
          flex-shrink: 0;
        }
        .aus-value-title {
          font-size: 1rem;
          font-weight: 600;
          color: #003f5c;
          letter-spacing: -0.01em;
          line-height: 1.4;
        }
        .aus-value-desc {
          font-size: 0.8rem;
          color: rgba(0,62,86,0.5);
          margin-top: 0.15rem;
          line-height: 1.5;
        }
        .aus-right {
          display: flex;
          flex-direction: column;
          padding: clamp(2rem, 3.5vw, 3.5rem);
          background: linear-gradient(155deg, #0d4a62 0%, #071e2b 100%);
          position: relative;
        }
        .aus-grain {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }
        .aus-vm-container {
          flex: 1;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          background: rgba(7,30,43,0.6);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          z-index: 1;
        }
        .aus-vm-slides {
          flex: 1;
          position: relative;
          overflow: hidden;
        }
        .aus-vm-slide {
          position: absolute;
          inset: 0;
          padding: clamp(2rem, 3vw, 3rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .aus-vm-slide.active { opacity: 1; transform: translateX(0); }
        .aus-vm-slide.next { opacity: 0; transform: translateX(100%); }
        .aus-vm-slide.prev { opacity: 0; transform: translateX(-100%); }
        .aus-vm-label {
          font-size: 2rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--color-primary, #17b8c8);
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .aus-vm-text {
          font-size: clamp(1rem, 1.6vw, 1.35rem);
          line-height: 1.65;
          color: rgba(255,255,255,0.9);
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        .aus-vm-nav {
          display: flex;
          gap: 0.4rem;
          padding: 1rem clamp(2rem, 3vw, 3rem);
          border-top: 1px solid rgba(255,255,255,0.1);
          background: rgba(7,30,43,0.4);
        }
        .aus-vm-dot {
          width: 28px;
          height: 3px;
          background: rgba(255,255,255,0.2);
          border-radius: 2px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .aus-vm-dot.active {
          background: var(--color-primary, #17b8c8);
          box-shadow: 0 0 8px rgba(23,184,200,0.4);
        }
        .aus-vm-dot:hover { background: rgba(255,255,255,0.35); }

        @media (max-width: 768px) {
          .aus-grid {
            grid-template-columns: 1fr;
          }
          .aus-left {
            min-height: 50vh;
            border-right: none;
            border-bottom: 1px solid rgba(0,62,86,0.1);
          }
          .aus-right {
            min-height: 50vh;
          }
        }
      `}</style>

      <div ref={containerRef} className="aus-wrapper">
        <div className="aus-sticky">
          <motion.div
            className="aus-card"
            style={{ y, opacity }}
          >
            <motion.div className="aus-grid" style={{ opacity: contentOpacity }}>
              <motion.div className="aus-left" style={{ y: col1Y }}>
                <div>
                  <div className="aus-eyebrow">Wink B2B Agency</div>
                  <h2 className="aus-heading">The Wink Way.</h2>
                  <p className="aus-subtext">Connecting decision-makers through carefully curated business experiences.</p>
                </div>
                <div>
                  <div className="aus-values-label">Values & Principles</div>
                  {values.map((v, i) => (
                    <div key={i} className="aus-value-row">
                      <span className="aus-value-icon">{v.icon}</span>
                      <div>
                        <div className="aus-value-title">{v.label}</div>
                        <div className="aus-value-desc">{v.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="aus-right" style={{ y: col2Y }}>
                <div className="aus-grain" />
                <div className="aus-vm-container">
                  <div className="aus-vm-slides">
                    {vmSlides.map((slide, i) => (
                      <div
                        key={i}
                        className={`aus-vm-slide ${
                          i === slideIndex ? 'active' :
                          i > slideIndex ? 'next' : 'prev'
                        }`}
                      >
                        <div className="aus-vm-label">{slide.label}</div>
                        <div className="aus-vm-text">{slide.text}</div>
                      </div>
                    ))}
                  </div>
                  <div className="aus-vm-nav">
                    {vmSlides.map((_, i) => (
                      <div
                        key={i}
                        className={`aus-vm-dot ${i === slideIndex ? 'active' : ''}`}
                        onClick={() => setSlideIndex(i)}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}