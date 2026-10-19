import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import StoreProvider from '@/store/storeProvider';
import { SITE_NAME, SITE_URL } from '@/utilities/environment';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: 'Everyday products, fast delivery. A Next.js storefront demo.',
  openGraph: { siteName: SITE_NAME, type: 'website' }
};

const RootLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="flex min-h-dvh flex-col">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
