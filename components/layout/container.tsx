const widths = {
  page: 'max-w-page',
  narrow: 'max-w-narrow'
} as const;

interface Props {
  width?: keyof typeof widths;
  className?: string;
  children: React.ReactNode;
}

const Container = ({ width = 'page', className = '', children }: Props) => {
  return (
    <div className={`mx-auto w-full px-gutter ${widths[width]} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
