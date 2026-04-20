import { ExternalLink, Award } from 'lucide-react';
import SectionLabel from '../../components/ui/SectionLabel';
import SectionHeading from '../../components/ui/SectionHeading';
import FadeInUp from '../../components/animations/FadeInUp';
import { certifications } from '../../data/certifications';

export default function Certifications() {
  return (
    <section
      id="certifications"
      style={{
        position: 'relative',
        padding: 'var(--space-24) 0',
        overflow: 'hidden',
      }}
    >
      <div className="section-ordinal" aria-hidden="true" style={{ top: 'var(--space-8)', right: 'var(--space-8)' }}>
        06
      </div>

      <div className="section-container">
        <FadeInUp>
          <SectionLabel number="06" label="CERTIFICATIONS" />
          <SectionHeading>Proof of mastery.</SectionHeading>
        </FadeInUp>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-4)',
          }}
          className="cert-grid"
        >
          {certifications.map((cert, index) => (
            <FadeInUp key={cert.id} delay={index * 80}>
              <div
                className="cert-card"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'var(--bg-glass)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: 'var(--radius-lg)',
                  border: '0.5px solid var(--border-subtle)',
                  borderTop: `3px solid ${cert.issuerColor}`,
                  padding: 'var(--space-6)',
                  transition: 'all var(--dur-base) var(--ease-out-expo)',
                }}
              >
                {/* Shimmer overlay */}
                <div
                  className="cert-shimmer"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(108deg, transparent 35%, rgba(255,255,255,0.035) 45%, rgba(255,255,255,0.060) 50%, rgba(255,255,255,0.035) 55%, transparent 65%)',
                    backgroundSize: '200% 100%',
                    animation: 'certShimmer 4s infinite linear',
                    pointerEvents: 'none',
                  }}
                />

                {/* Premium star */}
                {cert.premium && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'var(--space-3)',
                      right: 'var(--space-3)',
                      color: 'var(--color-warning)',
                    }}
                    aria-label="Premium certification"
                  >
                    <Award size={18} aria-hidden="true" />
                  </div>
                )}

                {/* Issuer logo */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--bg-elevated)',
                    border: '0.5px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 'var(--space-4)',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={cert.issuerLogo}
                    alt=""
                    width={28}
                    height={28}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 600,
                    fontSize: 'var(--text-base)',
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--space-2)',
                    lineHeight: 1.4,
                  }}
                >
                  {cert.name}
                </h3>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    marginBottom: 'var(--space-1)',
                  }}
                >
                  {cert.issuer}
                </p>

                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-tertiary)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {cert.issueDate}
                </p>

                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verify ${cert.name} credential`}
                  className="cert-verify"
                  style={{
                    color: 'var(--cyan-500)',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 'var(--text-sm)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--space-1)',
                    minHeight: '44px',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                    transition: 'color var(--dur-fast) ease',
                  }}
                >
                  Verify Credential <ExternalLink size={12} aria-hidden="true" />
                </a>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes certShimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .cert-card:hover {
          box-shadow: 0 0 30px rgba(var(--cert-glow, 255,45,120), 0.15), var(--shadow-card);
          transform: translateY(-2px);
        }
        .cert-card:hover .cert-shimmer {
          animation-duration: 0.7s;
        }
        .cert-verify:hover {
          color: var(--cyan-300) !important;
        }
        .cert-verify:focus-visible {
          outline: none;
          box-shadow: var(--focus-ring-cyan);
          border-radius: var(--radius-sm);
        }
        @media (prefers-reduced-motion: reduce) {
          .cert-shimmer { animation: none !important; }
        }
        @media (max-width: 1023px) {
          .cert-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 639px) {
          .cert-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
