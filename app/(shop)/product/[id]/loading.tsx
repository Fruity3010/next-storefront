import { Skeleton } from '@/components/feedback';
import { ProductDetailSkeleton } from '@/features/catalogue/productDetail';

const ProductLoading = () => {
  return (
    <>
      <div className="py-4">
        <Skeleton className="h-5 w-64" />
      </div>
      <ProductDetailSkeleton />
    </>
  );
};

export default ProductLoading;
