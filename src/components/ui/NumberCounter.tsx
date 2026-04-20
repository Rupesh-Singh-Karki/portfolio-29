import { useEffect, useState, useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface NumberCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export default function NumberCounter({ target, suffix = '', duration = 1500 }: NumberCounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.5 });
  const hasAnimated = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    if (reducedMotion) {
      setCount(target);
      return;
    }

    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(step);
  }, [inView, target, duration, reducedMotion]);

  return (
    <span ref={ref as React.RefCallback<HTMLSpanElement>} aria-live="polite">
      {count}{suffix}
    </span>
  );
}
