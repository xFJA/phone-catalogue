import { Phone, PhoneArraySchema } from '@/types/phone';

export class PhoneService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    const apiUrl = process.env.PHONE_CATALOGUE_API_URL;
    const apiKey = process.env.PHONE_CATALOGUE_API_KEY;

    if (!apiUrl) {
      throw new Error('PHONE_CATALOGUE_API_URL environment variable is not set');
    }

    if (!apiKey) {
      throw new Error('PHONE_CATALOGUE_API_KEY environment variable is not set');
    }

    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
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
}

export const phoneService = new PhoneService();
