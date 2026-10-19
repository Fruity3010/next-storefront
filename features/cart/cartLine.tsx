'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/button';
import { useAppSelector } from '@/store/hooks';
import {
  selectIsCartUpdating,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation
} from '@/store/api/cartApi';
import { typography } from '@/styles/typography';
import type { CartLineApiData } from '@/types/cart';
import { getErrorMessage } from '@/utilities/apiError';
import { maxQuantityFor } from '@/utilities/cart';
import { formatPrice } from '@/utilities/formatter';

interface Props {
  item: CartLineApiData;
}

const CartLine = ({ item }: Props) => {
  const isCartUpdating = useAppSelector(selectIsCartUpdating);
  const [updateCartItem, update] = useUpdateCartItemMutation();
  const [removeCartItem, remove] = useRemoveCartItemMutation();
  const error = update.error ?? remove.error;
  const maxQuantity = maxQuantityFor(item.stock);
  const isLinePending = update.isLoading || remove.isLoading;

  const setQuantity = (quantity: number) =>
    updateCartItem({ productId: item.productId, quantity });

  return (
    <li
      aria-busy={isLinePending}
      className="flex gap-4 border-b border-grey-200 py-5 transition-opacity aria-busy:opacity-60"
    >
      <Link
        href={`/product/${item.productId}`}
        className="size-20 shrink-0 overflow-hidden rounded-card bg-grey-50"
      >
        <Image
          src={item.thumbnail}
          alt={item.title}
          width={80}
          height={80}
          className="h-full w-full object-contain"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex justify-between gap-4">
          <Link
            href={`/product/${item.productId}`}
            className={`${typography.bodyMediumMedium} hover:text-primary-600`}
          >
            {item.title}
          </Link>
          <span className={typography.bodyMediumMedium}>
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div
            role="group"
            aria-label={`Quantity for ${item.title}`}
            className="flex items-center"
          >
            <Button
              size="sm"
              color="grey"
              outline
              aria-label="Decrease quantity"
              disabled={isCartUpdating || item.quantity <= 1}
              onClick={() => setQuantity(item.quantity - 1)}
            >
              −
            </Button>
            <span
              aria-live="polite"
              className={`${typography.bodySmallMedium} w-10 text-center tabular-nums`}
            >
              {item.quantity}
            </span>
            <Button
              size="sm"
              color="grey"
              outline
              aria-label="Increase quantity"
              disabled={isCartUpdating || item.quantity >= maxQuantity}
              onClick={() => setQuantity(item.quantity + 1)}
            >
              +
            </Button>
          </div>
          <Button
            size="sm"
            color="error"
            outline
            disabled={isCartUpdating}
            loading={remove.isLoading}
            loadingText="Removing…"
            onClick={() => removeCartItem(item.productId)}
          >
            Remove
          </Button>
        </div>
        {error && (
          <p
            role="alert"
            className={`${typography.captionSmall} text-error-700`}
          >
            {getErrorMessage(
              error,
              "We couldn't update this item. Your cart is unchanged."
            )}
          </p>
        )}
      </div>
    </li>
  );
};

export default CartLine;
