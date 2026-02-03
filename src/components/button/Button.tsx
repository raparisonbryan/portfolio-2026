import styles from './Button.module.scss';
import type { ReactNode } from 'react';

interface ButtonProps {
  children?: ReactNode;
  title?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const buttonClass = (variant: string, size: string, className: string) =>
  `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

export default function Button({
  children,
  title,
  variant = 'primary',
  size = 'sm',
  href,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  
  const handleClick = href
    ? () => { window.location.href = href; }
    : onClick;

  return (
    <button
      type={type}
      className={buttonClass(variant, size, className)}
      onClick={handleClick}
      disabled={disabled}
      title={title}
    >
      {title}
      {children}
    </button>
  );
}
