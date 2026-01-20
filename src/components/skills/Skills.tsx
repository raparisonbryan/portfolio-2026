import { motion, type Variants } from 'framer-motion';
import NextLogo from '@assets/logos/next_logo.svg';
import ViteLogo from '@assets/logos/vite_logo.svg';
import AstroLogo from '@assets/logos/astro_logo.svg';
import SassLogo from '@assets/logos/sass_logo.svg';
import TailwindLogo from '@assets/logos/tailwind_logo.svg';
import NodeLogo from '@assets/logos/node_logo.svg';
import ExpressLogo from '@assets/logos/express_logo.svg';
import WebsocketLogo from '@assets/logos/websocket_logo.svg';
import MongoLogo from '@assets/logos/mongodb_logo.svg';
import PrismaLogo from '@assets/logos/prisma_logo.svg';
import GraphqlLogo from '@assets/logos/graphql_logo.svg';
import PostgresLogo from '@assets/logos/postgre_logo.svg';
import FigmaLogo from '@assets/logos/figma_logo.svg';
import RadixLogo from '@assets/logos/radix_ui_logo.svg';
import WebflowLogo from '@assets/logos/webflow_logo.svg';
import FramerLogo from '@assets/logos/framer_logo.svg';
import WordpressLogo from '@assets/logos/wordpress_logo.svg';
import GithubLogo from '@assets/logos/github_logo.svg';
import DockerLogo from '@assets/logos/docker_logo.svg';
import DigitalOceanLogo from '@assets/logos/digital_ocean_logo.svg';
import VercelLogo from '@assets/logos/vercel_logo.svg';
import AwsLogo from '@assets/logos/aws_logo.svg';
import GoogleLogo from '@assets/logos/google_logo.svg';
import styles from './Skills.module.scss';

interface SkillCategory {
  name: string;
  technologies: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    technologies: [
      'Next.js',
      'Vite.js',
      'Astro',
      'SCSS',
      'Tailwind CSS',
    ],
  },
  {
    name: 'Backend',
    technologies: [
      'Node.js',
      'Express',
      'WebSocket',
    ],
  },
  {
    name: 'Base de données',
    technologies: [
      'MongoDB',
      'Prisma',
      'GraphQL',
      'PostgreSQL',
    ],
  },
  {
    name: 'UX/UI & Intégration',
    technologies: [
      'Figma',
      'Radix UI',
      'Webflow',
      'Framer',
      'WordPress',
    ],
  },
  {
    name: 'CI/CD & DevOps',
    technologies: [
      'GitHub',
      'Docker',
      'Digital Ocean',
      'Vercel',
      'AWS',
      'Google API',
    ],
  },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const categoryVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function Skills() {
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
          {skillCategories.map((category) => (
            <motion.div
              key={category.name}
              className={styles.category}
              variants={categoryVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <h3 className={styles.categoryTitle}>{category.name}</h3>
              <div className={styles.technologiesList}>
                {category.technologies.map((tech) => {
                  const logo =
                    tech === 'Next.js'
                      ? { src: NextLogo, alt: 'Next.js' }
                      : tech === 'Vite.js'
                      ? { src: ViteLogo, alt: 'Vite.js' }
                      : tech === 'Astro'
                      ? { src: AstroLogo, alt: 'Astro' }
                      : tech === 'SCSS'
                      ? { src: SassLogo, alt: 'SCSS' }
                      : tech === 'Tailwind CSS'
                      ? { src: TailwindLogo, alt: 'Tailwind CSS' }
                      : tech === 'Node.js'
                      ? { src: NodeLogo, alt: 'Node.js' }
                      : tech === 'Express'
                      ? { src: ExpressLogo, alt: 'Express' }
                      : tech === 'WebSocket'
                      ? { src: WebsocketLogo, alt: 'WebSocket' }
                      : tech === 'MongoDB'
                      ? { src: MongoLogo, alt: 'MongoDB' }
                      : tech === 'Prisma'
                      ? { src: PrismaLogo, alt: 'Prisma' }
                      : tech === 'GraphQL'
                      ? { src: GraphqlLogo, alt: 'GraphQL' }
                      : tech === 'PostgreSQL'
                      ? { src: PostgresLogo, alt: 'PostgreSQL' }
                      : tech === 'Figma'
                      ? { src: FigmaLogo, alt: 'Figma' }
                      : tech === 'Radix UI'
                      ? { src: RadixLogo, alt: 'Radix UI' }
                      : tech === 'Webflow'
                      ? { src: WebflowLogo, alt: 'Webflow' }
                      : tech === 'Framer'
                      ? { src: FramerLogo, alt: 'Framer' }
                      : tech === 'WordPress'
                      ? { src: WordpressLogo, alt: 'WordPress' }
                      : tech === 'GitHub'
                      ? { src: GithubLogo, alt: 'GitHub' }
                      : tech === 'Docker'
                      ? { src: DockerLogo, alt: 'Docker' }
                      : tech === 'Digital Ocean'
                      ? { src: DigitalOceanLogo, alt: 'Digital Ocean' }
                      : tech === 'Vercel'
                      ? { src: VercelLogo, alt: 'Vercel' }
                      : tech === 'AWS'
                      ? { src: AwsLogo, alt: 'AWS' }
                      : tech === 'Google API'
                      ? { src: GoogleLogo, alt: 'Google API' }
                      : null;

                  return (
                    <motion.span
                      key={tech}
                      className={styles.techBadge}
                      variants={itemVariants}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {logo && (
                        <img
                          src={typeof logo.src === 'string' ? logo.src : logo.src.src}
                          alt={logo.alt}
                          className={styles.techIcon}
                          loading="lazy"
                        />
                      )}
                      <span>{tech}</span>
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

