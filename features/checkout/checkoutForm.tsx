'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import { FormInput } from '@/components/form';
import { useCheckoutMutation } from '@/store/api/checkoutApi';
import { typography } from '@/styles/typography';
import { getErrorMessage, getFieldErrors } from '@/utilities/apiError';
import {
  checkoutSchema,
  DECLINED_CARD_SUFFIX,
  type CheckoutFormValues
} from './checkoutSchema';

const fieldsetClassName = 'grid gap-4 sm:grid-cols-2';
const legendClassName = `${typography.h6Semibold} mb-4`;

interface Props {
  onSuccess: (orderId: string) => void;
}

const CheckoutForm = ({ onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<CheckoutFormValues>({
    resolver: yupResolver(checkoutSchema),
    mode: 'onTouched'
  });
  const [checkout, { isLoading, isError, error }] = useCheckoutMutation();

  const onSubmit = async (values: CheckoutFormValues) => {
    try {
      const { orderId } = await checkout(values).unwrap();
      onSuccess(orderId);
    } catch (submitError) {
      const fieldErrors = getFieldErrors(submitError);
      for (const [field, message] of Object.entries(fieldErrors)) {
        setError(field as keyof CheckoutFormValues, { message });
      }
    }
  };

  const fieldProps = (name: keyof CheckoutFormValues) => ({
    ...register(name),
    error: errors[name]?.message
  });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid gap-10">
      <fieldset className={fieldsetClassName} disabled={isLoading}>
        <legend className={legendClassName}>Contact and delivery</legend>
        <FormInput
          label="Full name"
          autoComplete="name"
          className="sm:col-span-2"
          {...fieldProps('fullName')}
        />
        <FormInput
          label="Email"
          type="email"
          autoComplete="email"
          className="sm:col-span-2"
          {...fieldProps('email')}
        />
        <FormInput
          label="Address"
          autoComplete="street-address"
          className="sm:col-span-2"
          {...fieldProps('address')}
        />
        <FormInput
          label="City"
          autoComplete="address-level2"
          {...fieldProps('city')}
        />
        <FormInput
          label="Postcode"
          autoComplete="postal-code"
          {...fieldProps('postcode')}
        />
      </fieldset>

      <fieldset className={fieldsetClassName} disabled={isLoading}>
        <legend className={legendClassName}>Payment</legend>
        <FormInput
          label="Card number"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="4242 4242 4242 4242"
          hint={`Demo only. Any valid test card works; one ending in ${DECLINED_CARD_SUFFIX} is declined.`}
          className="sm:col-span-2"
          {...fieldProps('cardNumber')}
        />
        <FormInput
          label="Expiry (MM/YY)"
          inputMode="numeric"
          autoComplete="cc-exp"
          placeholder="12/30"
          {...fieldProps('expiry')}
        />
        <FormInput
          label="Security code"
          inputMode="numeric"
          autoComplete="cc-csc"
          placeholder="123"
          {...fieldProps('cvc')}
        />
      </fieldset>

      <div>
        {isError && (
          <p
            role="alert"
            className={`${typography.bodySmallRegular} mb-4 rounded-card bg-error-50 p-4 text-error-700`}
          >
            {getErrorMessage(
              error,
              'Payment failed. Your cart is unchanged. Please try again.'
            )}
          </p>
        )}
        <Button
          type="submit"
          size="lg"
          className="w-full"
          loading={isLoading}
          loadingText="Processing payment…"
        >
          Pay now
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
