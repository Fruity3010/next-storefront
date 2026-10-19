import type { Metadata } from 'next';
import CartView from '@/features/cart/cartView';
import { typography } from '@/styles/typography';

export const metadata: Metadata = {
  title: 'Your cart',
  robots: { index: false, follow: false }
};

const CartPage = () => {
  return (
    <>
      <h1 className={`${typography.h3Semibold} mb-8`}>Your cart</h1>
      <CartView />
    </>
  );
};

export default CartPage;
