export const DUMMYJSON_URL = "https://dummyjson.com";

export type AvailabilityStatus = "In Stock" | "Low Stock" | "Out of Stock";

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  sku: string;
  availabilityStatus: AvailabilityStatus;
  shippingInformation: string;
  returnPolicy: string;
  reviews: Review[];
  images: string[];
  thumbnail: string;
}

export const PRODUCT_SUMMARY_FIELDS = [
  "title",
  "price",
  "discountPercentage",
  "rating",
  "thumbnail",
  "category",
  "availabilityStatus",
] as const;

export type ProductSummary = Pick<Product, "id" | (typeof PRODUCT_SUMMARY_FIELDS)[number]>;

export interface Category {
  slug: string;
  name: string;
}

export interface ProductPage<T = ProductSummary> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}

export type SortField = "price" | "rating" | "title";
export type SortOrder = "asc" | "desc";

export interface ProductQuery {
  limit: number;
  skip: number;
  sortBy?: SortField;
  order?: SortOrder;
}

export function productListParams(query: ProductQuery) {
  const params = new URLSearchParams({
    limit: String(query.limit),
    skip: String(query.skip),
    select: PRODUCT_SUMMARY_FIELDS.join(","),
  });
  if (query.sortBy) {
    params.set("sortBy", query.sortBy);
    params.set("order", query.order ?? "asc");
  }
  return params;
}
