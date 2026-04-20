import SectionLabel from '../../components/ui/SectionLabel';
import SectionHeading from '../../components/ui/SectionHeading';
import Badge from '../../components/ui/Badge';
import FadeInUp from '../../components/animations/FadeInUp';
import { skills } from '../../data/skills';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const categories = ['Frontend', 'Backend', 'DevOps', 'Tools'] as const;
const categoryIcons: Record<string, string> = {
  Frontend: '&#x2756;',
  Backend: '&#x2699;',
  DevOps: '&#x2601;',
  Tools: '&#x2692;',
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
              gridTemplateColumns: 'repeat(2, 1fr)',
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
                        fontSize: '20px',
                        color: cat === 'Frontend' || cat === 'Tools' ? 'var(--pink-500)' : 'var(--cyan-500)',
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
                // Fallback to plain variant
                const img = e.currentTarget;
                if (!img.src.includes('-plain')) {
                  img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}/${skill.icon}-plain.svg`;
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
