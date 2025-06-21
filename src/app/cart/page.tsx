'use client';

import Button from '@/components/Button';
import Link from 'next/link';
import styles from './CartPage.module.scss';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/format';
import Image from 'next/image';

export default function CartPage() {
  const { items, totalItems, removeItem } = useCart();
  return (
    <main className={styles['cart-page']}>
      <span className={styles['cart-page__items-count']}>CART ({totalItems})</span>
      <ul>
        {items.map((item) => (
          <li key={item.id} className={styles['cart-page__item']}>
            <div className={styles['cart-page__image-container']}>
              <Image
                src={item.color.imageUrl}
                alt={item.name}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className={styles['cart-page__right-container']}>
              <div className={styles['cart-page__item-info-container']}>
                <div className={styles['cart-page__details-container']}>
                  <span>{item.name}</span>
                  <span>{`${item.storage.capacity} | ${item.color.name}`}</span>
                </div>
                <span>{formatPrice(item.storage.price)}</span>
              </div>
              <button
                className={styles['cart-page__remove-button']}
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles['cart-page__actions']}>
        <Link href="/phones">
          <Button width={260}>CONTINUE SHOPPING</Button>
        </Link>
        <div className={styles['cart-page__total']}>
          <span>Total: {formatPrice(totalItems)}</span>
          <Button width={260}>Pay</Button>
        </div>
      </div>
    </main>
  );
}
