'use cache';

import { cacheLife } from 'next/cache';
import { ProductSortField, SortOrder } from '@/enums/product';
import type { CategoryApiData } from '@/types/category';
import type { WithPagination } from '@/types/common';
import type {
  ProductApiData,
  ProductListQueryArgs,
  ProductSummaryApiData
} from '@/types/product';
import { DUMMYJSON_URL } from '@/utilities/environment';
import { productListSearchParams } from '@/utilities/urlSearchParams';

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${DUMMYJSON_URL}${path}`);
  if (!res.ok) throw new Error(`DummyJSON ${res.status} for ${path}`);
  return res.json();
}

export async function getCategories() {
  cacheLife('days');
  return request<CategoryApiData[]>('/products/categories');
}

export async function getProducts(query: ProductListQueryArgs) {
  cacheLife('hours');
  return request<WithPagination<ProductSummaryApiData>>(
    `/products?${productListSearchParams(query)}`
  );
}

export async function getCategoryProducts(
  slug: string,
  query: ProductListQueryArgs
) {
  cacheLife('hours');
  return request<WithPagination<ProductSummaryApiData>>(
    `/products/category/${encodeURIComponent(slug)}?${productListSearchParams(query)}`
  );
}

export async function getProduct(id: number): Promise<ProductApiData | null> {
  cacheLife('hours');
  const res = await fetch(`${DUMMYJSON_URL}/products/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`DummyJSON ${res.status} for /products/${id}`);
  return res.json();
}

export async function getTopRatedProducts(limit: number) {
  cacheLife('hours');
  return request<WithPagination<ProductSummaryApiData>>(
    `/products?${productListSearchParams({
      limit,
      skip: 0,
      sortBy: ProductSortField.RATING,
      order: SortOrder.DESC
    })}`
  );
}

export async function getCategory(slug: string) {
  cacheLife('days');
  const categories = await getCategories();
  return categories.find(category => category.slug === slug) ?? null;
}
