'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './PhoneDetail.module.scss';
import { formatPrice } from '@/utils/format';
import StorageButtonGroup from '@/components/StorageButtonGroup';
import ColorButtonGroup from '@/components/ColorButtonGroup';
import { StorageOption, ColorOption } from '@/types/phoneDetail';
import Button from '../Button';
import { useCart } from '@/context/CartContext';

interface PhoneDetailProps {
  id: string;
  name: string;
  basePrice: number;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
}

const PhoneDetail: React.FC<PhoneDetailProps> = ({
  id,
  name,
  basePrice,
  colorOptions,
  storageOptions,
}) => {
  const [storage, setStorage] = useState<StorageOption>();
  const [color, setColor] = useState<ColorOption>();
  const price = storage ? storage.price : basePrice;
  const image = color ? color.imageUrl : colorOptions[0].imageUrl;

  const handleSelectStorage = (capacity: StorageOption['capacity']) => {
    setStorage(storageOptions.find((storage) => storage.capacity === capacity));
  };

  const handleSelectColor = (colorName: ColorOption['name']) => {
    setColor(colorOptions.find((color) => color.name === colorName));
  };

  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!storage || !color) return;

    addItem({
      id,
      name,
      storage,
      color: { name: color.name, imageUrl: color.imageUrl },
    });
  };

  return (
    <main className={styles['phone-detail']}>
      <div className={styles['phone-detail__product-info-container']}>
        <div className={styles['phone-detail__image-container']}>
          <Image src={image} fill alt={`${name} in ${color?.name || colorOptions[0].name} color`} />
        </div>
        <div className={styles['phone-detail__form']}>
          <div className={styles['phone-detail__info']}>
            <h1 className={styles['phone-detail__name']}>{name}</h1>
            <span className={styles['phone-detail__price']}>
              {storage || color ? '' : 'From '}
              {formatPrice(price)}
            </span>
          </div>

          <StorageButtonGroup
            capacities={storageOptions.map((option) => option.capacity)}
            selected={storage?.capacity}
            onSelect={handleSelectStorage}
          />

          <ColorButtonGroup
            colors={colorOptions}
            selected={color?.name}
            onSelect={handleSelectColor}
          />

          <Button fullwidth disabled={!storage || !color} onClick={() => handleAddToCart()}>
            Add
          </Button>
        </div>
      </div>
    </main>
  );
};

export default PhoneDetail;
