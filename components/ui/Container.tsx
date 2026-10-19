const widths = { page: "max-w-page", narrow: "max-w-narrow" } as const;

export function Container({
  width = "page",
  className = "",
  children,
}: {
  width?: keyof typeof widths;
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`mx-auto w-full px-gutter ${widths[width]} ${className}`}>{children}</div>;
}
