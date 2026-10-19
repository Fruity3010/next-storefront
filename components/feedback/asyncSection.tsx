import { Suspense } from 'react';
import { typography } from '@/styles/typography';
import SectionErrorBoundary from './sectionErrorBoundary';

interface Props {
  title: string;
  fallback: React.ReactNode;
  children: React.ReactNode;
}

const AsyncSection = ({ title, fallback, children }: Props) => {
  return (
    <section aria-label={title} className="py-section">
      <h2 className={`${typography.h4Semibold} mb-6`}>{title}</h2>
      <SectionErrorBoundary title={title}>
        <Suspense fallback={fallback}>{children}</Suspense>
      </SectionErrorBoundary>
    </section>
  );
};

export default AsyncSection;
