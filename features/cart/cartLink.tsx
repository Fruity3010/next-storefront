'use client';

import Link from 'next/link';
import { useGetCartQuery } from '@/store/api/cartApi';
import { typography } from '@/styles/typography';

const CartLink = () => {
  const { data: cart } = useGetCartQuery();
  const count = cart?.totalQuantity ?? 0;

  return (
    <Link
      href="/cart"
      aria-label={
        count > 0 ? `Cart, ${count} ${count === 1 ? 'item' : 'items'}` : 'Cart'
      }
      className={`${typography.bodySmallMedium} relative hover:text-primary-600`}
    >
      Cart
      {count > 0 && (
        <span
          aria-hidden
          className={`${typography.captionSmall} absolute -top-2.5 -right-5 flex size-5 items-center justify-center rounded-full bg-primary-600 font-semibold text-white`}
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
};

export default CartLink;
