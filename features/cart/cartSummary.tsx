import { typography } from '@/styles/typography';
import type { CartApiData } from '@/types/cart';
import { formatPrice } from '@/utilities/formatter';

interface Props {
  cart: CartApiData;
  children?: React.ReactNode;
}

const CartSummary = ({ cart, children }: Props) => {
  return (
    <section aria-label="Order summary" className="rounded-card bg-grey-50 p-6">
      <h2 className={typography.h6Semibold}>Order summary</h2>
      <dl className={`${typography.bodySmallRegular} mt-4 space-y-2`}>
        <div className="flex justify-between">
          <dt className="text-grey-600">
            Subtotal ({cart.totalQuantity}{' '}
            {cart.totalQuantity === 1 ? 'item' : 'items'})
          </dt>
          <dd className="tabular-nums">{formatPrice(cart.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-grey-600">Shipping</dt>
          <dd>Free</dd>
        </div>
        <div
          className={`${typography.bodyMediumMedium} flex justify-between border-t border-grey-200 pt-3`}
        >
          <dt>Total</dt>
          <dd className="tabular-nums">{formatPrice(cart.subtotal)}</dd>
        </div>
      </dl>
      {children && <div className="mt-6">{children}</div>}
    </section>
  );
};

export default CartSummary;
