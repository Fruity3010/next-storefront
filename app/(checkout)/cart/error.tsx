'use client';

import { RouteError } from '@/components/feedback';

interface Props {
  error: unknown;
  retry: () => void;
}

const CartError = (props: Props) => {
  return (
    <RouteError
      {...props}
      message="We couldn't load your cart. Your items are safe."
    />
  );
};

export default CartError;
