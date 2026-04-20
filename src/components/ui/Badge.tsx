interface BadgeProps {
  children: string;
  variant?: 'pink' | 'cyan' | 'success' | 'warning';
}

export default function Badge({ children, variant = 'pink' }: BadgeProps) {
  const colorMap = {
    pink: {
      bg: 'rgba(255,45,120,0.08)',
      border: 'rgba(255,45,120,0.25)',
      color: 'var(--pink-300)',
    },
    cyan: {
      bg: 'rgba(0,224,255,0.08)',
      border: 'rgba(0,224,255,0.25)',
      color: 'var(--cyan-300)',
    },
    success: {
      bg: 'rgba(0,224,150,0.08)',
      border: 'rgba(0,224,150,0.25)',
      color: 'var(--color-success)',
    },
    warning: {
      bg: 'rgba(255,184,0,0.08)',
      border: 'rgba(255,184,0,0.25)',
      color: 'var(--color-warning)',
    },
  };

  const c = colorMap[variant];

  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        fontWeight: 400,
        padding: '2px 8px',
        borderRadius: 'var(--radius-sm)',
        background: c.bg,
        border: `0.5px solid ${c.border}`,
        color: c.color,
        display: 'inline-block',
        lineHeight: '20px',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}
