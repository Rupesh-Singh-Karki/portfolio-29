import { useScrollProgress } from '../../hooks/useScrollProgress';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress * 100}%`,
        height: '2px',
        background: 'var(--grad-primary)',
        zIndex: 'var(--z-sticky)' as unknown as number,
        transition: 'width 50ms linear',
        pointerEvents: 'none',
      }}
    />
  );
}
