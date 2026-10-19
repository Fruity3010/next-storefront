import { readCartLines } from '@/lib/cartCookie';
import { toCart } from '@/utilities/cart';

export async function GET() {
  return Response.json(toCart(await readCartLines()));
}
