import type { WithPagination } from '@/types/common';
import {
  PRODUCT_SUMMARY_FIELDS,
  type ProductSummaryApiData
} from '@/types/product';
import { DUMMYJSON_URL } from '@/utilities/environment';
import { api } from './baseApi';

export const SEARCH_RESULT_LIMIT = 24;

export const searchApi = api.injectEndpoints({
  endpoints: builder => ({
    searchProducts: builder.query<
      WithPagination<ProductSummaryApiData>,
      string
    >({
      query: q => ({
        url: `${DUMMYJSON_URL}/products/search`,
        params: {
          q,
          limit: SEARCH_RESULT_LIMIT,
          select: PRODUCT_SUMMARY_FIELDS.join(',')
        }
      }),
      keepUnusedDataFor: 300
    })
  }),
  overrideExisting: false
});

export const { useSearchProductsQuery, usePrefetch } = searchApi;
