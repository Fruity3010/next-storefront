import { MAX_LINE_QUANTITY } from '@/utilities/cart';

export async function readJson(request: Request): Promise<unknown> {
  return request.json().catch(() => null);
}

export function parsePositiveInt(
  value: unknown,
  max = Number.MAX_SAFE_INTEGER
) {
  return Number.isInteger(value) &&
    (value as number) > 0 &&
    (value as number) <= max
    ? (value as number)
    : null;
}

export function parseQuantity(value: unknown) {
  return parsePositiveInt(value, MAX_LINE_QUANTITY);
}

export function badRequest(message: string) {
  return Response.json({ message }, { status: 400 });
}
