import { Phone, PhoneArraySchema } from '@/types/phone';
import { PhoneDetail, PhoneDetailSchema } from '@/types/phoneDetail';
import env from '@/env';

export class PhoneService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    this.apiUrl = env.PHONE_CATALOGUE_API_URL;
    this.apiKey = env.PHONE_CATALOGUE_API_KEY;
  }

  async getAllPhones(limit?: number, offset?: number): Promise<Phone[]> {
    try {
      const url = new URL(`${this.apiUrl}/products`);
      if (typeof limit === 'number') url.searchParams.set('limit', String(limit));
      if (typeof offset === 'number') url.searchParams.set('offset', String(offset));

      const response = await fetch(url.toString(), {
        headers: {
          'x-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      const validationResult = PhoneArraySchema.safeParse(data);

      if (!validationResult.success) {
        console.error('API response validation failed:', validationResult.error);
        throw new Error('API response validation failed');
      }

      return validationResult.data;
    } catch (error) {
      console.error('Error fetching phones:', error);
      throw error;
    }
  }

  async getPhoneById(id: string): Promise<PhoneDetail | null> {
    try {
      const url = new URL(`${this.apiUrl}/products/${id}`);
      const response = await fetch(url.toString(), {
        headers: {
          'x-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 404) {
        return null;
      }
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      const validationResult = PhoneDetailSchema.safeParse(data);
      if (!validationResult.success) {
        console.error('API response validation failed:', validationResult.error);
        throw new Error('API response validation failed');
      }
      return validationResult.data;
    } catch (error) {
      console.error('Error fetching phone by id:', error);
      throw error;
    }
  }
}

export const phoneService = new PhoneService();
