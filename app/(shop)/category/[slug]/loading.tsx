import { Skeleton } from '@/components/feedback';
import { CategoryResultsSkeleton } from '@/features/catalogue/categoryResults';

const CategoryLoading = () => {
  return (
    <>
      <div className="py-4">
        <Skeleton className="h-5 w-40" />
      </div>
      <Skeleton className="mb-8 h-9 w-56" />
      <CategoryResultsSkeleton />
    </>
  );
};

export default CategoryLoading;
