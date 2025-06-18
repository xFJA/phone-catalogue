'use client';

import { Phone } from '@/types/phone';
import styles from './PhoneGrid.module.scss';
import PhoneCard from '@/components/PhoneCard/PhoneCard';

interface PhoneGridProps {
  phones: Phone[];
}

export const PhoneGrid = ({ phones }: PhoneGridProps) => {
  return (
    <section aria-label="Phone catalog">
      <ul className={styles['phone-grid']} aria-label="Available phones">
        {phones.map((phone, i) => {
          return (
            <li key={phone.id + i} className={styles['phone-grid__item']}>
              <PhoneCard phone={phone} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PhoneGrid;
