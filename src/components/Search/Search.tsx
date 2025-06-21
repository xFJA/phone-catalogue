'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import styles from './Search.module.scss';
import { useDebounce } from '@/hooks/useDebounce';
import Image from 'next/image';

interface SearchProps {
  placeholder?: string;
  onSearch?: (term: string) => void;
}

export const Search = ({ placeholder = 'Search for a smartphone...', onSearch }: SearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get('search') || '';

  const [inputValue, setInputValue] = useState(initialSearchTerm);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearchTerm = useDebounce(inputValue, 300);

  useEffect(() => {
    const currentSearch = searchParams.get('search') ?? '';

    if (debouncedSearchTerm === currentSearch) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearchTerm) {
      params.set('search', debouncedSearchTerm);
    } else {
      params.delete('search');
    }

    const nextUrl = `${window.location.pathname}${params.toString() ? `?${params}` : ''}`;

    if (nextUrl !== window.location.pathname + window.location.search) {
      router.replace(nextUrl, { scroll: false });
    }

    if (onSearch) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, router, searchParams, onSearch]);

  const clearSearch = () => {
    setInputValue('');

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={styles['search']}>
      <div
        className={clsx(styles['search__input-wrapper'], {
          [styles['search__input-wrapper--focused']]: isFocused,
        })}
      >
        <input
          ref={inputRef}
          type="text"
          className={styles['search__input']}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search for smartphones"
        />
        {inputValue && (
          <button
            className={styles['search__clear']}
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <Image src="/assets/svg/close.svg" alt="Logo" width={20} height={20} priority />
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
