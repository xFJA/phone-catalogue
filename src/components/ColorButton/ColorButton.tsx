import React from 'react';
import styles from './ColorButton.module.scss';
import clsx from 'clsx';

interface ColorButtonProps {
  name: string;
  hexCode: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const ColorButton = React.forwardRef<HTMLButtonElement, ColorButtonProps>(
  ({ name, hexCode, selected = false, onClick, className }, ref) => (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={name}
      tabIndex={selected ? 0 : -1}
      className={clsx(
        styles['color-button'],
        { [styles['color-button--selected']]: selected },
        className
      )}
      onClick={onClick}
      ref={ref}
      data-testid="color-option"
    >
      <span className={styles['color-button__swatch']} style={{ backgroundColor: hexCode }} />
    </button>
  )
);

ColorButton.displayName = 'ColorButton';

export default ColorButton;
