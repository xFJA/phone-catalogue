import { render, screen, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import { CartItem } from '@/types/cart';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Test component that uses the cart context
const TestComponent = ({
  onAddItem,
  onRemoveItem,
  onClearCart,
}: {
  onAddItem?: () => void;
  onRemoveItem?: () => void;
  onClearCart?: () => void;
}) => {
  const { items, addItem, removeItem, clearCart, totalItems } = useCart();

  const testItem: Omit<CartItem, 'quantity'> = {
    id: 'test-id',
    name: 'Test Phone',
    color: { name: 'Black', imageUrl: '/test.jpg' },
    storage: { capacity: '128GB', price: 999 },
  };

  return (
    <div>
      <span data-testid="total-items">{totalItems}</span>
      <ul>
        {items.map((item) => (
          <li key={item.id} data-testid={`item-${item.id}`}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          addItem(testItem);
          if (onAddItem) onAddItem();
        }}
      >
        Add Item
      </button>
      <button
        onClick={() => {
          removeItem('test-id');
          if (onRemoveItem) onRemoveItem();
        }}
      >
        Remove Item
      </button>
      <button
        onClick={() => {
          clearCart();
          if (onClearCart) onClearCart();
        }}
      >
        Clear Cart
      </button>
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });

  it('initializes with an empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('total-items').textContent).toBe('0');
    expect(screen.queryByTestId('item-test-id')).not.toBeInTheDocument();
  });

  it('loads items from localStorage on initialization', () => {
    const storedItems = [
      {
        id: 'test-id',
        name: 'Test Phone',
        color: { name: 'Black', imageUrl: '/test.jpg' },
        storage: { capacity: '128GB', price: 999 },
        quantity: 2,
      },
    ];

    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(storedItems));

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('total-items').textContent).toBe('2');
    expect(screen.getByTestId('item-test-id')).toBeInTheDocument();
  });

  it('adds an item to the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Add Item').click();
    });

    expect(screen.getByTestId('total-items').textContent).toBe('1');
    expect(screen.getByTestId('item-test-id')).toBeInTheDocument();
    expect(mockLocalStorage.setItem).toHaveBeenCalled();
  });

  it('increases quantity when adding the same item', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Add Item').click();
      screen.getByText('Add Item').click();
    });

    expect(screen.getByTestId('total-items').textContent).toBe('2');
    expect(screen.getByTestId('item-test-id').textContent).toContain('2');
  });

  it('removes an item from the cart', () => {
    const storedItems = [
      {
        id: 'test-id',
        name: 'Test Phone',
        color: { name: 'Black', imageUrl: '/test.jpg' },
        storage: { capacity: '128GB', price: 999 },
        quantity: 1,
      },
    ];

    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(storedItems));

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('item-test-id')).toBeInTheDocument();

    act(() => {
      screen.getByText('Remove Item').click();
    });

    expect(screen.queryByTestId('item-test-id')).not.toBeInTheDocument();
    expect(screen.getByTestId('total-items').textContent).toBe('0');
  });

  it('clears the cart', () => {
    const storedItems = [
      {
        id: 'test-id',
        name: 'Test Phone',
        color: { name: 'Black', imageUrl: '/test.jpg' },
        storage: { capacity: '128GB', price: 999 },
        quantity: 2,
      },
      {
        id: 'test-id-2',
        name: 'Another Phone',
        color: { name: 'White', imageUrl: '/test2.jpg' },
        storage: { capacity: '256GB', price: 1299 },
        quantity: 1,
      },
    ];

    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(storedItems));

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('total-items').textContent).toBe('3');

    act(() => {
      screen.getByText('Clear Cart').click();
    });

    expect(screen.getByTestId('total-items').textContent).toBe('0');
    expect(screen.queryByTestId('item-test-id')).not.toBeInTheDocument();
    expect(screen.queryByTestId('item-test-id-2')).not.toBeInTheDocument();
  });

  it('handles localStorage errors gracefully', () => {
    // Simulate localStorage error
    mockLocalStorage.getItem.mockImplementationOnce(() => {
      throw new Error('Storage error');
    });

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Should initialize with empty cart despite the error
    expect(screen.getByTestId('total-items').textContent).toBe('0');
  });
});
