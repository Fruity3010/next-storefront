const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export const CURRENCY = 'USD';

export function formatPrice(value: number) {
  return currencyFormatter.format(value);
}
