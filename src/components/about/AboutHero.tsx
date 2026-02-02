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

interface AboutHeroProps {
  imageSrc: string;
}

export function AboutHero({ imageSrc }: AboutHeroProps) {
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
        <h2 className="about-subtitle">Développeur web (presque) adulte</h2>
      </motion.div>

      <motion.div className="about-stagger-text" variants={itemVariants}>
        <div className="about-paragraphs">
          <p>
            Bonjour, moi c'est Bryan ! Développeur Full Stack junior, je conçois des applications et 
            des sites web.
          </p>
          <p>
            Je recherche aujourd'hui un poste de développeur web, dans un environnement 
            stimulant et challengeant, où je pourrai continuer à apprendre, progresser et 
            m'investir sur des projets concrets.
          </p>
          <p>
            Je code depuis environ 5 ans et j'ai acquis 3 ans d'expérience en entreprise à 
            travers l'alternance. Cette période m'a appris à être autonome, persévérant et 
            résilient parce qu'en développement, il y a toujours des problèmes, et c'est 
            aussi ce qui rend le métier intéressant.
          </p>
          <p>
            J'avance avec une conviction simple : on progresse vraiment quand on aime ce qu'on fait, 
            et quand on prend le temps de bien le faire.
          </p>
        </div>
      </motion.div>

      <motion.div className="about-stagger-stats" variants={itemVariants}>
        <div className="about-stats">
          <div className="stat">
            <span className="stat-value">3 ans</span>
            <span className="stat-label">Expérience en entreprise</span>
          </div>
          <div className="stat">
            <span className="stat-value">5 ans</span>
            <span className="stat-label">Pratique du développement</span>
          </div>
          <div className="stat">
            <span className="stat-value">100%</span>
            <span className="stat-label">Motivation</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
