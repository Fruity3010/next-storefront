import type { Metadata } from 'next';
import CheckoutView from '@/features/checkout/checkoutView';
import { typography } from '@/styles/typography';

export const metadata: Metadata = {
  title: 'Checkout',
  robots: { index: false, follow: false }
};

const CheckoutPage = () => {
  return (
    <>
      <h1 className={`${typography.h3Semibold} mb-8`}>Checkout</h1>
      <CheckoutView />
    </>
  );
};

export default CheckoutPage;
