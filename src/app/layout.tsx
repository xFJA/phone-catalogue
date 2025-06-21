import '@/styles/globals.scss';
import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import { CartProvider } from '@/context/CartContext';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import styles from './Layout.module.scss';

export const metadata: Metadata = {
  title: 'Phone Catalogue',
  description: 'A phone catalogue application',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <CartProvider>
            <div className={styles.layout}>
              <Header />
              {children}
            </div>
          </CartProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
