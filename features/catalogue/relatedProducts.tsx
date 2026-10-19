import { getCategoryProducts } from '@/lib/api';
import ProductGrid from './productGrid';

export const RELATED_COUNT = 4;

interface Props {
  category: string;
  excludeId: number;
}

const RelatedProducts = async ({ category, excludeId }: Props) => {
  const { products } = await getCategoryProducts(category, {
    limit: RELATED_COUNT + 1,
    skip: 0
  });
  const related = products
    .filter(product => product.id !== excludeId)
    .slice(0, RELATED_COUNT);

  return (
    <ProductGrid products={related} emptyTitle="No related products yet" />
  );
};

export default RelatedProducts;
