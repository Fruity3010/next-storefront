import { EmptyState } from '@/components/feedback';
import type { ProductSummaryApiData } from '@/types/product';
import ProductCard, { ProductCardSkeleton } from './productCard';

const gridClassName =
  'grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4';

interface Props {
  products: ProductSummaryApiData[];
  eagerCount?: number;
  emptyTitle?: string;
}

const ProductGrid = ({
  products,
  eagerCount = 0,
  emptyTitle = 'No products found'
}: Props) => {
  if (products.length === 0) {
    return <EmptyState title={emptyTitle} />;
  }

  return (
    <ul className={gridClassName}>
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard product={product} eager={index < eagerCount} />
        </li>
      ))}
    </ul>
  );
};

interface SkeletonProps {
  count: number;
}

export const ProductGridSkeleton = ({ count }: SkeletonProps) => {
  return (
    <div className={gridClassName}>
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductGrid;
