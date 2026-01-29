import { motion, type Variants } from 'framer-motion';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fadeInUp' | 'fadeInScale' | 'stagger';
}

export function AnimatedSection({
  children,
  className = '',
  variant = 'fadeInUp',
}: AnimatedSectionProps) {
  const variants =
    variant === 'fadeInScale'
      ? fadeInScale
      : variant === 'stagger'
      ? staggerContainer
      : fadeInUp;

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedStaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedStaggerItem({
  children,
  className = '',
}: AnimatedStaggerItemProps) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
