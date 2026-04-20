interface SectionLabelProps {
  number: string;
  label: string;
}

export default function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        marginBottom: 'var(--space-3)',
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.18em',
          color: 'var(--pink-500)',
          textTransform: 'uppercase',
        }}
      >
        {number}. {label}
      </span>
      <span
        style={{
          width: '20px',
          height: '2px',
          background: 'var(--pink-500)',
          display: 'block',
        }}
        aria-hidden="true"
      />
    </div>
  );
}
