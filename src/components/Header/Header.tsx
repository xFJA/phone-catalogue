import styles from './Header.module.scss';
import Image from 'next/image';

const Header = () => (
  <header className={styles.header}>
    <Image src="/assets/svg/header-logo.svg" alt="Logo" width={74} height={24} priority />
    <Image
      src="/assets/svg/shopping-cart.svg"
      alt="Shopping cart"
      width={18}
      height={18}
      priority
    />
  </header>
);

export default Header;
