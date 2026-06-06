import SectionLabel from '../../components/ui/SectionLabel';
import SectionHeading from '../../components/ui/SectionHeading';
import Badge from '../../components/ui/Badge';
import FadeInUp from '../../components/animations/FadeInUp';
import { skills } from '../../data/skills';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const categories = ['Frontend', 'Backend', 'AI/ML', 'Databases', 'DevOps', 'Tools'] as const;
const categoryIcons: Record<string, string> = {
  Frontend: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  Backend: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
  'AI/ML': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22"/><path d="M12 2a4 4 0 0 0-4 4c0 1.95 1.4 3.58 3.25 3.93"/><path d="M8.56 9.8a3.5 3.5 0 1 0-1.4 5.78"/><path d="M15.44 9.8a3.5 3.5 0 1 1 1.4 5.78"/></svg>',
  Databases: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>',
  DevOps: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>',
  Tools: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
};

// Build marquee rows
const marqueeRow1 = skills.filter((_, i) => i % 2 === 0);
const marqueeRow2 = skills.filter((_, i) => i % 2 === 1);

export default function Skills() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="skills"
      style={{
        position: 'relative',
        padding: 'var(--space-24) 0',
        overflow: 'hidden',
      }}
    >
      <div className="section-ordinal" aria-hidden="true" style={{ top: 'var(--space-8)', left: 'var(--space-8)' }}>
        05
      </div>

      <div className="section-container">
        <FadeInUp>
          <SectionLabel number="05" label="SKILLS" />
          <SectionHeading>The tools of the craft.</SectionHeading>
        </FadeInUp>

        {/* Category cards */}
        <FadeInUp delay={100}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-16)',
            }}
            className="skills-grid"
          >
            {categories.map((cat) => {
              const catSkills = skills.filter((s) => s.category === cat);
              return (
                <div
                  key={cat}
                  className="glass-card"
                  style={{
                    padding: 'var(--space-6)',
                    transition: 'all var(--dur-fast) var(--ease-out-expo)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: ['Frontend', 'AI/ML', 'DevOps'].includes(cat) ? 'var(--pink-500)' : 'var(--cyan-500)',
                      }}
                      aria-hidden="true"
                      dangerouslySetInnerHTML={{ __html: categoryIcons[cat] }}
                    />
                    <h3
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 600,
                        fontSize: 'var(--text-lg)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {cat}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {catSkills.map((skill, i) => (
                      <Badge
                        key={skill.name}
                        variant={i % 2 === 0 ? 'pink' : 'cyan'}
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </FadeInUp>

        {/* Marquee rows */}
        <div style={{ overflow: 'hidden' }}>
          <MarqueeRow items={marqueeRow1} direction="left" speed={35} reducedMotion={reducedMotion} />
          <div style={{ height: 'var(--space-4)' }} />
          <MarqueeRow items={marqueeRow2} direction="right" speed={40} reducedMotion={reducedMotion} />
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) and (min-width: 768px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 767px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function MarqueeRow({
  items,
  direction,
  speed,
  reducedMotion,
}: {
  items: typeof skills;
  direction: 'left' | 'right';
  speed: number;
  reducedMotion: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
      className="marquee-container"
    >
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-6)',
          width: 'max-content',
          animation: reducedMotion
            ? 'none'
            : `marquee-${direction} ${speed}s linear infinite`,
          animationPlayState: 'running',
        }}
        className="marquee-track"
      >
        {doubled.map((skill, i) => (
          <div
            key={`${skill.name}-${i}`}
            aria-label={skill.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-2) var(--space-4)',
              minWidth: '44px',
              minHeight: '44px',
              borderRadius: 'var(--radius-md)',
              border: '0.5px solid var(--border-subtle)',
              background: 'var(--bg-surface)',
              transition: 'all var(--dur-fast) ease',
            }}
            className="marquee-item"
          >
            <img
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}/${skill.icon}-original.svg`}
              alt=""
              width={24}
              height={24}
              loading="lazy"
              decoding="async"
              style={{
                filter: 'grayscale(1) opacity(0.5)',
                transition: 'filter var(--dur-fast) ease',
              }}
              className="marquee-icon"
              onError={(e) => {
                const img = e.currentTarget;
                const base = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}/${skill.icon}`;
                if (img.src.includes('-original.svg')) {
                  img.src = `${base}-plain.svg`;
                } else if (img.src.includes('-plain.svg') && !img.src.includes('-wordmark')) {
                  img.src = `${base}-original-wordmark.svg`;
                } else if (img.src.includes('-original-wordmark')) {
                  img.src = `${base}-plain-wordmark.svg`;
                }
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                whiteSpace: 'nowrap',
              }}
            >
              {skill.name}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }
        .marquee-item:hover {
          border-color: var(--border-medium) !important;
          background: var(--bg-elevated) !important;
        }
        .marquee-item:hover .marquee-icon {
          filter: grayscale(0) opacity(1) !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
