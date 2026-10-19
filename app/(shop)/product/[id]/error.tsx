'use client';

import { RouteError } from '@/components/feedback';

interface Props {
  error: unknown;
  retry: () => void;
}

const ProductError = (props: Props) => {
  return <RouteError {...props} message="We couldn't load this product." />;
};

export default ProductError;
