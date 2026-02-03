import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import styles from './Header.module.scss';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Projets', href: '/projects' },
  { label: 'À propos', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const headerVariants = {
  visible: { y: 0 },
  hidden: { y: -100 },
};

export default function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > previous && latest > 150) {
      setIsHidden(true);
      setIsMobileMenuOpen(false);
    } else {
      setIsHidden(false);
    }

    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
        variants={headerVariants}
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
      >
        <nav className={styles.nav}>
          <motion.a
            href="/"
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.logoText}>
              <span className={styles.logoAccent}>{'<'}</span>
              Bryan
              <span className={styles.logoAccent}>{'/>'}</span>
            </span>
          </motion.a>

          <ul className={styles.navLinks}>
            {navLinks.map((link, index) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>

          <div className={styles.actions}>
            <ThemeToggle />
            
            <button
              className={styles.menuButton}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`${styles.menuIcon} ${isMobileMenuOpen ? styles.open : ''}`}>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <motion.div
        className={styles.mobileMenu}
        initial={false}
        animate={isMobileMenuOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, pointerEvents: 'auto' as const },
          closed: { opacity: 0, pointerEvents: 'none' as const },
        }}
        transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
      >
        <ul className={styles.mobileNavLinks}>
          {navLinks.map((link, index) => (
            <motion.li
              key={link.href}
              variants={{
                open: { opacity: 1, x: 0, transition: { delay: index * 0.1 } },
                closed: { opacity: 0, x: -20 },
              }}
            >
              <a
                href={link.href}
                className={styles.mobileNavLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </>
  );
}

