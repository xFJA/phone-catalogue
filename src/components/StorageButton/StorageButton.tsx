import React from 'react';
import styles from './StorageButton.module.scss';
import clsx from 'clsx';

interface StorageButtonProps {
  capacity: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const StorageButton = React.forwardRef<HTMLButtonElement, StorageButtonProps>(
  ({ capacity, selected = false, onClick, className }, ref) => (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={selected ? 0 : -1}
      className={clsx(
        styles['storage-button'],
        { [styles['storage-button-selected']]: selected },
        className
      )}
      onClick={onClick}
      ref={ref}
    >
      {capacity}
    </button>
  )
);

StorageButton.displayName = 'StorageButton';

export default StorageButton;
