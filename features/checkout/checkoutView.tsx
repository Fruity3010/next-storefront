'use client';

import Link from 'next/link';
import { useState } from 'react';
import { buttonStyles } from '@/components/button';
import { EmptyState, ErrorState, Skeleton } from '@/components/feedback';
import CartSummary from '@/features/cart/cartSummary';
import { useGetCartQuery } from '@/store/api/cartApi';
import { typography } from '@/styles/typography';
import CheckoutForm from './checkoutForm';

const layoutClassName = 'grid gap-10';

const CheckoutView = () => {
  const [orderId, setOrderId] = useState<string | null>(null);
  const { data: cart, isLoading, isError, refetch } = useGetCartQuery();

  if (orderId) {
    return (
      <div
        role="status"
        className="rounded-card bg-success-50 p-section text-center"
      >
        <h2 className={`${typography.h4Semibold} text-success-700`}>
          Order confirmed
        </h2>
        <p className={`${typography.bodyMediumRegular} mt-2`}>
          Thanks for your order. Your reference is <strong>{orderId}</strong>.
        </p>
        <Link href="/" className={`${buttonStyles()} mt-6`}>
          Continue shopping
        </Link>
      </div>
    );
  }

  if (isLoading) return <CheckoutSkeleton />;

  if (isError || !cart) {
    return (
      <ErrorState
        title="Couldn't load your cart"
        message="Please try again before paying."
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
      <CartSummary cart={cart}>
        <Link
          href="/cart"
          className={`${typography.bodySmallMedium} text-primary-600 underline`}
        >
          Edit cart
        </Link>
      </CartSummary>
      <CheckoutForm onSuccess={setOrderId} />
    </div>
  );
};

export const CheckoutSkeleton = () => {
  return (
    <div className={layoutClassName}>
      <Skeleton className="h-56" />
      <Skeleton className="h-96" />
    </div>
  );
};

export default CheckoutView;
