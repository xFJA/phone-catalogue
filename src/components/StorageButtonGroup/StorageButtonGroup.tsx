import React, { useEffect } from 'react';
import StorageButton from '../StorageButton/StorageButton';
import styles from './StorageButtonGroup.module.scss';

interface StorageButtonGroupProps {
  capacities: string[];
  selected?: string;
  onSelect: (capacity: string) => void;
  ariaLabel?: string;
}

const StorageButtonGroup: React.FC<StorageButtonGroupProps> = ({
  capacities,
  selected,
  onSelect,
  ariaLabel = 'Storage Options',
}) => {
  const buttonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const groupRef = React.useRef<HTMLDivElement>(null);

  const selectedIdx = capacities.findIndex((c) => c === selected);

  // Focus the first button if nothing is selected initially
  useEffect(() => {
    if (selectedIdx === -1 && buttonRefs.current[0]) {
      // Don't auto-focus on initial render to avoid unexpected focus shifts
      // Only focus if user interacts with the component
    }
  }, [selectedIdx]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (capacities.length === 0) return;

    const currentIdx = selectedIdx >= 0 ? selectedIdx : 0;
    let nextIdx = currentIdx;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIdx = (currentIdx + 1) % capacities.length;
        e.preventDefault();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIdx = (currentIdx - 1 + capacities.length) % capacities.length;
        e.preventDefault();
        break;
      case 'Home':
        nextIdx = 0;
        e.preventDefault();
        break;
      case 'End':
        nextIdx = capacities.length - 1;
        e.preventDefault();
        break;
      case ' ':
      case 'Enter':
        if (document.activeElement === groupRef.current) {
          nextIdx = currentIdx;
          e.preventDefault();
        }
        break;
      default:
        return;
    }

    if (nextIdx !== currentIdx || selectedIdx === -1) {
      onSelect(capacities[nextIdx]);
      requestAnimationFrame(() => {
        buttonRefs.current[nextIdx]?.focus();
      });
    }
  };

  return (
    <div
      ref={groupRef}
      className={styles['storage-button-group']}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      tabIndex={selectedIdx === -1 ? 0 : -1}
      onKeyDown={handleKeyDown}
    >
      {capacities.map((capacity, i) => (
        <StorageButton
          key={capacity}
          capacity={capacity}
          selected={selected === capacity}
          onClick={() => onSelect(capacity)}
          className={styles['storage-button-grouped']}
          ref={(el: HTMLButtonElement | null) => {
            buttonRefs.current[i] = el;
          }}
        />
      ))}
    </div>
  );
};

export default StorageButtonGroup;
