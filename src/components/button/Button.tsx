import styles from './Button.module.scss';
import type { ReactNode } from 'react';

interface ButtonProps {
  children?: ReactNode;
  title?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  title,
  variant = 'primary',
  size = 'sm',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
      {children}
    </button>
  );
}
