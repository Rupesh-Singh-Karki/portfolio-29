import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, children, className = '', disabled, ...props }, ref) => {
    const isDisabled = disabled || loading;

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-2)',
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 500,
      fontSize: size === 'sm' ? 'var(--text-sm)' : 'var(--text-base)',
      borderRadius: 'var(--radius-pill)',
      minHeight: size === 'sm' ? '36px' : '44px',
      minWidth: '44px',
      padding: size === 'sm' ? 'var(--space-2) var(--space-4)' : 'var(--space-3) var(--space-8)',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.42 : 1,
      pointerEvents: isDisabled ? 'none' as const : 'auto' as const,
      transition: 'all var(--dur-fast) var(--ease-out-expo)',
      border: 'none',
      textDecoration: 'none',
      letterSpacing: '0.02em',
    };

    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        background: 'var(--grad-primary)',
        color: 'var(--text-on-pink)',
        border: 'none',
      },
      secondary: {
        background: 'transparent',
        border: '1.5px solid var(--cyan-500)',
        color: 'var(--cyan-500)',
      },
      ghost: {
        background: 'transparent',
        border: '1px solid var(--border-medium)',
        color: 'var(--text-secondary)',
      },
    };

    return (
      <button
        ref={ref}
        style={{ ...baseStyles, ...variantStyles[variant] }}
        className={`btn btn-${variant} ${className}`}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ animation: 'spin 1s linear infinite' }}
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="28" strokeDashoffset="8" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
