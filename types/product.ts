import {
  AvailabilityStatus,
  ProductSortField,
  SortOrder
} from '@/enums/product';

export type ReviewApiData = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
};

export type ProductApiData = {
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
  reviews: ReviewApiData[];
  images: string[];
  thumbnail: string;
};

export const PRODUCT_SUMMARY_FIELDS = [
  'title',
  'price',
  'discountPercentage',
  'rating',
  'thumbnail',
  'category',
  'availabilityStatus'
] as const;

export type ProductSummaryApiData = Pick<
  ProductApiData,
  'id' | (typeof PRODUCT_SUMMARY_FIELDS)[number]
>;

export type ProductListQueryArgs = {
  limit: number;
  skip: number;
  sortBy?: ProductSortField;
  order?: SortOrder;
};
