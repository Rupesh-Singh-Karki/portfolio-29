# Portfolio — Rupesh Singh Karki

A modern, high-performance developer portfolio built with React, TypeScript, Vite, and Framer Motion. Features a dark neon aesthetic with 3D particle effects, smooth animations, and a fully functional contact form.

## Tech Stack

- **React 19** + **TypeScript** — UI framework
- **Vite** — Build tool and dev server
- **Framer Motion** — Animations and page transitions
- **Three.js** — 3D particle effects in the hero section
- **Formspree** — Contact form submissions
- **ESLint** — Code linting

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm

### Installation

```bash
git clone https://github.com/Rupesh-Singh-Karki/portfolio-29.git
cd portfolio-29
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

You can get a free Formspree endpoint at [formspree.io](https://formspree.io).

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── animations/   # Animation wrappers (FadeInUp, etc.)
│   ├── layout/       # Navbar, Footer
│   ├── three/        # Three.js components (particles)
│   └── ui/           # Buttons, Badges, SectionLabel, etc.
├── data/             # Static data (projects, experience, skills, etc.)
├── hooks/            # Custom React hooks
├── sections/         # Page sections (Hero, About, Contact, etc.)
├── types/            # TypeScript type definitions
└── utils/            # Utility functions (Formspree helper)
```

## CI/CD

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs lint and build checks on every push and pull request to `main`.

## License

MIT
