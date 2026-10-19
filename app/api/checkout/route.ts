import { ValidationError } from 'yup';
import {
  checkoutSchema,
  isDeclinedCard
} from '@/features/checkout/checkoutSchema';
import { clearCart, readCartLines } from '@/lib/cartCookie';
import { readJson } from '@/lib/requestBody';

const PAYMENT_DELAY_MS = 1200;

function fieldErrorsFrom(error: ValidationError) {
  return Object.fromEntries(
    error.inner.map(issue => [issue.path ?? 'form', issue.message])
  );
}

export async function POST(request: Request) {
  let values;
  try {
    values = await checkoutSchema.validate(await readJson(request), {
      abortEarly: false,
      stripUnknown: true
    });
  } catch (error) {
    if (!(error instanceof ValidationError)) throw error;
    return Response.json(
      {
        message: 'Please check the highlighted fields.',
        fieldErrors: fieldErrorsFrom(error)
      },
      { status: 400 }
    );
  }

  const items = await readCartLines();
  if (items.length === 0) {
    return Response.json({ message: 'Your cart is empty.' }, { status: 409 });
  }

  await new Promise(resolve => setTimeout(resolve, PAYMENT_DELAY_MS));

  if (isDeclinedCard(values.cardNumber)) {
    return Response.json(
      {
        message:
          'Your card was declined. Nothing was charged and your cart is unchanged. Please try a different card.'
      },
      { status: 402 }
    );
  }

  await clearCart();
  return Response.json({
    orderId: crypto.randomUUID().slice(0, 8).toUpperCase()
  });
}
