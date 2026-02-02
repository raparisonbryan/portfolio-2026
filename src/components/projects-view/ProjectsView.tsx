import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard, { type Project } from '@components/project-card/ProjectCard';
import ProjectDetail from '@components/project-detail/ProjectDetail';
import styles from './ProjectsView.module.scss';

interface ProjectsViewProps {
  projects: Project[];
  initialProjectId?: string | null;
}

export default function ProjectsView({ projects, initialProjectId = null }: ProjectsViewProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Lire l'ID projet depuis l'URL au montage (navigation depuis l'accueil)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idFromUrl = params.get('project');
    const idFromProp = initialProjectId ?? idFromUrl;
    if (idFromProp && projects.some((p) => p.id === idFromProp)) {
      setSelectedProjectId(idFromProp);
    }
  }, [projects, initialProjectId]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const selectedProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId)
    : null;

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const handleClose = () => {
    setSelectedProjectId(null);
  };

  if (isMobile) {
    return (
      <>
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => handleProjectClick(project.id)}
              isSelected={project.id === selectedProjectId}
              isListMode={false}
            />
          ))}
        </div>
        <AnimatePresence>
          {selectedProject && (
            <>
              <motion.div
                className={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
              />
              <ProjectDetail
                project={selectedProject}
                onClose={handleClose}
                isMobile={true}
              />
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.projectsList}>
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => handleProjectClick(project.id)}
              isSelected={project.id === selectedProjectId}
              isListMode={true}
            />
          ))}
        </div>
      </div>

      <div className={styles.detailPanel}>
        {selectedProject ? (
          <ProjectDetail
            project={selectedProject}
            onClose={handleClose}
            isMobile={false}
          />
        ) : (
          <div className={styles.emptyContent}>
            <p>Sélectionnez un projet pour voir les détails</p>
          </div>
        )}
      </div>
    </div>
  );
}
