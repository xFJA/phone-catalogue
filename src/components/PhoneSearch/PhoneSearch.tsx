'use client';

import { useSearchParams } from 'next/navigation';
import { usePhoneQuery } from '@/hooks/usePhoneQuery';
import { Phone } from '@/types/phone';
import { Search } from '@/components/Search/Search';
import PhoneGrid from '@/components/PhoneGrid/PhoneGrid';
import styles from './PhoneSearch.module.scss';

interface PhoneSearchProps {
  initialPhones: Phone[];
}

export default function PhoneSearch({ initialPhones }: PhoneSearchProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const { data: phones = [], isFetching } = usePhoneQuery({
    initialData: searchQuery ? undefined : initialPhones,
    searchQuery,
  });

  const showResultsCount = searchQuery.length > 0;
  const resultsCount = phones.length;

  const isSearching = searchQuery.length > 0 && isFetching;

  return (
    <div className={styles['phone-search']}>
      <Search placeholder="Search for a smartphone..." />

      {showResultsCount && !isSearching && (
        <div className={styles['phone-search__results-info']}>
          {resultsCount} result{resultsCount !== 1 ? 's' : ''}
        </div>
      )}

      <PhoneGrid phones={phones} />
    </div>
  );
}
