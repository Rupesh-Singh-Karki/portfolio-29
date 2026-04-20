import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { GithubIcon } from '../../components/ui/SocialIcons';
import SectionLabel from '../../components/ui/SectionLabel';
import SectionHeading from '../../components/ui/SectionHeading';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import FadeInUp from '../../components/animations/FadeInUp';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { projects } from '../../data/projects';
import type { Project } from '../../types';

const categories = ['All', 'Full-Stack', 'Frontend', 'Backend', 'AI/ML', 'Open Source'] as const;

export default function Projects() {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const reducedMotion = useReducedMotion();

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter((p) => p.category.includes(filter as Project['category'][number]));

  const openModal = useCallback((project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  }, []);

  // Close on Escape
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
  }, [closeModal]);

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        padding: 'var(--space-24) 0',
        overflow: 'hidden',
      }}
    >
      <div className="section-ordinal" aria-hidden="true" style={{ top: 'var(--space-8)', right: 'var(--space-8)' }}>
        04
      </div>

      <div className="section-container">
        <FadeInUp>
          <SectionLabel number="04" label="PROJECTS" />
          <SectionHeading>Things I've built.</SectionHeading>
        </FadeInUp>

        {/* Filter chips */}
        <FadeInUp delay={100}>
          <div
            role="tablist"
            aria-label="Filter projects by technology"
            style={{
              display: 'flex',
              gap: 'var(--space-2)',
              flexWrap: 'wrap',
              marginBottom: 'var(--space-8)',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={filter === cat}
                onClick={() => setFilter(cat)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 'var(--text-sm)',
                  padding: 'var(--space-2) var(--space-5)',
                  borderRadius: 'var(--radius-pill)',
                  minHeight: '44px',
                  minWidth: '44px',
                  cursor: 'pointer',
                  transition: 'all var(--dur-fast) var(--ease-out-expo)',
                  background: filter === cat ? 'var(--grad-primary)' : 'transparent',
                  color: filter === cat ? 'var(--text-on-pink)' : 'var(--text-secondary)',
                  border: filter === cat ? 'none' : '1px solid var(--border-medium)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeInUp>

        {/* Project grid */}
        <motion.div
          layout={!reducedMotion}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 'var(--space-4)',
          }}
          className="projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout={!reducedMotion}
                initial={reducedMotion ? {} : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reducedMotion ? {} : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} onOpen={openModal} reducedMotion={reducedMotion} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={closeModal}
            onKeyDown={handleKeyDown}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 767px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ── Project Card ─────────────────────────────────────────────── */

function ProjectCard({
  project,
  onOpen,
  reducedMotion,
}: {
  project: Project;
  onOpen: (p: Project) => void;
  reducedMotion: boolean;
}) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -5;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 5;
    e.currentTarget.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
    e.currentTarget.style.transition = 'transform 0ms';

    const glare = e.currentTarget.querySelector('.card-glare') as HTMLElement;
    if (glare) {
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,45,120,0.12) 0%, transparent 65%)`;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    e.currentTarget.style.transition = 'transform 600ms cubic-bezier(0.34,1.56,0.64,1)';
    const glare = e.currentTarget.querySelector('.card-glare') as HTMLElement;
    if (glare) glare.style.background = 'transparent';
  };

  return (
    <div
      className="glass-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(project); } }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.name}`}
      style={{
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative',
        willChange: 'transform',
      }}
    >
      {/* Glare overlay */}
      <div
        className="card-glare"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          transition: 'background 150ms ease',
          zIndex: 2,
        }}
      />

      {/* Thumbnail area */}
      <div
        style={{
          width: '100%',
          height: '200px',
          background: `linear-gradient(135deg, var(--bg-surface), var(--bg-elevated))`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Project initial as placeholder */}
        <span
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'var(--text-6xl)',
            color: 'var(--pink-500)',
            opacity: 0.1,
          }}
          aria-hidden="true"
        >
          {project.name.charAt(0)}
        </span>

        {/* Status badge */}
        <div
          style={{
            position: 'absolute',
            top: 'var(--space-3)',
            right: 'var(--space-3)',
          }}
        >
          <Badge variant={project.status === 'Live' ? 'success' : project.status === 'In Progress' ? 'warning' : 'pink'}>
            {project.status}
          </Badge>
        </div>

        {project.featured && (
          <div
            style={{
              position: 'absolute',
              top: 'var(--space-3)',
              left: 'var(--space-3)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: 'var(--pink-500)',
              background: 'rgba(255,45,120,0.1)',
              padding: '2px 6px',
              borderRadius: 'var(--radius-sm)',
              border: '0.5px solid rgba(255,45,120,0.3)',
            }}
          >
            FEATURED
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: 'var(--space-5)' }}>
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            fontSize: 'var(--text-lg)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-2)',
          }}
        >
          {project.name}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: 'var(--space-4)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.tagline}
        </p>

        {/* Tech badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)', marginBottom: 'var(--space-4)' }}>
          {project.techStack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="cyan">{tech}</Badge>
          ))}
          {project.techStack.length > 4 && (
            <Badge variant="pink">{`+${project.techStack.length - 4}`}</Badge>
          )}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} GitHub repository`}
            onClick={(e) => e.stopPropagation()}
            style={{
              color: 'var(--text-secondary)',
              minHeight: '44px',
              minWidth: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color var(--dur-fast) ease',
            }}
          >
            <GithubIcon size={16} aria-hidden="true" />
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} live demo`}
              onClick={(e) => e.stopPropagation()}
              style={{
                color: 'var(--pink-500)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                minHeight: '44px',
                transition: 'color var(--dur-fast) ease',
              }}
            >
              Live Demo <ExternalLink size={12} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Project Modal ────────────────────────────────────────────── */

function ProjectModal({
  project,
  onClose,
  onKeyDown,
  reducedMotion,
}: {
  project: Project;
  onClose: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onKeyDown={onKeyDown}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 80,
        background: 'rgba(8,6,13,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={reducedMotion ? {} : { scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={reducedMotion ? {} : { scale: 0.9, y: 40 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'var(--bg-elevated)',
          border: '0.5px solid var(--border-medium)',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '720px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 'var(--space-8)',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close project details"
          style={{
            position: 'absolute',
            top: 'var(--space-4)',
            right: 'var(--space-4)',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            minHeight: '44px',
            minWidth: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={20} aria-hidden="true" />
        </button>

        {/* Status */}
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <Badge variant={project.status === 'Live' ? 'success' : 'warning'}>{project.status}</Badge>
        </div>

        <h2
          id="project-modal-title"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 'var(--text-3xl)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-3)',
          }}
        >
          {project.name}
        </h2>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'var(--text-base)',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            marginBottom: 'var(--space-6)',
          }}
        >
          {project.description}
        </p>

        {/* Features */}
        {project.features.length > 0 && (
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                fontSize: 'var(--text-lg)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-3)',
              }}
            >
              Key Features
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {project.features.map((feature, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    gap: 'var(--space-2)',
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: 'var(--cyan-500)', flexShrink: 0 }}>&#x2022;</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech stack */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              fontSize: 'var(--text-lg)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-3)',
            }}
          >
            Tech Stack
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="cyan">{tech}</Badge>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Button variant="primary">
                <ExternalLink size={14} aria-hidden="true" /> Live Demo
              </Button>
            </a>
          )}
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Button variant="ghost">
              <GithubIcon size={14} aria-hidden="true" /> View Source
            </Button>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
