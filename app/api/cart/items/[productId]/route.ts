import { readCartLines, writeCartLines } from '@/lib/cartCookie';
import {
  badRequest,
  parsePositiveInt,
  parseQuantity,
  readJson
} from '@/lib/requestBody';
import { removeLine, setLineQuantity } from '@/utilities/cart';

type Context = RouteContext<'/api/cart/items/[productId]'>;

async function productIdFrom(context: Context) {
  const { productId } = await context.params;
  return parsePositiveInt(Number(productId));
}

export async function PATCH(request: Request, context: Context) {
  const productId = await productIdFrom(context);
  const body = (await readJson(request)) as Record<string, unknown> | null;
  const quantity = parseQuantity(body?.quantity);
  if (!productId || !quantity) {
    return badRequest('A valid productId and quantity are required.');
  }

  const items = setLineQuantity(await readCartLines(), productId, quantity);
  return Response.json(await writeCartLines(items));
}

export async function DELETE(_request: Request, context: Context) {
  const productId = await productIdFrom(context);
  if (!productId) return badRequest('A valid productId is required.');

  const items = removeLine(await readCartLines(), productId);
  return Response.json(await writeCartLines(items));
}
