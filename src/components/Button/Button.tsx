import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  fullwidth?: boolean;
  width?: string | number;
  variant?: 'outlined' | 'default';
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  fullwidth = false,
  width,
  variant = 'default',
  size = 'large',
  ...rest
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        { [styles['button--disabled']]: disabled },
        { [styles['button--fullwidth']]: fullwidth },
        { [styles['button--outlined']]: variant === 'outlined' },
        { [styles['button--small']]: size === 'small' },
        { [styles['button--medium']]: size === 'medium' },
        { [styles['button--large']]: size === 'large' }
      )}
      type={rest.type || 'button'}
      disabled={disabled}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      style={width ? { width } : undefined}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
