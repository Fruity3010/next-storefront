import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchView, { SearchSkeleton } from '@/features/search/searchView';
import { typography } from '@/styles/typography';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search the full product catalogue.',
  alternates: { canonical: '/search' },
  robots: { index: false, follow: true }
};

const SearchPage = () => {
  return (
    <div className="py-section">
      <h1 className={`${typography.h3Semibold} mb-6`}>Search</h1>
      <Suspense fallback={<SearchSkeleton />}>
        <SearchView />
      </Suspense>
    </div>
  );
};

export default SearchPage;
