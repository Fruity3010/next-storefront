import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/feedback';
import { typography } from '@/styles/typography';
import type { ProductSummaryApiData } from '@/types/product';
import { formatPrice } from '@/utilities/formatter';
import Rating from './rating';

interface Props {
  product: ProductSummaryApiData;
  eager?: boolean;
}

const ProductCard = ({ product, eager = false }: Props) => {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="aspect-square overflow-hidden rounded-card bg-grey-50">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
          loading={eager ? 'eager' : 'lazy'}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="h-full w-full object-contain transition-transform group-hover:scale-105"
        />
      </div>
      <h3
        className={`${typography.bodySmallMedium} mt-3 line-clamp-2 h-10 group-hover:text-primary-600`}
      >
        {product.title}
      </h3>
      <div className="mt-1 flex h-7 items-center justify-between">
        <span className={typography.priceMedium}>
          {formatPrice(product.price)}
        </span>
        <Rating value={product.rating} />
      </div>
    </Link>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div>
      <Skeleton className="aspect-square" />
      <Skeleton className="mt-3 h-10" />
      <Skeleton className="mt-1 h-7 w-1/3" />
    </div>
  );
};

export default ProductCard;
