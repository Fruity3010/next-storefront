import { SortOrder } from '@/enums/product';
import { PRODUCT_SUMMARY_FIELDS, ProductListQueryArgs } from '@/types/product';

export function productListSearchParams({
  limit,
  skip,
  sortBy,
  order
}: ProductListQueryArgs) {
  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
    select: PRODUCT_SUMMARY_FIELDS.join(',')
  });
  if (sortBy) {
    params.set('sortBy', sortBy);
    params.set('order', order ?? SortOrder.ASC);
  }
  return params;
}
