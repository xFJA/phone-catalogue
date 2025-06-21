'use client';

import { useRef } from 'react';
import PhoneCard from '@/components/PhoneCard';
import ScrollIndicator from '@/components/ScrollIndicator/ScrollIndicator';
import styles from './SimilarItemsSection.module.scss';
import { SimilarProduct } from '@/types/phoneDetail';

interface SimilarItemsSectionProps {
  similarProducts: SimilarProduct[];
}

export default function SimilarItemsSection({ similarProducts }: SimilarItemsSectionProps) {
  const scrollContainerRef = useRef<HTMLUListElement>(null);

  if (!similarProducts || similarProducts.length === 0) {
    return null;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 320;
    if (e.key === 'ArrowRight') {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      e.preventDefault();
    }
  };

  return (
    <section
      className={styles['similar-items']}
      aria-labelledby="similar-items-heading"
      tabIndex={-1}
    >
      <h2 id="similar-items-heading" className={styles['similar-items__title']}>
        SIMILAR ITEMS
      </h2>
      <div className={styles['similar-items__container']}>
        <ul
          ref={scrollContainerRef}
          className={styles['similar-items__scroll-container']}
          role="list"
          aria-roledescription="carousel"
          aria-label="Similar phones"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {similarProducts.map((item) => (
            <li key={item.id} className={styles['similar-items__card']} role="listitem">
              <PhoneCard
                phone={{
                  id: item.id,
                  brand: item.brand,
                  name: item.name,
                  basePrice: item.basePrice,
                  imageUrl: item.imageUrl,
                }}
              />
            </li>
          ))}
        </ul>
        <ScrollIndicator
          scrollContainerRef={scrollContainerRef}
          trackClassName={styles['similar-items__scroll-track']}
          thumbClassName={styles['similar-items__scroll-thumb']}
        />
      </div>
    </section>
  );
}
