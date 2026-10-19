import { Skeleton } from '@/components/feedback';
import { CheckoutSkeleton } from '@/features/checkout/checkoutView';

const CheckoutLoading = () => {
  return (
    <>
      <Skeleton className="mb-8 h-9 w-40" />
      <CheckoutSkeleton />
    </>
  );
};

export default CheckoutLoading;
