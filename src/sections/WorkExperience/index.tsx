import { useEffect, useRef } from 'react';
import SectionLabel from '../../components/ui/SectionLabel';
import SectionHeading from '../../components/ui/SectionHeading';
import Badge from '../../components/ui/Badge';
import FadeInUp from '../../components/animations/FadeInUp';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { experiences } from '../../data/experience';

export default function WorkExperience() {
  const timelineRef = useRef<SVGLineElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !timelineRef.current || !sectionRef.current) return;

    let gsapModule: typeof import('gsap') | null = null;
    let scrollTriggerModule: typeof import('gsap/ScrollTrigger') | null = null;

    const init = async () => {
      gsapModule = await import('gsap');
      scrollTriggerModule = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default || gsapModule;
      const { ScrollTrigger } = scrollTriggerModule;
      gsap.registerPlugin(ScrollTrigger);

      const line = timelineRef.current;
      if (!line) return;
      const length = line.getTotalLength();
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          scrub: 1.2,
        },
      });
    };
    init();
  }, [reducedMotion]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: 'var(--space-24) 0',
        overflow: 'hidden',
      }}
    >
      <div className="section-ordinal" aria-hidden="true" style={{ top: 'var(--space-8)', left: 'var(--space-8)' }}>
        03
      </div>

      <div className="section-container">
        <FadeInUp>
          <SectionLabel number="03" label="EXPERIENCE" />
          <SectionHeading>The journey so far.</SectionHeading>
        </FadeInUp>

        <div
          style={{
            position: 'relative',
            paddingLeft: 'var(--space-12)',
            marginTop: 'var(--space-8)',
          }}
          className="timeline-wrapper"
        >
          {/* Timeline spine */}
          <svg
            style={{
              position: 'absolute',
              left: '15px',
              top: 0,
              width: '2px',
              height: '100%',
              overflow: 'visible',
            }}
            aria-hidden="true"
          >
            <line
              ref={timelineRef}
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="url(#timelineGrad)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="timelineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff2d78" />
                <stop offset="100%" stopColor="#ff6bac" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          {experiences.map((exp, index) => (
            <FadeInUp key={exp.id} delay={index * 100}>
              <div style={{ position: 'relative', marginBottom: 'var(--space-8)' }}>
                {/* Timeline dot */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '-37px',
                    top: 'var(--space-6)',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: exp.current ? 'var(--pink-500)' : 'var(--bg-elevated)',
                    border: '2px solid var(--pink-500)',
                    boxShadow: exp.current ? 'var(--pink-glow-sm)' : 'none',
                    zIndex: 2,
                  }}
                />

                {/* Card */}
                <div
                  className="glass-card timeline-card"
                  style={{
                    padding: 'var(--space-6)',
                    borderLeft: '4px solid var(--pink-500)',
                    transition: 'all 250ms var(--ease-out-expo)',
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: 'var(--space-2)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontWeight: 700,
                          fontSize: 'var(--text-lg)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        {exp.company}
                      </h3>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexWrap: 'wrap' }}>
                      {exp.current && (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 'var(--space-1)',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '11px',
                            color: 'var(--color-success)',
                            background: 'rgba(0,224,150,0.08)',
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-sm)',
                            border: '0.5px solid rgba(0,224,150,0.25)',
                          }}
                        >
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: 'var(--color-success)',
                              animation: 'pulse 2s ease-in-out infinite',
                            }}
                            aria-hidden="true"
                          />
                          Current
                        </span>
                      )}
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 'var(--text-xs)',
                          color: 'var(--cyan-500)',
                        }}
                      >
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>
                  </div>

                  {/* Role + badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
                    <h4
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 600,
                        fontSize: 'var(--text-base)',
                        color: 'var(--pink-400)',
                      }}
                    >
                      {exp.role}
                    </h4>
                    <Badge variant="cyan">{exp.type}</Badge>
                    <Badge variant="pink">{exp.locationType}</Badge>
                  </div>

                  {/* Achievements */}
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-2)',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          gap: 'var(--space-2)',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.7,
                        }}
                      >
                        <span style={{ color: 'var(--pink-500)', flexShrink: 0, marginTop: '2px' }}>&#x276F;</span>
                        <span dangerouslySetInnerHTML={{ __html: achievement.replace(/<metric>/g, '<span class="metric">').replace(/<\/metric>/g, '</span>') }} />
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {exp.techStack.map((tech) => (
                      <Badge key={tech} variant="pink">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>

      <style>{`
        .timeline-card:hover {
          border-left-color: var(--pink-400) !important;
          box-shadow: var(--pink-glow-sm), var(--shadow-card) !important;
          transform: translateX(4px);
        }
        @media (max-width: 639px) {
          .timeline-wrapper {
            padding-left: var(--space-8) !important;
          }
        }
      `}</style>
    </section>
  );
}
