import { cookies } from 'next/headers';
import type { CartLineApiData } from '@/types/cart';
import { clampQuantity, MAX_CART_LINES, toCart } from '@/utilities/cart';
import { isProductionEnvironment } from '@/utilities/environment';
import { getProduct } from './api';

const CART_COOKIE = 'cart';
const CART_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

type CartCookieLine = [productId: number, quantity: number];

function isCartCookieLine(value: unknown): value is CartCookieLine {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    Number.isInteger(value[0]) &&
    value[0] > 0 &&
    Number.isInteger(value[1]) &&
    value[1] > 0
  );
}

function parseCartCookie(value: string | undefined): CartCookieLine[] {
  try {
    const parsed: unknown = JSON.parse(value ?? '[]');
    return Array.isArray(parsed)
      ? parsed.filter(isCartCookieLine).slice(0, MAX_CART_LINES)
      : [];
  } catch {
    return [];
  }
}

export async function toCartLine(
  productId: number,
  quantity: number
): Promise<CartLineApiData | null> {
  const product = await getProduct(productId);
  if (!product) return null;
  return {
    productId,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
    stock: product.stock,
    quantity: clampQuantity(quantity, product.stock)
  };
}

export async function readCartLines() {
  const cookieStore = await cookies();
  const lines = parseCartCookie(cookieStore.get(CART_COOKIE)?.value);
  const items = await Promise.all(
    lines.map(([productId, quantity]) => toCartLine(productId, quantity))
  );
  return items.filter(
    (item): item is CartLineApiData => item !== null && item.quantity > 0
  );
}

export async function writeCartLines(items: CartLineApiData[]) {
  const cookieStore = await cookies();
  const lines: CartCookieLine[] = items.map(item => [
    item.productId,
    item.quantity
  ]);
  cookieStore.set(CART_COOKIE, JSON.stringify(lines), {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProductionEnvironment(),
    path: '/',
    maxAge: CART_MAX_AGE_SECONDS
  });
  return toCart(items);
}

export async function clearCart() {
  const cookieStore = await cookies();
  cookieStore.delete(CART_COOKIE);
}
