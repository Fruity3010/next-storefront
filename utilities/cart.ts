import type { CartApiData, CartLineApiData } from '@/types/cart';

export const MAX_LINE_QUANTITY = 10;
export const MAX_CART_LINES = 50;

export function maxQuantityFor(stock: number) {
  return Math.min(stock, MAX_LINE_QUANTITY);
}

export function clampQuantity(quantity: number, stock: number) {
  return Math.max(0, Math.min(quantity, maxQuantityFor(stock)));
}

export function toCart(items: CartLineApiData[]): CartApiData {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalInCents = items.reduce(
    (sum, item) => sum + Math.round(item.price * 100) * item.quantity,
    0
  );
  return { items, totalQuantity, subtotal: subtotalInCents / 100 };
}

export function setLineQuantity(
  items: CartLineApiData[],
  productId: number,
  quantity: number
) {
  return items
    .map(item =>
      item.productId === productId
        ? { ...item, quantity: clampQuantity(quantity, item.stock) }
        : item
    )
    .filter(item => item.quantity > 0);
}

export function addLine(items: CartLineApiData[], line: CartLineApiData) {
  const existing = items.find(item => item.productId === line.productId);
  if (existing) {
    return setLineQuantity(
      items,
      line.productId,
      existing.quantity + line.quantity
    );
  }
  if (items.length >= MAX_CART_LINES) return items;
  const quantity = clampQuantity(line.quantity, line.stock);
  return quantity > 0 ? [...items, { ...line, quantity }] : items;
}

export function removeLine(items: CartLineApiData[], productId: number) {
  return items.filter(item => item.productId !== productId);
}
