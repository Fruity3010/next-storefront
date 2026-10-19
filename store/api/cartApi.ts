import { current } from '@reduxjs/toolkit';
import {
  QueryStatus,
  type TypedMutationOnQueryStarted
} from '@reduxjs/toolkit/query/react';
import type {
  AddCartItemQueryArgs,
  CartApiData,
  CartLineApiData,
  UpdateCartItemQueryArgs
} from '@/types/cart';
import { addLine, removeLine, setLineQuantity, toCart } from '@/utilities/cart';
import type { RootState } from '../store';
import { api, baseQuery } from './baseApi';

const CART_MUTATIONS = new Set([
  'addCartItem',
  'updateCartItem',
  'removeCartItem'
]);

function optimisticCartUpdate<QueryArg>(
  change: (items: CartLineApiData[], arg: QueryArg) => CartLineApiData[]
): TypedMutationOnQueryStarted<CartApiData, QueryArg, typeof baseQuery> {
  return async (arg, { dispatch, queryFulfilled }) => {
    const patch = dispatch(
      cartApi.util.updateQueryData('getCart', undefined, draft =>
        toCart(change(current(draft).items, arg))
      )
    );
    try {
      const { data } = await queryFulfilled;
      dispatch(cartApi.util.upsertQueryData('getCart', undefined, data));
    } catch {
      patch.undo();
    }
  };
}

export const cartApi = api.injectEndpoints({
  endpoints: builder => ({
    getCart: builder.query<CartApiData, void>({
      query: () => ({ url: 'cart' }),
      providesTags: ['cart']
    }),
    addCartItem: builder.mutation<CartApiData, AddCartItemQueryArgs>({
      query: ({ product, quantity }) => ({
        url: 'cart/items',
        method: 'POST',
        body: { productId: product.productId, quantity }
      }),
      onQueryStarted: optimisticCartUpdate<AddCartItemQueryArgs>(
        (items, { product, quantity }) =>
          addLine(items, { ...product, quantity })
      )
    }),
    updateCartItem: builder.mutation<CartApiData, UpdateCartItemQueryArgs>({
      query: ({ productId, quantity }) => ({
        url: `cart/items/${productId}`,
        method: 'PATCH',
        body: { quantity }
      }),
      onQueryStarted: optimisticCartUpdate<UpdateCartItemQueryArgs>(
        (items, { productId, quantity }) =>
          setLineQuantity(items, productId, quantity)
      )
    }),
    removeCartItem: builder.mutation<CartApiData, number>({
      query: productId => ({
        url: `cart/items/${productId}`,
        method: 'DELETE'
      }),
      onQueryStarted: optimisticCartUpdate<number>((items, productId) =>
        removeLine(items, productId)
      )
    })
  }),
  overrideExisting: false
});

export const selectIsCartUpdating = (state: RootState) =>
  Object.values(state.api.mutations).some(
    mutation =>
      mutation?.status === QueryStatus.pending &&
      CART_MUTATIONS.has(mutation.endpointName ?? '')
  );

export const {
  useGetCartQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  usePrefetch
} = cartApi;
