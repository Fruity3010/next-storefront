import type { CheckoutFormValues } from '@/features/checkout/checkoutSchema';
import type { CheckoutApiData } from '@/types/checkout';
import { api } from './baseApi';

export const checkoutApi = api.injectEndpoints({
  endpoints: builder => ({
    checkout: builder.mutation<CheckoutApiData, CheckoutFormValues>({
      query: data => ({
        url: 'checkout',
        method: 'POST',
        body: data
      }),
      invalidatesTags: result => (result ? ['cart'] : [])
    })
  }),
  overrideExisting: false
});

export const { useCheckoutMutation } = checkoutApi;
