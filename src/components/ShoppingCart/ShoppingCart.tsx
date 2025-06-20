'use client';

import React from 'react';
import Image from 'next/image';
import styles from './ShoppingCart.module.scss'; // BEM naming
import { useCart } from '@/context/CartContext';

const ShoppingCart: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <div className={styles['shopping-cart']}>
      <Image
        src="/assets/svg/shopping-cart.svg"
        alt="Shopping cart"
        width={18}
        height={18}
        priority
      />
      <span className={styles['shopping-cart__count']}>{totalItems}</span>
    </div>
  );
};

export default ShoppingCart;
