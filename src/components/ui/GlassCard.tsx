import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hoverGlow?: boolean;
}

export default function GlassCard({ children, className = '', style, hoverGlow = true }: GlassCardProps) {
  return (
    <div
      className={`glass-card ${hoverGlow ? 'glass-card-hover' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
