import React from 'react';
import ColorButton from '../ColorButton/ColorButton';
import styles from './ColorButtonGroup.module.scss';
import { ColorOption } from '@/types/phoneDetail';

interface ColorButtonGroupProps {
  colors: ColorOption[];
  selected?: string;
  onSelect: (colorName: string) => void;
}

const ColorButtonGroup: React.FC<ColorButtonGroupProps> = ({ colors, selected, onSelect }) => {
  const buttonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const groupRef = React.useRef<HTMLDivElement>(null);

  const selectedIdx = colors.findIndex((c) => c.name === selected);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;

    e.preventDefault();

    const currentIdx = selectedIdx === -1 ? 0 : selectedIdx;
    let nextIdx = currentIdx;

    if (e.key === 'ArrowRight') {
      nextIdx = (currentIdx + 1) % colors.length;
    } else if (e.key === 'ArrowLeft') {
      nextIdx = (currentIdx - 1 + colors.length) % colors.length;
    }

    const nextColor = colors[nextIdx];
    onSelect(nextColor.name);

    setTimeout(() => {
      buttonRefs.current[nextIdx]?.focus();
    }, 0);
  };

  return (
    <div className={styles['color-button-group']}>
      <span id="color-selection-label" className={styles['color-button-group__label']}>
        COLOR. PICK YOUR FAVOURITE.
      </span>
      <div
        ref={groupRef}
        className={styles['color-button-group__list']}
        role="radiogroup"
        aria-labelledby="color-selection-label"
        aria-orientation="horizontal"
        tabIndex={selectedIdx === -1 ? 0 : -1}
        onKeyDown={handleKeyDown}
      >
        {colors.map((color, i) => (
          <ColorButton
            key={color.name}
            name={color.name}
            hexCode={color.hexCode}
            selected={selected === color.name}
            onClick={() => onSelect(color.name)}
            ref={(el: HTMLButtonElement | null) => {
              buttonRefs.current[i] = el;
            }}
          />
        ))}
      </div>
      <span className={styles['color-button-group__name']}>{selected}</span>
    </div>
  );
};

export default ColorButtonGroup;
