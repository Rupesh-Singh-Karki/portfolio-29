import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../../components/ui/SocialIcons';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import NoirParticles from '../../components/three/NoirParticles';
import Button from '../../components/ui/Button';

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const easeOut = [0.16, 1, 0.3, 1] as const;

  const containerVariants: Variants = reducedMotion
    ? {}
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.15 },
        },
      };

  const itemVariants: Variants = reducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: easeOut },
        },
      };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--bg-void)',
      }}
    >
      {/* Hero bloom gradient */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--grad-hero-bloom)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Particles */}
      <NoirParticles />

      {/* Social icons (left edge) */}
      <div
        className="hero-socials"
        style={{
          position: 'absolute',
          left: 'var(--space-6)',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-4)',
          zIndex: 5,
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: '1px',
            height: '40px',
            background: 'var(--border-subtle)',
          }}
        />
        {[
          { icon: GithubIcon, href: 'https://github.com/Rupesh-Singh-Karki', label: 'Visit GitHub profile' },
          { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/rupesh-singh-karki-552226363/', label: 'Visit LinkedIn profile' },
        ].map(({ icon: Icon, href, label }) => (
          <motion.a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            variants={reducedMotion ? {} : {
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeOut } },
            }}
            initial={reducedMotion ? undefined : 'hidden'}
            animate={reducedMotion ? undefined : 'visible'}
            style={{
              color: 'var(--text-secondary)',
              transition: 'color var(--dur-fast) ease',
              minHeight: '44px',
              minWidth: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={18} aria-hidden="true" />
          </motion.a>
        ))}
        <div
          aria-hidden="true"
          style={{
            width: '1px',
            height: '40px',
            background: 'var(--border-subtle)',
          }}
        />
      </div>

      {/* Main content */}
      <div className="section-container" style={{ position: 'relative', zIndex: 3 }}>
        <motion.div
          variants={containerVariants}
          initial={reducedMotion ? undefined : 'hidden'}
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: 'var(--space-8)',
            minHeight: '100dvh',
            paddingTop: '72px',
          }}
          className="hero-grid"
        >
          {/* Text */}
          <div style={{ maxWidth: '580px' }}>
            <motion.div variants={itemVariants}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 'var(--text-sm)',
                  color: 'var(--cyan-500)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                RUPESH SINGH KARKI
                <span
                  style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '16px',
                    background: 'var(--cyan-500)',
                    animation: 'blink 1s step-end infinite',
                  }}
                  aria-hidden="true"
                />
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 'var(--text-hero)',
                lineHeight: 0.95,
                letterSpacing: '0.02em',
                marginBottom: 'var(--space-6)',
              }}
            >
              <span style={{ display: 'block', color: 'var(--text-primary)' }}>CRAFTING</span>
              <span className="gradient-text-pink" style={{ display: 'block' }}>DIGITAL</span>
              <span style={{ display: 'block', color: 'var(--text-primary)' }}>FUTURES</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'var(--text-lg)',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                maxWidth: '480px',
                marginBottom: 'var(--space-8)',
              }}
            >
              A developer crafting high-performance web experiences
              with modern technologies and obsessive attention to detail.
            </motion.p>

            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                flexWrap: 'wrap',
              }}
              className="hero-cta"
            >
              <a href="#projects" style={{ textDecoration: 'none' }}>
                <Button variant="primary">View My Work</Button>
              </a>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Button variant="secondary">Download CV</Button>
              </a>
            </motion.div>
          </div>

          {/* 3D Visual / Abstract */}
          <motion.div
            variants={reducedMotion ? {} : {
              hidden: { opacity: 0, scale: 0.88 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.8, ease: easeOut, delay: 0.2 },
              },
            }}
            initial={reducedMotion ? undefined : 'hidden'}
            animate="visible"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
            className="hero-visual"
          >
            {/* Abstract crystal shape with CSS */}
            <div
              aria-hidden="true"
              style={{
                width: 'clamp(280px, 30vw, 440px)',
                height: 'clamp(280px, 30vw, 440px)',
                position: 'relative',
              }}
            >
              {/* Outer glow */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-20%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,45,120,0.15) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  animation: reducedMotion ? 'none' : 'breathe 4s ease-in-out infinite',
                }}
              />
              {/* Core shape */}
              <div
                style={{
                  position: 'absolute',
                  inset: '10%',
                  borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                  background: 'linear-gradient(135deg, rgba(255,45,120,0.2), rgba(0,224,255,0.1))',
                  border: '1px solid rgba(255,45,120,0.3)',
                  backdropFilter: 'blur(20px)',
                  animation: reducedMotion ? 'none' : 'morphShape 8s ease-in-out infinite, rotate3d 20s linear infinite',
                  boxShadow: 'var(--pink-glow-lg), inset 0 0 60px rgba(255,45,120,0.1)',
                }}
              />
              {/* Inner core */}
              <div
                style={{
                  position: 'absolute',
                  inset: '25%',
                  borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
                  background: 'linear-gradient(315deg, rgba(0,224,255,0.15), rgba(255,45,120,0.2))',
                  border: '0.5px solid rgba(0,224,255,0.2)',
                  animation: reducedMotion ? 'none' : 'morphShape 8s ease-in-out infinite reverse, rotate3d 15s linear infinite reverse',
                  boxShadow: 'var(--cyan-glow-sm)',
                }}
              />
              {/* Center bright point */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--pink-500)',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 20px rgba(255,45,120,0.8), 0 0 60px rgba(255,45,120,0.4)',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={reducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 'var(--space-8)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-2)',
          zIndex: 5,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: 'var(--text-tertiary)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--pink-500), transparent)',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: 'var(--pink-500)',
              position: 'absolute',
              left: '-2px',
              animation: reducedMotion ? 'none' : 'scrollDot 2s ease-in-out infinite',
              boxShadow: '0 0 8px rgba(255,45,120,0.6)',
            }}
          />
        </div>
        <ArrowDown size={14} style={{ color: 'var(--text-tertiary)' }} />
      </motion.div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes morphShape {
          0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 58% 42% 52% 48% / 48% 58% 42% 52%; }
          50% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
          75% { border-radius: 42% 58% 48% 52% / 52% 42% 58% 48%; }
        }
        @keyframes rotate3d {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scrollDot {
          0%, 100% { top: 0; }
          50% { top: 35px; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes blink { 0%, 100% { opacity: 1; } }
        }
        @media (max-width: 1023px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            justify-items: center;
          }
          .hero-grid > div:first-child { max-width: 100% !important; }
          .hero-cta { justify-content: center; }
          .hero-visual { order: -1; }
          .hero-socials { display: none !important; }
        }
        @media (max-width: 639px) {
          .hero-cta {
            flex-direction: column;
            width: 100%;
          }
          .hero-cta a { width: 100%; }
          .hero-cta button { width: 100%; }
        }
      `}</style>
    </section>
  );
}
