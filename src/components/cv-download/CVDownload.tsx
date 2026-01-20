import { useEffect, useRef } from 'react';
import Button from '@components/button/Button';
import { DownloadIcon } from '@radix-ui/react-icons';
import styles from './CVDownload.module.scss';

export default function CVDownload() {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

      if (isMobile || isFirefox) {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = '/CV_RAPARISON.pdf';
        link.download = 'CV_RAPARISON.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };

    const link = linkRef.current;
    if (link) {
      link.addEventListener('click', handleClick);
      return () => {
        link.removeEventListener('click', handleClick);
      };
    }
  }, []);

  return (
    <a
      ref={linkRef}
      href="/CV_RAPARISON.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
    >
      <Button variant="secondary" title="Voir mon CV" type="button">
        <DownloadIcon />
      </Button>
    </a>
  );
}
