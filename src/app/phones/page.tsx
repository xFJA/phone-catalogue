import PhoneCard from '@/components/PhoneCard';
import styles from './PhonesPage.module.scss';
import { phoneService } from '@/services/phoneService';
import Search from '@/components/Search';

export default async function PhonesPage() {
  const phones = await phoneService.getAllPhones();

  return (
    <main className={styles['phones-page']}>
      <Search />
      <section aria-label="Phone catalog">
        <ul className={styles['phones-page__list']} aria-label="Available phones">
          {phones.map((phone, i) => {
            return (
              <li key={phone.id + i} className={styles['phones-page__item']}>
                <PhoneCard phone={phone} />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
