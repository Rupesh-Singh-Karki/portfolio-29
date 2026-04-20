import type { ReactNode } from 'react';

interface SectionHeadingProps {
  children: ReactNode;
  as?: 'h2' | 'h3';
}

export default function SectionHeading({ children, as: Tag = 'h2' }: SectionHeadingProps) {
  return (
    <Tag
      style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: Tag === 'h2' ? 'var(--text-4xl)' : 'var(--text-3xl)',
        color: 'var(--text-primary)',
        lineHeight: 1.15,
        textAlign: 'left',
        marginBottom: 'var(--space-8)',
      }}
    >
      {children}
    </Tag>
  );
}
