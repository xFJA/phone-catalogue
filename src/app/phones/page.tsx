import styles from './PhonesPage.module.scss';
import { phoneService } from '@/services/phoneService';
import PhoneSearch from '@/components/PhoneSearch';

export default async function PhonesPage() {
  const initialPhones = await phoneService.getAllPhones();

  return (
    <main className={styles['phones-page']}>
      <PhoneSearch initialPhones={initialPhones} />
    </main>
  );
}
