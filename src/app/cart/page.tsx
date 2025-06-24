'use client';

import Button from '@/components/Button';
import Link from 'next/link';
import styles from './CartPage.module.scss';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/format';
import Image from 'next/image';

export default function CartPage() {
  const { items, totalItems, removeItem } = useCart();

  // Calculate total price
  const totalPrice = items.reduce((sum, item) => sum + item.storage.price, 0);

  return (
    <main className={styles['cart-page']}>
      <div className={styles['cart-page__items-container']}>
        <div className={styles['cart-page__items-count']}>
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </div>
        {items.length === 0 ? (
          <div className={styles['cart-page__empty']}>
            <p>Your cart is empty</p>
            <Link href="/phones">
              <Button variant="outlined">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <ul className={styles['cart-page__items-list']}>
            {items.map((item) => (
              <li key={item.id} className={styles['cart-page__item']}>
                <div className={styles['cart-page__image-container']}>
                  <Image
                    src={item.color.imageUrl}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 768px) 120px, 150px"
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
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles['cart-page__actions']}>
        <Link href="/phones">
          <Button variant="outlined" width={260}>
            CONTINUE SHOPPING
          </Button>
        </Link>

        <div className={styles['cart-page__checkout']}>
          <div className={styles['cart-page__total']}>
            <span>TOTAL</span>
            <span className={styles['cart-page__total-amount']}>{formatPrice(totalPrice)}</span>
          </div>
          <Button width={260}>CHECKOUT</Button>
        </div>
      </div>
    </main>
  );
}
