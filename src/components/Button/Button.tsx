import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  fullwidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  fullwidth = false,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        { [styles['button--disabled']]: disabled },
        { [styles['button--fullwidth']]: fullwidth }
      )}
      type={rest.type || 'button'}
      disabled={disabled}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
