import React from 'react';
import Image from 'next/image';
import { Phone } from '@/types/phone';
import styles from './PhoneCard.module.scss';
import { formatPrice } from '@/utils/format';

interface PhoneCardProps {
  phone: Phone;
}

const PhoneCard = ({ phone }: PhoneCardProps) => (
  <article className={styles['phone-card']}>
    <Image
      src={phone.imageUrl}
      alt={`${phone.brand} ${phone.name} phone`}
      className={styles['phone-card__image']}
      width={312}
      height={257}
      priority={false}
    />
    <div className={styles['phone-card__info']}>
      <span className={styles['phone-card__brand']}>{phone.brand}</span>
      <span className={styles['phone-card__name']}>{phone.name}</span>
      <span className={styles['phone-card__price']}>{formatPrice(phone.basePrice)}</span>
    </div>
  </article>
);

export default PhoneCard;
