'use client';

import React from 'react';
import Image from 'next/image';
import styles from './ShoppingCart.module.scss'; // BEM naming
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

const ShoppingCart: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      aria-label="Shopping cart"
      className={styles['shopping-cart']}
      data-testid="cart-icon"
    >
      <Image
        src="/assets/svg/shopping-cart.svg"
        alt="Shopping cart"
        width={18}
        height={18}
        priority
      />
      <span className={styles['shopping-cart__count']} data-testid="cart-count">
        {totalItems}
      </span>
    </Link>
  );
};

export default ShoppingCart;
