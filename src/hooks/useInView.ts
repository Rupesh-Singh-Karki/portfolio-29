import { useInView as useInViewLib } from 'react-intersection-observer';

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export function useInView(options: UseInViewOptions = {}) {
  return useInViewLib({
    threshold: options.threshold ?? 0.1,
    triggerOnce: options.triggerOnce ?? true,
    rootMargin: options.rootMargin ?? '0px 0px -80px 0px',
  });
}
