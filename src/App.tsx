import { lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/layout/CustomCursor';

// ── Lazy-loaded sections for code splitting ──
const Hero = lazy(() => import('./sections/Hero'));
const About = lazy(() => import('./sections/About'));
const WorkExperience = lazy(() => import('./sections/WorkExperience'));
const Projects = lazy(() => import('./sections/Projects'));
const Skills = lazy(() => import('./sections/Skills'));
const Certifications = lazy(() => import('./sections/Certifications'));
const Publications = lazy(() => import('./sections/Publications'));
const Contact = lazy(() => import('./sections/Contact'));

// Section divider
function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: 'var(--space-4) 0',
      }}
    >
      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--pink-500)', opacity: 0.5 }} />
      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--bg-elevated)' }} />
      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--pink-500)', opacity: 0.5 }} />
    </div>
  );
}

// Loading fallback
function SectionLoader() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: '2px solid var(--border-subtle)',
          borderTopColor: 'var(--pink-500)',
          animation: 'spin 0.8s linear infinite',
        }}
      />
    </div>
  );
}

function App() {
  return (
    <>
      {/* Skip to content */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <CustomCursor />
      <Navbar />

      <main id="main-content">
        <Suspense fallback={<SectionLoader />}>
          <Hero />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionLoader />}>
          <WorkExperience />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionLoader />}>
          <Certifications />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionLoader />}>
          <Publications />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

export default App;
