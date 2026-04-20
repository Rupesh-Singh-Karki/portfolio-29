import { ArrowUpRight } from 'lucide-react';
import SectionLabel from '../../components/ui/SectionLabel';
import SectionHeading from '../../components/ui/SectionHeading';
import Badge from '../../components/ui/Badge';
import FadeInUp from '../../components/animations/FadeInUp';
import { publications } from '../../data/publications';

const typeColors: Record<string, 'cyan' | 'pink' | 'warning'> = {
  'Research Paper': 'cyan',
  'Blog Post': 'pink',
  'Conference Talk': 'warning',
  'Technical Article': 'pink',
};

export default function Publications() {
  return (
    <section
      id="publications"
      style={{
        position: 'relative',
        padding: 'var(--space-24) 0',
        overflow: 'hidden',
      }}
    >
      <div className="section-ordinal" aria-hidden="true" style={{ top: 'var(--space-8)', left: 'var(--space-8)' }}>
        07
      </div>

      {/* Transmission SVG background */}
      <svg
        aria-hidden="true"
        role="presentation"
        viewBox="0 0 400 400"
        style={{
          position: 'absolute',
          top: 'var(--space-16)',
          right: '-5%',
          width: '400px',
          height: '400px',
          pointerEvents: 'none',
          opacity: 0.4,
        }}
      >
        {[80, 120, 160, 200, 240, 280].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke={i % 2 === 0 ? 'rgba(255,45,120,0.06)' : 'rgba(0,224,255,0.04)'}
            strokeWidth="0.5"
          >
            <animate
              attributeName="r"
              values={`${r};${r + 20};${r}`}
              dur={`${3 + i * 0.5}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0.3;1"
              dur={`${3 + i * 0.5}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        <circle cx="200" cy="200" r="4" fill="rgba(255,45,120,0.3)" />
      </svg>

      <div className="section-container">
        <FadeInUp>
          <SectionLabel number="07" label="PUBLICATIONS" />
          <SectionHeading>Words that reached the world.</SectionHeading>
        </FadeInUp>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-1)',
          }}
        >
          {publications.map((pub, index) => (
            <FadeInUp key={pub.id} delay={index * 80}>
              <a
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read: ${pub.title}`}
                className="pub-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr auto',
                  gap: 'var(--space-4)',
                  alignItems: 'center',
                  padding: 'var(--space-5) var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  position: 'relative',
                  transition: 'all var(--dur-fast) var(--ease-out-expo)',
                  borderLeft: '4px solid transparent',
                  minHeight: '44px',
                }}
              >
                {/* Ordinal */}
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: 'var(--text-4xl)',
                    color: 'var(--pink-500)',
                    opacity: 0.1,
                    lineHeight: 1,
                    transition: 'opacity var(--dur-fast) ease',
                  }}
                  className="pub-ordinal"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-2)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Badge variant={typeColors[pub.type] || 'pink'}>{pub.type}</Badge>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-tertiary)',
                      }}
                    >
                      {pub.platform}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: 'var(--text-lg)',
                      color: 'var(--text-primary)',
                      lineHeight: 1.4,
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    {pub.title}
                  </h3>
                  <div
                    style={{
                      display: 'flex',
                      gap: 'var(--space-3)',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-tertiary)',
                      }}
                    >
                      {pub.authors.map((author, i) => (
                        <span key={i}>
                          {author.includes('Rupesh') ? (
                            <span style={{ color: 'var(--pink-400)' }}>{author}</span>
                          ) : (
                            author
                          )}
                          {i < pub.authors.length - 1 && ', '}
                        </span>
                      ))}
                    </span>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)' }}>·</span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-tertiary)',
                      }}
                    >
                      {pub.date}
                    </span>
                  </div>
                </div>

                {/* Right side */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 'var(--space-2)',
                  }}
                >
                  {pub.readTime && (
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-tertiary)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {pub.readTime}
                    </span>
                  )}
                  <div
                    className="pub-arrow"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(255,45,120,0.1)',
                      border: '0.5px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--pink-500)',
                      transition: 'all var(--dur-fast) ease',
                    }}
                  >
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </div>
                </div>
              </a>
            </FadeInUp>
          ))}
        </div>
      </div>

      <style>{`
        .pub-row:hover {
          background: rgba(255,45,120,0.03);
          border-left-color: var(--pink-500) !important;
        }
        .pub-row:hover .pub-ordinal {
          opacity: 0.18 !important;
        }
        .pub-row:hover .pub-arrow {
          background: rgba(255,45,120,0.2) !important;
          transform: scale(1.1);
        }
        .pub-row:focus-visible {
          outline: none;
          box-shadow: var(--focus-ring);
          border-radius: var(--radius-md);
        }
        @media (max-width: 767px) {
          .pub-row {
            grid-template-columns: 1fr auto !important;
          }
          .pub-row > span:first-child {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
