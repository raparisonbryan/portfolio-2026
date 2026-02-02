import Button from '@components/button/Button';
import { BackpackIcon } from '@radix-ui/react-icons';

export default function ProjectCTA() {
  const handleClick = () => {
    window.location.href = '/projects';
  };

  return (
    <div className="projets-cta">
      <Button title="Voir mes projets" onClick={handleClick}>
        <BackpackIcon />
      </Button>
    </div>
  );
}
