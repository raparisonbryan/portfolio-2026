import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
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

const timelineItems = [
  {
    date: '2023 - Présent',
    title: 'Développeur Full Stack Senior',
    company: 'Entreprise Tech',
    description:
      "Lead technique sur des projets React/Node.js. Mise en place d'architectures scalables et mentorat de développeurs juniors.",
  },
  {
    date: '2021 - 2023',
    title: 'Développeur Front-end',
    company: 'Startup Innovation',
    description:
      "Développement d'interfaces utilisateur complexes avec React et TypeScript. Optimisation des performances et mise en place de tests automatisés.",
  },
  {
    date: '2019 - 2021',
    title: 'Développeur Web Junior',
    company: 'Agence Digitale',
    description:
      "Création de sites web et d'applications pour divers clients. Apprentissage des bonnes pratiques et méthodologies agiles.",
  },
];

export function AboutTimeline() {
  return (
    <motion.div
      className="timeline"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {timelineItems.map((item) => (
        <motion.div key={item.date} className="timeline-item" variants={itemVariants}>
          <div className="timeline-marker" />
          <div className="timeline-content">
            <span className="timeline-date">{item.date}</span>
            <h3 className="timeline-title">{item.title}</h3>
            <p className="timeline-company">{item.company}</p>
            <p className="timeline-description">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
