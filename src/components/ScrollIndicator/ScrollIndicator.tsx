'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ScrollIndicator.module.scss';

const THUMB_WIDTH = 100;

interface ScrollIndicatorProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | HTMLUListElement | null>;
  trackClassName?: string;
  thumbClassName?: string;
}

export default function ScrollIndicator({
  scrollContainerRef,
  trackClassName,
  thumbClassName,
}: ScrollIndicatorProps) {
  const [thumbWidth, setThumbWidth] = useState(THUMB_WIDTH);
  const [thumbPosition, setThumbPosition] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      const scrollableWidth = scrollWidth - clientWidth;

      if (scrollableWidth <= 0) return;

      // Calculate the thumb width based on the visible portion of content
      const newThumbWidth = Math.max(THUMB_WIDTH, (clientWidth / scrollWidth) * 100);
      setThumbWidth(newThumbWidth);

      // Calculate the thumb position
      const scrollPercentage = scrollLeft / scrollableWidth;
      const trackWidth = trackRef.current?.clientWidth || 100;
      const maxThumbPosition = trackWidth - newThumbWidth;
      const newPosition = scrollPercentage * maxThumbPosition;

      setThumbPosition(newPosition);
    };

    handleScroll();

    scrollContainer.addEventListener('scroll', handleScroll);

    window.addEventListener('resize', handleScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [scrollContainerRef]);

  return (
    <div className={styles['scroll-indicator']}>
      <div ref={trackRef} className={`${styles['scroll-track']} ${trackClassName || ''}`}>
        <div
          className={`${styles['scroll-thumb']} ${thumbClassName || ''}`}
          style={{
            width: `${thumbWidth}px`,
            transform: `translateX(${thumbPosition}px)`,
          }}
        />
      </div>
    </div>
  );
}
