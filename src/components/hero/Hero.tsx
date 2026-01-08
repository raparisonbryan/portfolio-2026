import { motion } from 'framer-motion';
import * as HoverCard from '@radix-ui/react-hover-card';
import Button from '@components/button/Button';
import styles from './Hero.module.scss';
import { BackpackIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons';
import AppWebIcon from '@assets/icons/app-web.svg?raw';
import SiteVitrineIcon from '@assets/icons/site-vitrine.svg?raw';
import OutilMetierIcon from '@assets/icons/outil-metier.svg?raw';
import IntegrationIcon from '@assets/icons/integration.svg?raw';

const expertises = [
  {
    name: 'Applications web',
    description:
      "Développement d’applications web complètes, avec gestion des utilisateurs, base de données et logique métier.",
    icon: AppWebIcon,
  },
  {
    name: 'Sites vitrines',
    description:
      "Création de sites web modernes et performants pour présenter une activité de manière claire et efficace.",
    icon: SiteVitrineIcon,
  },
  {
    name: 'Outils métiers',
    description:
      "Conception d’outils sur mesure pour simplifier, automatiser et optimiser les processus internes.",
    icon: OutilMetierIcon,
  },
  {
    name: 'Intégration',
    description:
      "Utilisation de CMS (WordPress, Webflow, Framer) permettant au client de gérer facilement son contenu.",
    icon: IntegrationIcon,
  },  
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

interface HeroProps {
  name?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function Hero({
  name = 'Bryan',
  title = 'Développeur Full Stack',
  subtitle = 'Salut, je suis',
  description = "Diplômé en informatique après 5 ans d'études, je conçois et développe des applications et des sites web modernes, en alliant code propre, performance et expérience utilisateur.",
}: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.grid} />
      </div>

      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span className={styles.badge} variants={itemVariants}>
          <span className={styles.dot} />
          Disponible pour de nouveaux projets
        </motion.span>

        <motion.p className={styles.subtitle} variants={itemVariants}>
          {subtitle}
        </motion.p>

        <motion.h1 className={styles.title} variants={itemVariants}>
          <span className={styles.name}>{name}</span>
          <span className={styles.role}>{title}</span>
        </motion.h1>

        <motion.p className={styles.description} variants={itemVariants}>
          {description}
        </motion.p>

        <motion.div className={styles.cta} variants={itemVariants}>
          <div className={styles.ctaButtons}>
            <Button
              variant="primary"
              onClick={() => window.location.href = '/projects'}
              title="Voir mes projets"
            >
              <BackpackIcon />
            </Button>
            <Button
              variant="secondary"
              onClick={() => window.location.href = '/contact'}
              title="Me contacter"
            >
              <EnvelopeClosedIcon />
            </Button>
          </div>
        </motion.div>

        <motion.div className={styles.stack} variants={itemVariants}>
          <span className={styles.stackLabel}>Expertises</span>
          <div className={styles.stackTags}>
            {expertises.map((expertise, i) => (
              <HoverCard.Root key={expertise.name} openDelay={200} closeDelay={100}>
                <HoverCard.Trigger asChild>
                  <motion.span
                    className={styles.stackItem}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                  >
                    {expertise.name}
                  </motion.span>
                </HoverCard.Trigger>
                <HoverCard.Portal>
                  <HoverCard.Content className={styles.hoverContent} sideOffset={8}>
                    <div className={styles.hoverIcon} dangerouslySetInnerHTML={{ __html: expertise.icon }} />
                    <p className={styles.hoverText}>{expertise.description}</p>
                  </HoverCard.Content>
                </HoverCard.Portal>
              </HoverCard.Root>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
