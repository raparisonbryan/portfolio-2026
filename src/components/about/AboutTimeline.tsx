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
    date: '2023 - 2026',
    type: 'experience' as const,
    title: 'Développeur web - Alternance et CDD',
    company: 'We Made Ya',
    description:
      "Développement de sites web et d'applications pour des projets clients. Participation au développement d'un intranet et mise en place de pipelines CI/CD."
  },
  {
    date: '2023 - 2025',
    type: 'formation' as const,
    title: 'Mastère Expert en Développement Web',
    company: 'Lyon Ynov Campus',
  },
  {
    date: '2022 - 2023',
    type: 'formation' as const,
    title: 'Bachelor Informatique',
    company: 'Lyon Ynov Campus',
  },
  {
    date: '2022',
    type: 'experience' as const,
    title: "Stage de fin d'études - Développement web",
    company: 'CNRS / LTDS',
    description:
      "Création d'un site web en React pour un laboratoire de recherche. Travail en binôme avec organisation de projet. Intégration de contenus techniques (Python, LaTeX)."
  },
  {
    date: '2020 - 2022',
    type: 'formation' as const,
    title: 'DUT Informatique',
    company: 'IUT Lyon 1',
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
        <motion.div key={`${item.date}-${item.title}`} className="timeline-item" variants={itemVariants}>
          <div className="timeline-marker" />
          <div className="timeline-content">
            <div className="timeline-date-row">
              <span className="timeline-date">{item.date}</span>
              <span className={`timeline-badge timeline-badge--${item.type}`}>
                {item.type === 'formation' ? 'Formation' : 'Expérience'}
              </span>
            </div>
            <h3 className="timeline-title">{item.title}</h3>
            <p className="timeline-company">{item.company}</p>
            {item.description && <p className="timeline-description">{item.description}</p>}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
