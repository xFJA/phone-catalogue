import { PhoneService } from './phoneService';
import { Phone } from '@/types/phone';

global.fetch = jest.fn();

jest.mock('@/env', () => ({
  __esModule: true,
  default: {
    PHONE_CATALOGUE_API_URL: 'https://test-api.example.com',
    PHONE_CATALOGUE_API_KEY: 'test-api-key',
  },
}));

const mockPhones: Phone[] = [
  {
    id: '1',
    brand: 'Apple',
    name: 'iPhone 15 Pro',
    basePrice: 999,
    imageUrl: 'https://example.com/iphone15.jpg',
  },
  {
    id: '2',
    brand: 'Samsung',
    name: 'Galaxy S23',
    basePrice: 899,
    imageUrl: 'https://example.com/galaxys23.jpg',
  },
];

describe('PhoneService', () => {
  let phoneService: PhoneService;
  const mockFetch = global.fetch as jest.Mock;

  beforeEach(() => {
    mockFetch.mockReset();
    phoneService = new PhoneService();
  });

  describe('getAllPhones', () => {
    it('should fetch all phones successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [...mockPhones],
      });

      const phones = await phoneService.getAllPhones();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://test-api.example.com/products',
        expect.objectContaining({
          headers: {
            'x-api-key': 'test-api-key',
            'Content-Type': 'application/json',
          },
        })
      );
      expect(phones).toHaveLength(2);
      expect(phones[0].id).toBe('1');
      expect(phones[0].brand).toBe('Apple');
      expect(phones[1].id).toBe('2');
      expect(phones[1].brand).toBe('Samsung');
    });

    it('should handle pagination parameters correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [mockPhones[1]],
      });

      const phones = await phoneService.getAllPhones(1, 1);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://test-api.example.com/products?limit=1&offset=1',
        expect.anything()
      );

      expect(phones).toHaveLength(1);
      expect(phones[0].id).toBe('2');
      expect(phones[0].brand).toBe('Samsung');
    });

    it('should throw an error when API response validation fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [{ invalid: 'data' }],
      });

      await expect(phoneService.getAllPhones()).rejects.toThrow('API response validation failed');
    });

    it('should throw an error when API request fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Server error' }),
      });

      await expect(phoneService.getAllPhones()).rejects.toThrow(
        'API request failed with status: 500'
      );
    });
  });
});
