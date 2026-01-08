import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants, type Transition } from 'framer-motion';
import styles from './SplashScreen.module.scss';

const pathVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 1.5,
        ease: [0.65, 0, 0.35, 1],
      },
      opacity: { duration: 0.3 },
    },
  },
};

const exitTransition: Transition = {
  duration: 0.6,
  ease: [0.65, 0, 0.35, 1],
};

const containerVariants: Variants = {
  exit: {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(10px)',
    transition: {
      ...exitTransition,
    },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.2 + i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
    }, 2000);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2800);

    return () => {
      clearTimeout(completeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.splash}
          variants={containerVariants}
          initial={{ opacity: 1 }}
          exit="exit"
        >
          <div className={styles.content}>
            <motion.div className={styles.logoWrapper}>
              <svg
                className={styles.logo}
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.circle
                  cx="60"
                  cy="60"
                  r="55"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  fill="none"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                />

                <motion.path
                  d="M50 45L35 60L50 75"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ transition: 'none' }}
                />

                <motion.path
                  d="M55 80L65 40"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                />

                <motion.path
                  d="M70 45L85 60L70 75"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                />

                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>

              <motion.div
                className={styles.glow}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </motion.div>

            <div className={styles.text}>
              {'Bryan'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className={styles.char}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: isComplete ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              Développeur Full Stack
            </motion.p>
          </div>

          <div className={styles.background}>
            <motion.div
              className={styles.circle1}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className={styles.circle2}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.05 }}
              transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

