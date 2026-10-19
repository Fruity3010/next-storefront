import * as yup from 'yup';

export const DECLINED_CARD_SUFFIX = '0002';

export function digitsOnly(value: string | undefined) {
  return (value ?? '').replace(/\D/g, '');
}

export function passesLuhn(digits: string) {
  let sum = 0;
  for (let index = 0; index < digits.length; index++) {
    let digit = Number(digits[digits.length - 1 - index]);
    if (index % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

export function isValidCardNumber(value: string | undefined) {
  const digits = digitsOnly(value);
  return digits.length >= 12 && digits.length <= 19 && passesLuhn(digits);
}

export function isUnexpired(value: string | undefined, now = new Date()) {
  const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(value ?? '');
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  return (
    year > now.getFullYear() ||
    (year === now.getFullYear() && month >= now.getMonth() + 1)
  );
}

export function isDeclinedCard(cardNumber: string) {
  return digitsOnly(cardNumber).endsWith(DECLINED_CARD_SUFFIX);
}

export const checkoutSchema = yup.object({
  fullName: yup.string().trim().required('Enter your full name'),
  email: yup
    .string()
    .trim()
    .email('Enter a valid email address')
    .required('Enter your email address'),
  address: yup.string().trim().required('Enter your address'),
  city: yup.string().trim().required('Enter your city'),
  postcode: yup.string().trim().required('Enter your postcode'),
  cardNumber: yup
    .string()
    .required('Enter your card number')
    .test('card-number', 'Enter a valid card number', isValidCardNumber),
  expiry: yup
    .string()
    .required('Enter the expiry date')
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use the format MM/YY')
    .test('unexpired', 'This card has expired', value => isUnexpired(value)),
  cvc: yup
    .string()
    .required('Enter the security code')
    .matches(/^\d{3,4}$/, 'Enter the 3 or 4 digit code')
});

export type CheckoutFormValues = yup.InferType<typeof checkoutSchema>;
