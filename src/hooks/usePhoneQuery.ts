'use client';

import { useQuery } from '@tanstack/react-query';
import { Phone, PhoneArraySchema } from '@/types/phone';

interface UsePhoneQueryOptions {
  initialData?: Phone[];
  searchQuery?: string;
}

export function usePhoneQuery({ initialData, searchQuery = '' }: UsePhoneQueryOptions = {}) {
  return useQuery({
    queryKey: ['phones', searchQuery],
    queryFn: async () => {
      const url = searchQuery
        ? `/api/phones?search=${encodeURIComponent(searchQuery)}`
        : '/api/phones';

      try {
        const response = await fetch(url, {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch phones: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return PhoneArraySchema.parse(data);
      } catch (error) {
        throw error;
      }
    },
    enabled: searchQuery.length === 0 || searchQuery.length > 1,
    initialData,
    staleTime: 1000,
    gcTime: 60000,
    refetchOnWindowFocus: false,
  });
}
