import { PhoneService } from './phoneService';
import { Phone } from '@/types/phone';
import { PhoneDetail } from '@/types/phoneDetail';

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
      const originalConsoleError = console.error;
      console.error = jest.fn();

      try {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => [{ invalid: 'data' }],
        });

        await expect(phoneService.getAllPhones()).rejects.toThrow('API response validation failed');
      } finally {
        console.error = originalConsoleError;
      }
    });

    it('should throw an error when API request fails', async () => {
      const originalConsoleError = console.error;
      console.error = jest.fn();

      try {
        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 500,
          json: async () => ({ error: 'Server error' }),
        });

        await expect(phoneService.getAllPhones()).rejects.toThrow(
          'API request failed with status: 500'
        );
      } finally {
        // Restore console.error
        console.error = originalConsoleError;
      }
    });
  });

  describe('getPhoneById', () => {
    const mockPhoneDetail: PhoneDetail = {
      id: '1',
      brand: 'Apple',
      name: 'iPhone 15 Pro',
      description: 'Latest iPhone with advanced features.',
      basePrice: 999,
      rating: 4.9,
      specs: {
        screen: '6.1-inch OLED',
        resolution: '2532x1170',
        processor: 'A17 Bionic',
        mainCamera: '48MP',
        selfieCamera: '12MP',
        battery: '3095mAh',
        os: 'iOS 17',
        screenRefreshRate: '120Hz',
      },
      colorOptions: [
        {
          name: 'Graphite',
          hexCode: '#3a3a3c',
          imageUrl: 'https://example.com/iphone15-graphite.jpg',
        },
      ],
      storageOptions: [
        { capacity: '128GB', price: 999 },
        { capacity: '256GB', price: 1099 },
      ],
      similarProducts: [
        {
          id: '2',
          brand: 'Apple',
          name: 'iPhone 14',
          basePrice: 799,
          imageUrl: 'https://example.com/iphone14.jpg',
        },
        {
          id: '3',
          brand: 'Samsung',
          name: 'Galaxy S23',
          basePrice: 899,
          imageUrl: 'https://example.com/galaxys23.jpg',
        },
      ],
    };

    it('should return phone details for a valid ID', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockPhoneDetail,
      });

      const phone = await phoneService.getPhoneById('1');
      expect(global.fetch).toHaveBeenCalledWith(
        'https://test-api.example.com/products/1',
        expect.objectContaining({
          headers: expect.objectContaining({
            'x-api-key': 'test-api-key',
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(phone).toEqual(mockPhoneDetail);
    });

    it('should return null for 404 response', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ error: 'Not found' }),
      });
      const phone = await phoneService.getPhoneById('does-not-exist');
      expect(phone).toBeNull();
    });

    it('should throw if validation fails', async () => {
      const originalConsoleError = console.error;
      console.error = jest.fn();

      try {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => ({
            // Partial data that will fail validation
            id: '1',
            brand: 'Apple',
            name: 'iPhone 15 Pro',
            description: 'The latest iPhone',
            basePrice: 999,
            rating: 4.8,
          }),
        });

        await expect(phoneService.getPhoneById('1')).rejects.toThrow(
          'API response validation failed'
        );
      } finally {
        console.error = originalConsoleError;
      }
    });

    it('should throw if API fails', async () => {
      const originalConsoleError = console.error;
      console.error = jest.fn();

      try {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 500,
          json: async () => ({ error: 'Server error' }),
        });

        await expect(phoneService.getPhoneById('1')).rejects.toThrow(
          'API request failed with status: 500'
        );
      } finally {
        console.error = originalConsoleError;
      }
    });
  });
});
