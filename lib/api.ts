"use cache";

import { cacheLife } from "next/cache";
import {
  DUMMYJSON_URL,
  productListParams,
  type Category,
  type Product,
  type ProductPage,
  type ProductQuery,
} from "./dummyjson";

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${DUMMYJSON_URL}${path}`);
  if (!res.ok) throw new Error(`DummyJSON ${res.status} for ${path}`);
  return res.json();
}

export async function getCategories() {
  cacheLife("days");
  const categories = await request<(Category & { url: string })[]>("/products/categories");
  return categories.map(({ slug, name }): Category => ({ slug, name }));
}

export async function getProducts(query: ProductQuery) {
  cacheLife("hours");
  return request<ProductPage>(`/products?${productListParams(query)}`);
}

export async function getCategoryProducts(slug: string, query: ProductQuery) {
  cacheLife("hours");
  return request<ProductPage>(
    `/products/category/${encodeURIComponent(slug)}?${productListParams(query)}`,
  );
}

export async function getProduct(id: number): Promise<Product | null> {
  cacheLife("hours");
  const res = await fetch(`${DUMMYJSON_URL}/products/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`DummyJSON ${res.status} for /products/${id}`);
  return res.json();
}
