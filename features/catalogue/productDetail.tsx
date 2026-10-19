import { Skeleton } from '@/components/feedback';
import { AvailabilityStatus } from '@/enums/product';
import { typography } from '@/styles/typography';
import type { ProductApiData } from '@/types/product';
import { formatPrice } from '@/utilities/formatter';
import ProductGallery from './productGallery';
import Rating from './rating';

const availabilityClassName: Record<AvailabilityStatus, string> = {
  [AvailabilityStatus.IN_STOCK]: 'bg-success-50 text-success-700',
  [AvailabilityStatus.LOW_STOCK]: 'bg-warning-50 text-warning-700',
  [AvailabilityStatus.OUT_OF_STOCK]: 'bg-error-50 text-error-700'
};

const layoutClassName = 'grid gap-10 lg:grid-cols-2';

interface Props {
  product: ProductApiData;
}

const ProductDetail = ({ product }: Props) => {
  return (
    <div className={layoutClassName}>
      <ProductGallery images={product.images} title={product.title} />
      <div>
        {product.brand && (
          <p className={`${typography.bodySmallMedium} text-grey-500`}>
            {product.brand}
          </p>
        )}
        <h1 className={`${typography.h3Semibold} mt-1`}>{product.title}</h1>
        <div className="mt-3">
          <Rating value={product.rating} count={product.reviews.length} />
        </div>
        <p className={`${typography.priceLarge} mt-6`}>
          {formatPrice(product.price)}
        </p>
        <span
          className={`${typography.captionSmall} ${availabilityClassName[product.availabilityStatus]} mt-3 inline-block rounded-full px-3 py-1 font-medium`}
        >
          {product.availabilityStatus}
        </span>
        <p className={`${typography.bodyMediumRegular} mt-6 text-grey-700`}>
          {product.description}
        </p>
        <dl
          className={`${typography.bodySmallRegular} mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-grey-200 pt-6`}
        >
          <dt className="text-grey-500">Shipping</dt>
          <dd>{product.shippingInformation}</dd>
          <dt className="text-grey-500">Returns</dt>
          <dd>{product.returnPolicy}</dd>
          <dt className="text-grey-500">SKU</dt>
          <dd>{product.sku}</dd>
        </dl>
      </div>
    </div>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div className={layoutClassName}>
      <div>
        <Skeleton className="aspect-square" />
        <div className="mt-4 flex gap-3">
          <Skeleton className="size-20" />
          <Skeleton className="size-20" />
          <Skeleton className="size-20" />
        </div>
      </div>
      <div>
        <Skeleton className="h-5 w-24" />
        <Skeleton className="mt-2 h-9 w-3/4" />
        <Skeleton className="mt-3 h-4 w-20" />
        <Skeleton className="mt-6 h-9 w-28" />
        <Skeleton className="mt-3 h-6 w-20" />
        <Skeleton className="mt-6 h-24" />
        <Skeleton className="mt-8 h-24" />
      </div>
    </div>
  );
};

export default ProductDetail;
