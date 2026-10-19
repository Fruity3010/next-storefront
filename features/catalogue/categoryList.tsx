import Link from 'next/link';
import { EmptyState, Skeleton } from '@/components/feedback';
import { getCategories } from '@/lib/api';
import { typography } from '@/styles/typography';

const tileClassName = 'flex h-20 items-center justify-center rounded-card p-4';
const gridClassName = 'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4';

export const CategoryList = async () => {
  const categories = await getCategories();

  if (categories.length === 0) {
    return <EmptyState title="No categories yet" />;
  }

  return (
    <ul className={gridClassName}>
      {categories.map(category => (
        <li key={category.slug}>
          <Link
            href={`/category/${category.slug}`}
            className={`${tileClassName} ${typography.bodySmallMedium} bg-grey-50 text-center transition-colors hover:bg-grey-200`}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

interface SkeletonProps {
  count?: number;
}

export const CategoryListSkeleton = ({ count = 24 }: SkeletonProps) => {
  return (
    <div className={gridClassName}>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} className={tileClassName} />
      ))}
    </div>
  );
};
