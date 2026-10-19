'use client';

import { ErrorState } from '@/components/feedback';

interface Props {
  error: unknown;
  retry: () => void;
}

const ShopError = ({ retry }: Props) => {
  return (
    <div className="py-section">
      <ErrorState
        message="We couldn't load this page. Please try again."
        onRetry={retry}
      />
    </div>
  );
};

export default ShopError;
