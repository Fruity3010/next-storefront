import { text } from "@/styles/typography";

const variants = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  secondary: "border border-border bg-background hover:bg-surface",
} as const;

export function buttonStyles(variant: keyof typeof variants = "primary") {
  return `${text.label} ${variants[variant]} inline-flex h-11 items-center justify-center gap-2 rounded-card px-5 transition-colors disabled:cursor-not-allowed disabled:opacity-60`;
}

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: keyof typeof variants;
  pending?: boolean;
  pendingLabel?: string;
};

export function Button({
  variant,
  pending = false,
  pendingLabel,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || pending}
      aria-busy={pending}
      className={`${buttonStyles(variant)} ${className}`}
    >
      {pending && pendingLabel ? pendingLabel : children}
    </button>
  );
}
