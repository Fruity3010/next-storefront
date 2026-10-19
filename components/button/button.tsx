import { typography } from '@/styles/typography';

const solid = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700',
  grey: 'bg-grey-100 text-grey-900 hover:bg-grey-200',
  error: 'bg-error-500 text-white hover:bg-error-700'
} as const;

const outlined = {
  primary: 'border border-primary-600 text-primary-600 hover:bg-primary-50',
  grey: 'border border-grey-200 text-grey-900 hover:bg-grey-50',
  error: 'border border-error-500 text-error-500 hover:bg-error-50'
} as const;

const sizes = {
  sm: 'h-9 px-3',
  md: 'h-11 px-5',
  lg: 'h-12 px-6'
} as const;

export type ButtonColor = keyof typeof solid;
export type ButtonSize = keyof typeof sizes;

export interface ButtonStyleOptions {
  color?: ButtonColor;
  outline?: boolean;
  size?: ButtonSize;
}

export function buttonStyles({
  color = 'primary',
  outline = false,
  size = 'md'
}: ButtonStyleOptions = {}) {
  const variant = outline ? outlined[color] : solid[color];
  return `${typography.bodySmallMedium} ${variant} ${sizes[size]} inline-flex items-center justify-center gap-2 rounded-card transition-colors disabled:cursor-not-allowed disabled:opacity-60`;
}

export interface ButtonProps
  extends Omit<React.ComponentProps<'button'>, 'color'>, ButtonStyleOptions {
  loading?: boolean;
  loadingText?: string;
}

const Button = ({
  color,
  outline,
  size,
  loading = false,
  loadingText,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`${buttonStyles({ color, outline, size })} ${className}`}
    >
      {loading && loadingText ? loadingText : children}
    </button>
  );
};

export default Button;
