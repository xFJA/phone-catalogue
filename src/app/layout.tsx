import '@/styles/globals.scss';
import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';

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
        <Header />
        {children}
      </body>
    </html>
  );
}
