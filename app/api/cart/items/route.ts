import { readCartLines, toCartLine, writeCartLines } from '@/lib/cartCookie';
import {
  badRequest,
  parsePositiveInt,
  parseQuantity,
  readJson
} from '@/lib/requestBody';
import { addLine } from '@/utilities/cart';

export async function POST(request: Request) {
  const body = (await readJson(request)) as Record<string, unknown> | null;
  const productId = parsePositiveInt(body?.productId);
  const quantity = parseQuantity(body?.quantity);
  if (!productId || !quantity) {
    return badRequest('A valid productId and quantity are required.');
  }

  const line = await toCartLine(productId, quantity);
  if (!line) {
    return Response.json(
      { message: 'This product no longer exists.' },
      { status: 404 }
    );
  }
  if (line.quantity === 0) {
    return Response.json(
      { message: 'This product is out of stock.' },
      { status: 409 }
    );
  }

  const items = addLine(await readCartLines(), { ...line, quantity });
  return Response.json(await writeCartLines(items));
}
