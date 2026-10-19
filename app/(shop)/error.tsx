'use client';

import { RouteError } from '@/components/feedback';

interface Props {
  error: unknown;
  retry: () => void;
}

const ShopError = (props: Props) => {
  return (
    <RouteError
      {...props}
      message="We couldn't load this page. Please try again."
    />
  );
};

export default ShopError;
