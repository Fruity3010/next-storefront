import { typography } from '@/styles/typography';

interface Props {
  title: string;
  children?: React.ReactNode;
}

const EmptyState = ({ title, children }: Props) => {
  return (
    <div className="rounded-card border border-dashed border-grey-200 p-section text-center">
      <p className={typography.h6Semibold}>{title}</p>
      {children && (
        <div className={`${typography.bodySmallRegular} mt-2 text-grey-500`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
