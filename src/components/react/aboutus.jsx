import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import { useRef, useLayoutEffect, useState, useEffect } from 'react';

function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
function easeInExpo(t)  { return t === 0 ? 0 : Math.pow(2, 10 * t - 10); }

export default function AboutUs() {
  const markerRef = useRef(null);
  const headerRef = useRef(null);
  const [offsetTop, setOffsetTop] = useState(Infinity);
  const [TRAVEL, setTRAVEL] = useState(2400);
  const [slideIndex, setSlideIndex] = useState(0);
  const vmContainerRef = useRef(null);

  useLayoutEffect(() => { headerRef.current = document.querySelector('.header'); }, []);
  useEffect(() => { setTRAVEL(window.innerHeight * 2.8); }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const trigger = document.getElementById('about-trigger');
      if (!trigger) return;
      setOffsetTop(trigger.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.5);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const scrollY = useMotionValue(0);
  const headerH = useMotionValue(90);
  const innerH  = useMotionValue(768);

  const progress = useTransform(scrollY, (y) => {
    if (offsetTop === Infinity) return 0;
    return Math.min(1, Math.max(0, (y - offsetTop) / TRAVEL));
  });

  const activeSlideValue = useTransform(progress, [0.35, 0.55], [0, 1]);

  useAnimationFrame(() => {
    scrollY.set(window.scrollY);
    innerH.set(window.innerHeight);
    if (headerRef.current) headerH.set(headerRef.current.getBoundingClientRect().height);

    const currentSlide = Math.round(activeSlideValue.get());
    if (currentSlide !== slideIndex) setSlideIndex(currentSlide);
  });

  const cardW = useTransform(progress, (p) => {
    if (p < 0.01) return '0px';
    if (p < 0.03) return '8px';
    if (p < 0.20) return `${easeOutExpo((p - 0.03) / 0.17) * 100}vw`;
    if (p < 0.80) return '100vw';
    if (p < 0.97) return `${easeInExpo(1 - (p - 0.80) / 0.17) * 100}vw`;
    if (p < 0.99) return '8px';
    return '0px';
  });

  const cardH = useTransform([progress, headerH, innerH], ([p, hh, ih]) => {
    const full = ih - hh;
    if (p < 0.01) return '0px';
    if (p < 0.03) return '8px';
    if (p < 0.20) return `${easeOutExpo((p - 0.03) / 0.17) * full}px`;
    if (p < 0.80) return `${full}px`;
    if (p < 0.97) return `${easeInExpo(1 - (p - 0.80) / 0.17) * full}px`;
    if (p < 0.99) return '8px';
    return '0px';
  });

  const radius = useTransform(progress, (p) => {
    if (p < 0.03) return '50%';
    if (p < 0.12) return `${50 - easeOutExpo((p - 0.03) / 0.09) * 50}%`;
    if (p < 0.80) return '0px';
    if (p < 0.89) return `${easeInExpo((p - 0.80) / 0.09) * 50}%`;
    return '50%';
  });

  const contentOpacity = useTransform(progress, [0.18, 0.26, 0.74, 0.80], [0, 1, 1, 0]);
  const col1Op = useTransform(progress, [0.19, 0.27], [0, 1]);
  const col1Y  = useTransform(progress, [0.19, 0.29], ['24px', '0px']);
  const col2Op = useTransform(progress, [0.22, 0.30], [0, 1]);
  const col2Y  = useTransform(progress, [0.22, 0.32], ['24px', '0px']);
  const scrollProgressScale = useTransform(progress, [0, 1], [0, 1]);
  const containerDisplay = useTransform(progress, (p) => p < 0.01 ? 'none' : 'flex');
  const containerTop     = useTransform(headerH, (hh) => `${hh}px`);
  const containerH       = useTransform([headerH, innerH], ([hh, ih]) => `${ih - hh}px`);

  const values = [
    { icon: '◈', label: 'Quality over quantity', desc: 'Every detail is intentional — we never trade craft for volume.'  },
    { icon: '◉', label: 'Business-driven',        desc: 'Every event is designed to generate real, measurable outcomes.' },
    { icon: '◎', label: 'Global mindset',          desc: 'Connecting decision-makers across borders and industries.'      },
  ];

  const vmSlides = [
    { label: 'Mission', text: 'We design, organize, and deliver events that generate real business outcomes.' },
    { label: 'Vision',  text: 'To become the leading platform for meaningful B2B connections worldwide.' },
  ];

  return (
    <>
      <style>{`
        .au-container {
          position: fixed;
          left: 0;
          right: 0;
          align-items: flex-start;
          justify-content: center;
          pointer-events: none;
          z-index: 50;
          overflow: hidden;
        }
        .au-card {
          overflow: hidden;
          flex-shrink: 0;
          position: relative;
          pointer-events: auto;
          background: linear-gradient(155deg, #0d4a62 0%, #071e2b 100%);
          box-shadow: 0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .au-scroll-progress {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: rgba(255,255,255,0.08);
          z-index: 100;
          overflow: hidden;
        }
        .au-scroll-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--color-primary, #17b8c8) 0%, rgba(23,184,200,0.6) 100%);
          box-shadow: 0 0 12px rgba(23,184,200,0.6);
          transform-origin: left;
        }
        .au-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
        }
        .au-grid {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
        }
        .au-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(2rem, 4vw, 4.5rem);
          border-right: 1px solid rgba(255,255,255,0.07);
          box-sizing: border-box;
          overflow: hidden;
        }
        .au-eyebrow {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.28);
          margin-bottom: 1.5rem;
        }
        .au-heading {
          font-size: clamp(3rem, 6.5vw, 6rem);
          font-weight: 900;
          line-height: 0.88;
          letter-spacing: -0.04em;
          margin: 0 0 1.8rem 0;
          color: #fff;
        }
        .au-subtext {
          font-size: clamp(0.82rem, 1vw, 0.95rem);
          line-height: 1.8;
          color: rgba(255,255,255,0.42);
          max-width: 360px;
          margin: 0 0 2rem 0;
        }
        .au-values-label {
          font-size: 0.55rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.22);
          border-top: 1px solid rgba(255,255,255,0.07);
          padding-top: 1.2rem;
          margin-bottom: 0.8rem;
        }
        .au-value-row {
          display: flex;
          gap: 0.9rem;
          align-items: flex-start;
          padding: 0.55rem 0;
        }
        .au-value-row + .au-value-row {
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .au-value-icon {
          color: var(--color-primary, #17b8c8);
          font-size: 0.75rem;
          margin-top: 0.1rem;
          flex-shrink: 0;
        }
        .au-value-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.01em;
        }
        .au-value-desc {
          font-size: 0.68rem;
          color: rgba(255,255,255,0.3);
          margin-top: 0.12rem;
          line-height: 1.5;
        }
        .au-right {
          display: flex;
          flex-direction: column;
          padding: clamp(2rem, 4vw, 4.5rem);
          box-sizing: border-box;
          gap: clamp(1rem, 2vh, 1.8rem);
          overflow: hidden;
        }
        .au-vm-container {
          flex: 1 1 0;
          min-height: 0;
          border-radius: 0.6rem;
          overflow: hidden;
          position: relative;
          background: rgba(7,30,43,0.6);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          flex-direction: column;
        }
        .au-vm-slides {
          flex: 1;
          position: relative;
          overflow: hidden;
        }
        .au-vm-slide {
          position: absolute;
          inset: 0;
          padding: clamp(2rem, 3vw, 3.5rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .au-vm-slide.active { opacity: 1; transform: translateX(0); }
        .au-vm-slide.next { opacity: 0; transform: translateX(100%); }
        .au-vm-slide.prev { opacity: 0; transform: translateX(-100%); }
        .au-vm-label {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--color-primary, #17b8c8);
          margin-bottom: 1.2rem;
        }
        .au-vm-text {
          font-size: clamp(1.2rem, 2vw, 1.6rem);
          line-height: 1.6;
          color: rgba(255,255,255,0.85);
          font-weight: 500;
          letter-spacing: -0.02em;
        }
        .au-vm-nav {
          display: flex;
          gap: 0.5rem;
          padding: 1rem clamp(2rem, 3vw, 3.5rem);
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .au-vm-dot {
          width: 32px;
          height: 3px;
          background: rgba(255,255,255,0.15);
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .au-vm-dot.active { background: var(--color-primary, #17b8c8); }
        .au-spacer {
          pointer-events: none;
          background: linear-gradient(to bottom, var(--color-bg, #013e56) 70%, var(--color-bg-secondary, #018391) 100%);
        }
      `}</style>

      <motion.div
        className="au-container"
        style={{ top: containerTop, height: containerH, display: containerDisplay }}
      >
        <motion.div
          className="au-card"
          style={{ width: cardW, height: cardH, borderRadius: radius }}
        >
          <div className="au-scroll-progress">
            <motion.div className="au-scroll-progress-bar" style={{ scaleX: scrollProgressScale }} />
          </div>
          <div className="au-grain" />

          <motion.div className="au-grid" style={{ opacity: contentOpacity }}>
            <motion.div className="au-left" style={{ opacity: col1Op, y: col1Y }}>
              <div>
                <div className="au-eyebrow">Wink B2B Agency</div>
                <h2 className="au-heading">The<br />Wink<br />Way.</h2>
                <p className="au-subtext">Connecting decision-makers through carefully curated business experiences.</p>
              </div>
              <div>
                <div className="au-values-label">Values & Principles</div>
                {values.map((v, i) => (
                  <div key={i} className="au-value-row">
                    <span className="au-value-icon">{v.icon}</span>
                    <div>
                      <div className="au-value-title">{v.label}</div>
                      <div className="au-value-desc">{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div className="au-right" style={{ opacity: col2Op, y: col2Y }}>
              <div className="au-vm-container" ref={vmContainerRef}>
                <div className="au-vm-slides">
                  {vmSlides.map((slide, i) => (
                    <div
                      key={i}
                      className={`au-vm-slide ${
                        i === slideIndex ? 'active' :
                        i > slideIndex ? 'next' : 'prev'
                      }`}
                    >
                      <div className="au-vm-label">{slide.label}</div>
                      <div className="au-vm-text">{slide.text}</div>
                    </div>
                  ))}
                </div>
                <div className="au-vm-nav">
                  {vmSlides.map((_, i) => (
                    <div key={i} className={`au-vm-dot ${i === slideIndex ? 'active' : ''}`} />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="au-spacer" style={{ height: TRAVEL }} />
    </>
  );
}
