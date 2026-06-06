import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}

export default function StaggerChildren({
  children,
  staggerDelay = 0.04,
  className = '',
  once = true,
}: StaggerChildrenProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '0px 0px -60px 0px' }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const staggerItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
