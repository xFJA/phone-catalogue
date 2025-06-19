'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './PhoneDetail.module.scss';
import { formatPrice } from '@/utils/format';
import StorageButtonGroup from '@/components/StorageButtonGroup';
import { StorageOption } from '@/types/phoneDetail';

interface PhoneDetailProps {
  name: string;
  basePrice: number;
  colorOptions: { imageUrl: string }[];
  storageOptions: StorageOption[];
}

const PhoneDetail: React.FC<PhoneDetailProps> = ({
  name,
  basePrice,
  colorOptions,
  storageOptions,
}) => {
  const [storage, setStorage] = useState<StorageOption>();
  const price = storage ? storage.price : basePrice;

  const handleSelectStorage = (capacity: StorageOption['capacity']) => {
    setStorage(storageOptions.find((storage) => storage.capacity === capacity));
  };

  return (
    <main className={styles['phone-detail']}>
      <div className={styles['phone-detail__product-info-container']}>
        <div className={styles['phone-detail__image-container']}>
          <Image src={colorOptions[0].imageUrl} alt={name} fill priority={false} />
        </div>
        <div className={styles['phone-detail__form']}>
          <h1 className={styles['phone-detail__name']}>{name}</h1>
          <span className={styles['phone-detail__price']}>From {formatPrice(price)}</span>
          <StorageButtonGroup
            capacities={storageOptions.map((option) => option.capacity)}
            selected={storage?.capacity}
            onSelect={handleSelectStorage}
          />
        </div>
      </div>
    </main>
  );
};

export default PhoneDetail;
