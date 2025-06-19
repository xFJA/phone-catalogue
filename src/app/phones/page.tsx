import PhoneGrid from '@/components/PhoneGrid';
import styles from '../page.module.scss';
import { phoneService } from '@/services/phoneService';

export default async function PhonesPage() {
  const phones = await phoneService.getAllPhones();

  return (
    <main className={styles.main}>
      <PhoneGrid phones={phones} />
    </main>
  );
}
