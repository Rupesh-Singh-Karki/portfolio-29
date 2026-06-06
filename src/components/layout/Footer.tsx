import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterXIcon } from '../ui/SocialIcons';

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/Rupesh-Singh-Karki', label: 'Visit GitHub profile' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/rupesh-singh-karki-552226363/', label: 'Visit LinkedIn profile' },
  { icon: TwitterXIcon, href: 'https://x.com/rupesh_singh_k', label: 'Visit X profile' },
  { icon: Mail, href: 'mailto:karkisinghrupesh@gmail.com', label: 'Send an email' },
];

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Publications', href: '#publications' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        borderTop: '0.5px solid var(--border-subtle)',
        padding: 'var(--space-16) 0 var(--space-8)',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 'clamp(6rem, 14vw, 12rem)',
          color: 'var(--pink-500)',
          opacity: 0.02,
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        PORTFOLIO
      </div>

      <div className="section-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-8)',
            marginBottom: 'var(--space-12)',
          }}
          className="footer-grid"
        >
          {/* Left – Brand */}
          <div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 'var(--text-xl)',
                marginBottom: 'var(--space-3)',
              }}
              className="gradient-text-pink"
            >
              RSK
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 'var(--text-sm)',
                color: 'var(--text-tertiary)',
                lineHeight: 1.7,
                maxWidth: '280px',
              }}
            >
              Building extraordinary digital experiences from India. Turning
              caffeine into code, one commit at a time.
            </p>
          </div>

          {/* Center – Nav */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <nav aria-label="Footer navigation" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    color: 'var(--text-tertiary)',
                    textDecoration: 'none',
                    transition: 'color var(--dur-fast) ease',
                    minHeight: '32px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  className="footer-link"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right – Socials */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--radius-md)',
                    border: '0.5px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'all var(--dur-fast) ease',
                  }}
                  className="footer-social"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '0.5px solid var(--border-subtle)',
            paddingTop: 'var(--space-6)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: 'var(--text-sm)',
              color: 'var(--text-tertiary)',
            }}
          >
            &copy; 2025 Rupesh Singh Karki. Crafted with obsession.
          </p>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
              display: 'flex',
              gap: 'var(--space-2)',
              alignItems: 'center',
            }}
          >
            <span>React</span>
            <span style={{ color: 'var(--pink-500)' }}>·</span>
            <span>Three.js</span>
            <span style={{ color: 'var(--pink-500)' }}>·</span>
            <span>Framer Motion</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: var(--text-primary) !important; }
        .footer-social:hover {
          border-color: var(--border-medium) !important;
          box-shadow: var(--pink-glow-sm);
          color: var(--text-primary) !important;
        }
        @media (max-width: 767px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .footer-grid > div { align-items: center !important; }
          .footer-grid > div:last-child { align-items: center !important; }
        }
      `}</style>
    </footer>
  );
}
