import { typography } from '@/styles/typography';

export interface FormInputProps extends React.ComponentProps<'input'> {
  label: string;
  name: string;
  error?: string;
  hint?: string;
}

const FormInput = ({
  label,
  name,
  error,
  hint,
  id,
  className = '',
  ...props
}: FormInputProps) => {
  const inputId = id ?? name;
  const messageId = `${inputId}-message`;
  const message = error ?? hint;

  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className={`${typography.bodySmallMedium} block`}
      >
        {label}
      </label>
      <input
        {...props}
        id={inputId}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={message ? messageId : undefined}
        className={`${typography.bodyMediumRegular} mt-1 h-11 w-full rounded-card border border-grey-300 bg-white px-3 outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100 aria-invalid:border-error-500`}
      />
      {message && (
        <p
          id={messageId}
          className={`${typography.captionSmall} mt-1 ${error ? 'text-error-700' : 'text-grey-500'}`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default FormInput;
