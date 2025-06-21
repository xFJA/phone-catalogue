import styles from './Header.module.scss';
import Image from 'next/image';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import Link from 'next/link';

const Header = () => (
  <header className={styles.header}>
    <Link href="/">
      <Image src="/assets/svg/header-logo.svg" alt="Logo" width={74} height={24} priority />
    </Link>
    <ShoppingCart />
  </header>
);

export default Header;
