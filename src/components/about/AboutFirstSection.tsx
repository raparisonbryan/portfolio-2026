import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface AboutFirstSectionProps {
  imageSrc: string;
}

export function AboutFirstSection({ imageSrc }: AboutFirstSectionProps) {
  return (
    <motion.div
      className="about-first-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <motion.div className="about-stagger-header" variants={itemVariants}>
        <header className="page-header">
          <span className="page-label">À propos</span>
          <h1 className="page-title">Qui suis-je ?</h1>
        </header>
      </motion.div>

      <motion.div className="about-stagger-image" variants={itemVariants}>
        <div className="about-image">
          <img src={imageSrc} alt="Bryan" />
        </div>
      </motion.div>

      <motion.div className="about-stagger-subtitle" variants={itemVariants}>
        <h2 className="about-subtitle">Développeur passionné par le web</h2>
      </motion.div>

      <motion.div className="about-stagger-text" variants={itemVariants}>
        <div className="about-paragraphs">
          <p>
            Bonjour ! Je suis Bryan, développeur Full Stack basé en France.
            Depuis plus de 5 ans, je conçois et développe des applications web
            modernes, en mettant l'accent sur l'expérience utilisateur et la
            qualité du code.
          </p>
          <p>
            Mon parcours m'a permis de travailler sur des projets variés : des
            startups innovantes aux grandes entreprises, en passant par des
            projets personnels ambitieux. Cette diversité m'a appris à m'adapter
            rapidement et à trouver les solutions les plus adaptées à chaque
            contexte.
          </p>
          <p>
            Quand je ne code pas, vous me trouverez probablement en train
            d'explorer les dernières technologies, de contribuer à des projets
            open source, ou de partager mes connaissances à travers des articles
            techniques.
          </p>
        </div>
      </motion.div>

      <motion.div className="about-stagger-stats" variants={itemVariants}>
        <div className="about-stats">
          <div className="stat">
            <span className="stat-value">5+</span>
            <span className="stat-label">Années d'expérience</span>
          </div>
          <div className="stat">
            <span className="stat-value">50+</span>
            <span className="stat-label">Projets réalisés</span>
          </div>
          <div className="stat">
            <span className="stat-value">20+</span>
            <span className="stat-label">Clients satisfaits</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
