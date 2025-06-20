import { useEffect, useState } from 'react';

/**
 * useDebounce
 * Returns a debounced copy of the supplied value that only updates after
 * the specified delay has elapsed without the value changing.
 *
 * This is useful for scenarios such as filtering or querying as the user types,
 * where you want to avoid firing a request on every single keystroke.
 *
 * @param value The value to debounce.
 * @param delay The debounce delay in milliseconds (default: 300ms).
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
