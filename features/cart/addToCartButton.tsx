'use client';

import Link from 'next/link';
import { Button } from '@/components/button';
import { useAddCartItemMutation } from '@/store/api/cartApi';
import { typography } from '@/styles/typography';
import type { CartProductData } from '@/types/cart';
import { getErrorMessage } from '@/utilities/apiError';

interface Props {
  product: CartProductData;
}

const AddToCartButton = ({ product }: Props) => {
  const [addCartItem, { isLoading, isSuccess, isError, error }] =
    useAddCartItemMutation();
  const isOutOfStock = product.stock < 1;

  return (
    <div className="mt-6">
      <Button
        size="lg"
        className="w-full sm:w-auto"
        disabled={isOutOfStock}
        loading={isLoading}
        loadingText="Adding…"
        onClick={() => addCartItem({ product, quantity: 1 })}
      >
        {isOutOfStock ? 'Out of stock' : 'Add to cart'}
      </Button>
      <p
        role="status"
        className={`${typography.bodySmallRegular} mt-3 min-h-5`}
      >
        {isSuccess && (
          <>
            Added to your cart.{' '}
            <Link
              href="/cart"
              className="font-medium text-primary-600 underline"
            >
              View cart
            </Link>
          </>
        )}
        {isError && (
          <span className="text-error-700">
            {getErrorMessage(
              error,
              "We couldn't add this item. Please try again."
            )}
          </span>
        )}
      </p>
    </div>
  );
};

export default AddToCartButton;
