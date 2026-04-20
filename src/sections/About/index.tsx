import SectionLabel from '../../components/ui/SectionLabel';
import SectionHeading from '../../components/ui/SectionHeading';
import NumberCounter from '../../components/ui/NumberCounter';
import Badge from '../../components/ui/Badge';
import FadeInUp from '../../components/animations/FadeInUp';

const interests = [
  'Web Performance', 'System Design', 'Rust', 'WebAssembly',
  'AI/ML', 'Open Source', 'Technical Writing', 'Cloud Architecture',
];

const stats = [
  { value: 4, suffix: '+', label: 'Years Experience' },
  { value: 30, suffix: '+', label: 'Projects Shipped' },
  { value: 10, suffix: '+', label: 'Certifications' },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        padding: 'var(--space-24) 0',
        overflow: 'hidden',
      }}
    >
      {/* Background ordinal */}
      <div className="section-ordinal" aria-hidden="true" style={{ top: 'var(--space-8)', right: 'var(--space-8)' }}>
        02
      </div>

      <div className="section-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-16)',
            alignItems: 'start',
          }}
          className="about-grid"
        >
          {/* Left — Illustration + Stats */}
          <FadeInUp>
            <div>
              {/* Neon City Illustration */}
              <div
                aria-hidden="true"
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  borderRadius: 'var(--radius-lg)',
                  background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%)',
                  border: '0.5px solid var(--border-subtle)',
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: 'var(--space-10)',
                }}
              >
                {/* SVG city skyline */}
                <svg
                  viewBox="0 0 400 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Stylised neon city illustration"
                  style={{ width: '100%', height: '100%' }}
                >
                  {/* Sky gradient */}
                  <defs>
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#08060d" />
                      <stop offset="100%" stopColor="#0f0a18" />
                    </linearGradient>
                    <linearGradient id="pinkNeon" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ff2d78" />
                      <stop offset="100%" stopColor="#ff6bac" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="300" fill="url(#skyGrad)" />

                  {/* Buildings */}
                  <rect x="30" y="100" width="50" height="200" fill="#0a0812" stroke="rgba(255,45,120,0.1)" strokeWidth="0.5" />
                  <rect x="90" y="60" width="40" height="240" fill="#0c0916" stroke="rgba(0,224,255,0.08)" strokeWidth="0.5" />
                  <rect x="145" y="120" width="55" height="180" fill="#0a0812" stroke="rgba(255,45,120,0.1)" strokeWidth="0.5" />
                  <rect x="215" y="80" width="45" height="220" fill="#0c0916" stroke="rgba(0,224,255,0.08)" strokeWidth="0.5" />
                  <rect x="275" y="100" width="60" height="200" fill="#0a0812" stroke="rgba(255,45,120,0.1)" strokeWidth="0.5" />
                  <rect x="350" y="130" width="50" height="170" fill="#0c0916" stroke="rgba(0,224,255,0.08)" strokeWidth="0.5" />

                  {/* Windows */}
                  {[40, 48, 56].map((x) =>
                    [120, 140, 160, 180, 210, 240].map((y) => (
                      <rect key={`w-${x}-${y}`} x={x} y={y} width="3" height="3" fill="rgba(255,45,120,0.4)" rx="0.5">
                        <animate attributeName="opacity" values="0.4;0.1;0.4" dur={`${2 + Math.random() * 3}s`} repeatCount="indefinite" />
                      </rect>
                    ))
                  )}
                  {[100, 108, 116].map((x) =>
                    [80, 100, 130, 160, 190, 220, 250].map((y) => (
                      <rect key={`w2-${x}-${y}`} x={x} y={y} width="3" height="3" fill="rgba(0,224,255,0.3)" rx="0.5">
                        <animate attributeName="opacity" values="0.3;0.1;0.3" dur={`${3 + Math.random() * 4}s`} repeatCount="indefinite" />
                      </rect>
                    ))
                  )}
                  {[225, 233, 241].map((x) =>
                    [100, 120, 150, 180, 210, 240].map((y) => (
                      <rect key={`w3-${x}-${y}`} x={x} y={y} width="3" height="3" fill="rgba(255,45,120,0.35)" rx="0.5">
                        <animate attributeName="opacity" values="0.35;0.1;0.35" dur={`${2.5 + Math.random() * 3}s`} repeatCount="indefinite" />
                      </rect>
                    ))
                  )}

                  {/* Neon signs */}
                  <rect x="155" y="145" width="30" height="8" rx="1" fill="none" stroke="#ff2d78" strokeWidth="1" opacity="0.8" filter="url(#pinkGlow)">
                    <animate attributeName="opacity" values="0.8;0.5;0.8" dur="2.5s" repeatCount="indefinite" />
                  </rect>
                  <rect x="285" y="125" width="25" height="8" rx="1" fill="none" stroke="#00e0ff" strokeWidth="1" opacity="0.7">
                    <animate attributeName="opacity" values="0.7;0.4;0.7" dur="3.2s" repeatCount="indefinite" />
                  </rect>

                  {/* Street / Ground */}
                  <rect x="0" y="290" width="400" height="10" fill="#0c0916" />
                  {/* Street reflections */}
                  <rect x="150" y="291" width="40" height="9" fill="rgba(255,45,120,0.06)" />
                  <rect x="280" y="291" width="35" height="9" fill="rgba(0,224,255,0.04)" />

                  {/* Rain lines */}
                  {Array.from({ length: 15 }, (_, i) => (
                    <line
                      key={`rain-${i}`}
                      x1={20 + i * 26}
                      y1={0}
                      x2={14 + i * 26}
                      y2={20}
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="0.5"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values={`0,${-20 + i * 5};-6,300`}
                        dur={`${1 + Math.random() * 0.8}s`}
                        repeatCount="indefinite"
                      />
                      <animate attributeName="opacity" values="0;0.08;0" dur={`${1 + Math.random() * 0.8}s`} repeatCount="indefinite" />
                    </line>
                  ))}

                  {/* Glow filter */}
                  <defs>
                    <filter id="pinkGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                    </filter>
                  </defs>
                </svg>

                {/* Float animation overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    animation: 'float 5s ease-in-out infinite',
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* Stats */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 'var(--space-4)',
                }}
              >
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    style={{
                      textAlign: 'center',
                      padding: 'var(--space-4) 0',
                      borderRight: i < 2 ? '1px solid var(--border-subtle)' : 'none',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', cursive",
                        fontSize: 'var(--text-5xl)',
                      }}
                      className="gradient-text-cyan"
                    >
                      <NumberCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-tertiary)',
                        marginTop: 'var(--space-1)',
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>

          {/* Right — Bio */}
          <FadeInUp delay={200}>
            <div>
              <SectionLabel number="02" label="ABOUT" />
              <SectionHeading>The mind behind the machine.</SectionHeading>

              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 'var(--text-base)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-8)',
                  maxWidth: '60ch',
                }}
              >
                <p>
                  I'm a full-stack developer who thrives at the intersection of
                  design and engineering. With {'>'}4 years of experience building
                  web applications, I specialize in creating performant,
                  accessible, and visually stunning digital experiences.
                </p>
                <p>
                  From architecting microservices to crafting pixel-perfect
                  interfaces, I bring an obsessive attention to detail and a deep
                  understanding of the entire stack. I believe great software is
                  equal parts art and engineering.
                </p>
              </div>

              {/* Currently into */}
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 600,
                    fontSize: 'var(--text-lg)',
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  Currently into
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {interests.map((interest) => (
                    <Badge key={interest} variant="pink">{interest}</Badge>
                  ))}
                </div>
              </div>

              {/* Availability card */}
              <div
                className="glass-card"
                style={{
                  padding: 'var(--space-4) var(--space-6)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--color-success)',
                    boxShadow: '0 0 8px rgba(0,224,150,0.6)',
                    animation: 'pulse 2s ease-in-out infinite',
                    display: 'inline-block',
                  }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 600,
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-primary)',
                  }}
                >
                  Open to opportunities
                </span>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes float { 0%, 100% { transform: none; } }
          @keyframes pulse { 0%, 100% { opacity: 1; } }
        }
        @media (max-width: 1023px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
