import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: -100, y: -100 });
  const outerPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for touch device
    const touchCheck = window.matchMedia('(pointer: coarse)');
    setIsTouch(touchCheck.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    touchCheck.addEventListener('change', handler);
    return () => touchCheck.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${e.clientX - 2.5}px, ${e.clientY - 2.5}px)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest('a, button, [role="button"], [tabindex]');
      setIsHovering(!!isLink);
    };

    const animate = () => {
      outerPos.current.x += (mousePos.current.x - outerPos.current.x) * 0.12;
      outerPos.current.y += (mousePos.current.y - outerPos.current.y) * 0.12;
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerPos.current.x - 20}px, ${outerPos.current.y - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch, reducedMotion]);

  if (isTouch || reducedMotion) return null;

  return (
    <>
      <div
        ref={outerRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '56px' : '40px',
          height: isHovering ? '56px' : '40px',
          borderRadius: '50%',
          border: `1.5px solid var(--pink-500)`,
          background: isHovering ? 'rgba(255,45,120,0.12)' : 'rgba(255,45,120,0.05)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.3s var(--ease-spring), height 0.3s var(--ease-spring), background 0.2s',
          willChange: 'transform',
        }}
      />
      <div
        ref={innerRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: 'var(--text-primary)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
    </>
  );
}
