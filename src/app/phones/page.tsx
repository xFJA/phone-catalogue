import styles from './PhonesPage.module.scss';
import { phoneService } from '@/services/phoneService';
import PhoneSearch from '@/components/PhoneSearch/PhoneSearch';
import { Suspense } from 'react';

export default async function PhonesPage() {
  const initialPhones = await phoneService.getAllPhones(20, 0);

  return (
    <main className={styles['phones-page']}>
      <Suspense>
        <PhoneSearch initialPhones={initialPhones} />
      </Suspense>
    </main>
  );
}
