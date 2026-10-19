'use client';

import { RouteError } from '@/components/feedback';

interface Props {
  error: unknown;
  retry: () => void;
}

const CheckoutError = (props: Props) => {
  return (
    <RouteError
      {...props}
      message="We couldn't load checkout. Your cart is unchanged."
    />
  );
};

export default CheckoutError;
