import { motion } from 'framer-motion';
import styles from './Skills.module.scss';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  { name: 'React / Next.js', level: 95, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Frontend' },
  { name: 'CSS / SCSS', level: 92, category: 'Frontend' },
  { name: 'Vue.js', level: 75, category: 'Frontend' },
  { name: 'Astro', level: 85, category: 'Frontend' },
  { name: 'Node.js', level: 88, category: 'Backend' },
  { name: 'Express', level: 85, category: 'Backend' },
  { name: 'PostgreSQL', level: 78, category: 'Backend' },
  { name: 'MongoDB', level: 80, category: 'Backend' },
  { name: 'Git', level: 90, category: 'Outils' },
  { name: 'Docker', level: 70, category: 'Outils' },
  { name: 'Figma', level: 82, category: 'Outils' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Skills() {
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.label}>Compétences</span>
          <h2 className={styles.title}>Ma stack technique</h2>
          <p className={styles.description}>
            Technologies et outils que j'utilise au quotidien pour créer des
            applications web modernes et performantes.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {categories.map((category) => (
            <motion.div
              key={category}
              className={styles.category}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <h3 className={styles.categoryTitle}>{category}</h3>
              <div className={styles.skillsList}>
                {skills
                  .filter((s) => s.category === category)
                  .map((skill) => (
                    <motion.div
                      key={skill.name}
                      className={styles.skill}
                      variants={itemVariants}
                    >
                      <div className={styles.skillHeader}>
                        <span className={styles.skillName}>{skill.name}</span>
                        <span className={styles.skillLevel}>{skill.level}%</span>
                      </div>
                      <div className={styles.progressBar}>
                        <motion.div
                          className={styles.progressFill}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

