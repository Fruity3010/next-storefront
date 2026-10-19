import { Skeleton } from '@/components/feedback';
import { CartSkeleton } from '@/features/cart/cartView';

const CartLoading = () => {
  return (
    <>
      <Skeleton className="mb-8 h-9 w-40" />
      <CartSkeleton />
    </>
  );
};

export default CartLoading;
