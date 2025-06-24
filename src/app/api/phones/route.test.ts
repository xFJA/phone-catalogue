import { GET } from './route';

jest.mock('@/services/phoneService', () => {
  return {
    __esModule: true,
    phoneService: {
      getAllPhones: jest.fn(),
    },
  };
});

import { phoneService } from '@/services/phoneService';

const mockPhones = [
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

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((body, options = {}) => {
      return {
        status: options?.status || 200,
        json: async () => body,
      };
    }),
  },
}));

describe('GET /api/phones', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    phoneService.getAllPhones = jest.fn().mockImplementation((limit, offset, _search) => {
      if (limit === 1 && offset === 1) {
        return Promise.resolve([mockPhones[1]]);
      }
      return Promise.resolve([...mockPhones]);
    });
  });

  it('should return all phones with status 200', async () => {
    const request = new Request('http://localhost:3000/api/phones');

    const response = await GET(request);

    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toHaveLength(2);
    expect(data[0].id).toBe('1');
    expect(data[1].id).toBe('2');

    expect(phoneService.getAllPhones).toHaveBeenCalledWith(20, 0, undefined);
  });

  it('should handle pagination parameters', async () => {
    const request = new Request('http://localhost:3000/api/phones?limit=1&offset=1');

    const response = await GET(request);

    expect(response.status).toBe(200);

    const data = await response.json();

    expect(data).toHaveLength(1);
    expect(data[0].id).toBe('2');
    expect(phoneService.getAllPhones).toHaveBeenCalledWith(1, 1, undefined);
  });

  it('should handle invalid pagination parameters', async () => {
    const request = new Request('http://localhost:3000/api/phones?limit=abc&offset=xyz');

    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(phoneService.getAllPhones).toHaveBeenCalledWith(NaN, NaN, undefined);
  });

  it('should handle service errors', async () => {
    // Temporarily disable console.error for this test
    const originalConsoleError = console.error;
    console.error = jest.fn();

    try {
      phoneService.getAllPhones = jest.fn().mockImplementationOnce(() => {
        throw new Error('Service error');
      });

      const request = new Request('http://localhost:3000/api/phones');

      const response = await GET(request);

      expect(response.status).toBe(500);

      const data = await response.json();
      expect(data).toHaveProperty('error');
      expect(data.error).toBe('Service error');
    } finally {
      // Restore console.error
      console.error = originalConsoleError;
    }
  });
});
