'use client';

import Link from 'next/link';
import { buttonStyles } from '@/components/button';
import { EmptyState, ErrorState, Skeleton } from '@/components/feedback';
import { useGetCartQuery } from '@/store/api/cartApi';
import CartLine from './cartLine';
import CartSummary from './cartSummary';

const layoutClassName = 'grid gap-8';

const CartView = () => {
  const { data: cart, isLoading, isError, refetch } = useGetCartQuery();

  if (isLoading) return <CartSkeleton />;

  if (isError || !cart) {
    return (
      <ErrorState
        title="Couldn't load your cart"
        message="Your items are safe. Please try again."
        onRetry={refetch}
      />
    );
  }

  if (cart.items.length === 0) {
    return (
      <EmptyState title="Your cart is empty">
        <Link href="/" className={`${buttonStyles()} mt-4`}>
          Start shopping
        </Link>
      </EmptyState>
    );
  }

  return (
    <div className={layoutClassName}>
      <ul aria-label="Cart items" className="border-t border-grey-200">
        {cart.items.map(item => (
          <CartLine key={item.productId} item={item} />
        ))}
      </ul>
      <CartSummary cart={cart}>
        <Link
          href="/checkout"
          className={`${buttonStyles({ size: 'lg' })} w-full`}
        >
          Go to checkout
        </Link>
      </CartSummary>
    </div>
  );
};

export const CartSkeleton = () => {
  return (
    <div className={layoutClassName}>
      <div className="border-t border-grey-200">
        {Array.from({ length: 2 }, (_, index) => (
          <div key={index} className="flex gap-4 border-b border-grey-200 py-5">
            <Skeleton className="size-20 shrink-0" />
            <div className="flex flex-1 flex-col gap-3">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-9 w-56" />
            </div>
          </div>
        ))}
      </div>
      <Skeleton className="h-64" />
    </div>
  );
};

export default CartView;
