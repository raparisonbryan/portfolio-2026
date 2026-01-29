import { motion } from 'framer-motion';
import { ArrowTopRightIcon, Cross2Icon, ExternalLinkIcon } from '@radix-ui/react-icons';
import type { Project } from '@components/project-card/ProjectCard';
import styles from './ProjectDetail.module.scss';
import Button from '@components/button/Button';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  isMobile: boolean;
}

export default function ProjectDetail({
  project,
  onClose,
  isMobile,
}: ProjectDetailProps) {
  return (
    <motion.div
      className={`${styles.detail} ${isMobile ? styles.mobile : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className={styles.closeButton} onClick={onClose} aria-label="Fermer">
        <Cross2Icon />
      </button>

      {project.image && (
        <div className={styles.imageWrapper}>
          <img
            src={typeof project.image === 'string' ? project.image : project.image.src}
            alt={`Screenshot de ${project.title}`}
            className={styles.image}
          />
        </div>
      )}

      <div className={styles.content}>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.description}>{project.description}</p>

        {project.context && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Contexte</h2>
            <p className={styles.sectionText}>{project.context}</p>
          </div>
        )}

        {project.challenges && project.challenges.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Défis techniques</h2>
            <ul className={styles.list}>
              {project.challenges.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
          </div>
        )}

        {project.image2 && (
          <div className={styles.imageWrapper}>
            <img
              src={typeof project.image2 === 'string' ? project.image2 : project.image2.src}
              alt={`Screenshot de ${project.title}`}
              className={styles.image}
            />
          </div>
        )}

        {project.image3 && (
          <div className={styles.imageWrapper}>
            <img
              src={typeof project.image3 === 'string' ? project.image3 : project.image3.src}
              alt={`Screenshot de ${project.title}`}
              className={styles.image}
            />
          </div>
        )}

        {project.result && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Résultats</h2>
            <p className={styles.sectionText}>{project.result}</p>
          </div>
        )}

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Technologies utilisées</h2>
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.links}>
          {project.liveUrl && !project.isPrivate && (
            <Button title="Voir le site" onClick={() => window.open(project.liveUrl, '_blank')}>
              <ExternalLinkIcon />
            </Button>
          )}
          {project.githubUrl && !project.isPrivate && (
            <Button title="Voir le code source" variant="secondary" onClick={() => window.open(project.githubUrl, '_blank')}>
              <ArrowTopRightIcon />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
