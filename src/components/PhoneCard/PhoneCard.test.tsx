import { render, screen } from '@testing-library/react';
import PhoneCard from './PhoneCard';
import { Phone } from '@/types/phone';
import { formatPrice } from '@/utils/format';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className }: { src: string; alt: string; className: string }) => (
    <div data-testid="mock-image" data-src={src} data-alt={alt} className={className} />
  ),
}));

type LinkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
  'aria-label'?: string;
};

jest.mock('next/link', () => {
  return function MockLink({ children, href, className, 'aria-label': ariaLabel }: LinkProps) {
    return (
      <a href={href} className={className} aria-label={ariaLabel}>
        {children}
      </a>
    );
  };
});

describe('PhoneCard', () => {
  const mockPhone: Phone = {
    id: 'test-phone-1',
    brand: 'Apple',
    name: 'iPhone 15 Pro',
    basePrice: 999,
    imageUrl: '/images/iphone15pro.jpg',
  };

  it('renders phone information correctly', () => {
    render(<PhoneCard phone={mockPhone} />);

    expect(screen.getByText(mockPhone.brand)).toBeInTheDocument();
    expect(screen.getByText(mockPhone.name)).toBeInTheDocument();
    expect(screen.getByText(formatPrice(mockPhone.basePrice))).toBeInTheDocument();
  });

  it('renders the phone image with correct attributes', () => {
    render(<PhoneCard phone={mockPhone} />);

    const image = screen.getByTestId('mock-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('data-src', mockPhone.imageUrl);
    expect(image).toHaveAttribute('data-alt', `${mockPhone.brand} ${mockPhone.name} phone`);
  });

  it('links to the correct phone detail page', () => {
    render(<PhoneCard phone={mockPhone} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/phones/${mockPhone.id}`);
    expect(link).toHaveAttribute(
      'aria-label',
      `View details for ${mockPhone.brand} ${mockPhone.name}`
    );
  });
});
