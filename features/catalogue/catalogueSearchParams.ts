import { ProductSortField, SortOrder } from '@/enums/product';
import type { ProductListQueryArgs } from '@/types/product';

export const PAGE_SIZE = 12;

type SortOption = {
  label: string;
  sortBy?: ProductSortField;
  order?: SortOrder;
};

export const SORT_OPTIONS = {
  featured: { label: 'Featured' },
  'price-asc': {
    label: 'Price: low to high',
    sortBy: ProductSortField.PRICE,
    order: SortOrder.ASC
  },
  'price-desc': {
    label: 'Price: high to low',
    sortBy: ProductSortField.PRICE,
    order: SortOrder.DESC
  },
  'rating-desc': {
    label: 'Top rated',
    sortBy: ProductSortField.RATING,
    order: SortOrder.DESC
  },
  'title-asc': {
    label: 'Name: A to Z',
    sortBy: ProductSortField.TITLE,
    order: SortOrder.ASC
  }
} satisfies Record<string, SortOption>;

export type SortKey = keyof typeof SORT_OPTIONS;

export const DEFAULT_SORT: SortKey = 'featured';

export type CatalogueParams = {
  sort: SortKey;
  page: number;
};

type RawSearchParams = Record<string, string | string[] | undefined>;

function isSortKey(value: unknown): value is SortKey {
  return typeof value === 'string' && Object.hasOwn(SORT_OPTIONS, value);
}

export function parseCatalogueParams(
  searchParams: RawSearchParams
): CatalogueParams {
  const page = Math.floor(Number(searchParams.page));
  return {
    sort: isSortKey(searchParams.sort) ? searchParams.sort : DEFAULT_SORT,
    page: Number.isFinite(page) && page > 1 ? page : 1
  };
}

export function toProductListQuery({
  sort,
  page
}: CatalogueParams): ProductListQueryArgs {
  const option: SortOption = SORT_OPTIONS[sort];
  return {
    limit: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
    sortBy: option.sortBy,
    order: option.order
  };
}

export function catalogueHref(
  pathname: string,
  { sort, page }: CatalogueParams
) {
  const params = new URLSearchParams();
  if (sort !== DEFAULT_SORT) params.set('sort', sort);
  if (page > 1) params.set('page', String(page));
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
