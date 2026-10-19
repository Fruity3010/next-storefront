import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AsyncSection } from '@/components/feedback';
import { Breadcrumbs } from '@/components/navigation';
import { JsonLd } from '@/components/seo';
import ProductDetail from '@/features/catalogue/productDetail';
import { ProductGridSkeleton } from '@/features/catalogue/productGrid';
import ProductReviews from '@/features/catalogue/productReviews';
import RelatedProducts, {
  RELATED_COUNT
} from '@/features/catalogue/relatedProducts';
import { getCategory, getProduct, getTopRatedProducts } from '@/lib/api';
import { productJsonLd } from '@/utilities/structuredData';

const PRERENDERED_PRODUCT_COUNT = 30;

type Props = PageProps<'/product/[id]'>;

async function loadProduct(params: Props['params']) {
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isInteger(productId) || productId < 1) notFound();
  const product = await getProduct(productId);
  if (!product) notFound();
  return product;
}

export async function generateStaticParams() {
  const { products } = await getTopRatedProducts(PRERENDERED_PRODUCT_COUNT);
  return products.map(product => ({ id: String(product.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await loadProduct(params);
  const canonical = `/product/${product.id}`;

  return {
    title: product.title,
    description: product.description,
    alternates: { canonical },
    openGraph: {
      title: product.title,
      description: product.description,
      url: canonical,
      images: [
        { url: product.images[0] ?? product.thumbnail, alt: product.title }
      ]
    }
  };
}

const ProductPage = async ({ params }: Props) => {
  const product = await loadProduct(params);
  const category = await getCategory(product.category);

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          ...(category
            ? [{ name: category.name, href: `/category/${category.slug}` }]
            : []),
          { name: product.title, href: `/product/${product.id}` }
        ]}
      />
      <ProductDetail product={product} />
      <ProductReviews reviews={product.reviews} />
      <AsyncSection
        title="Related products"
        fallback={<ProductGridSkeleton count={RELATED_COUNT} />}
      >
        <RelatedProducts category={product.category} excludeId={product.id} />
      </AsyncSection>
    </>
  );
};

export default ProductPage;
