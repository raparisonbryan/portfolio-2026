import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTheme, setTheme, type Theme } from '../../scripts/theme-init';
import styles from './ThemeToggle.module.scss';

const sunVariants = {
  initial: { scale: 0, rotate: -90, opacity: 0 },
  animate: { scale: 1, rotate: 0, opacity: 1 },
  exit: { scale: 0, rotate: 90, opacity: 0 },
};

const moonVariants = {
  initial: { scale: 0, rotate: 90, opacity: 0 },
  animate: { scale: 1, rotate: 0, opacity: 1 },
  exit: { scale: 0, rotate: -90, opacity: 0 },
};

const rayVariants = {
  initial: { scale: 0 },
  animate: (i: number) => ({
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.2 },
  }),
};

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setMounted(true);
    setThemeState(getTheme());
  }, []);

  const handleToggle = () => {
    setHasAnimated(true);
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setThemeState(newTheme);
  };

  if (!mounted) {
    return (
      <div className={styles.togglePlaceholder} aria-hidden>
        <span className={styles.placeholder} />
      </div>
    );
  }

  const isDark = theme === 'dark';
  const shouldAnimate = hasAnimated;

  return (
    <motion.button
      className={styles.toggle}
      onClick={handleToggle}
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.svg
            key="moon"
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            variants={moonVariants}
            initial={shouldAnimate ? 'initial' : 'animate'}
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <motion.path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              fill="currentColor"
            />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            variants={sunVariants}
            initial={shouldAnimate ? 'initial' : 'animate'}
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <motion.circle cx="12" cy="12" r="5" fill="currentColor" />
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const x1 = 12 + Math.cos(angle) * 7;
              const y1 = 12 + Math.sin(angle) * 7;
              const x2 = 12 + Math.cos(angle) * 9;
              const y2 = 12 + Math.sin(angle) * 9;
              return (
                <motion.line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={rayVariants}
                />
              );
            })}
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

