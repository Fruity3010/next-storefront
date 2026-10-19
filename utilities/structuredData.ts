import { AvailabilityStatus } from '@/enums/product';
import type { ProductApiData } from '@/types/product';
import { CURRENCY } from './formatter';
import { SITE_URL } from './environment';

export type BreadcrumbItem = {
  name: string;
  href: string;
};

const schemaAvailability: Record<AvailabilityStatus, string> = {
  [AvailabilityStatus.IN_STOCK]: 'https://schema.org/InStock',
  [AvailabilityStatus.LOW_STOCK]: 'https://schema.org/LimitedAvailability',
  [AvailabilityStatus.OUT_OF_STOCK]: 'https://schema.org/OutOfStock'
};

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function productJsonLd(product: ProductApiData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images,
    sku: product.sku,
    category: product.category,
    ...(product.brand && {
      brand: { '@type': 'Brand', name: product.brand }
    }),
    ...(product.reviews.length > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviews.length
      }
    }),
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/product/${product.id}`),
      price: product.price,
      priceCurrency: CURRENCY,
      availability: schemaAvailability[product.availabilityStatus],
      itemCondition: 'https://schema.org/NewCondition'
    }
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href)
    }))
  };
}
