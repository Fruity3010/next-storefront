import { Skeleton } from '@/components/feedback';
import { SearchSkeleton } from '@/features/search/searchView';

const SearchLoading = () => {
  return (
    <div className="py-section">
      <Skeleton className="mb-6 h-9 w-32" />
      <SearchSkeleton />
    </div>
  );
};

export default SearchLoading;
