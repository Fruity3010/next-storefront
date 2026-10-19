import { getTopRatedProducts } from '@/lib/api';
import ProductGrid from './productGrid';

export const FEATURED_COUNT = 8;

const FeaturedProducts = async () => {
  const { products } = await getTopRatedProducts(FEATURED_COUNT);
  return <ProductGrid products={products} />;
};

export default FeaturedProducts;
