'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EmptyState, ErrorState } from '@/components/feedback';
import ProductGrid, {
  ProductGridSkeleton
} from '@/features/catalogue/productGrid';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useSearchProductsQuery } from '@/store/api/searchApi';
import { typography } from '@/styles/typography';

export const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 300;

const SearchView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [input, setInput] = useState(searchParams.get('q') ?? '');
  const query = useDebouncedValue(input.trim(), DEBOUNCE_MS);
  const shouldSearch = query.length >= MIN_QUERY_LENGTH;

  const { currentData, isFetching, isError, refetch } = useSearchProductsQuery(
    query,
    { skip: !shouldSearch }
  );

  useEffect(() => {
    const url = query ? `${pathname}?q=${encodeURIComponent(query)}` : pathname;
    window.history.replaceState(null, '', url);
  }, [pathname, query]);

  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Search products
      </label>
      <input
        id="search"
        type="search"
        value={input}
        onChange={event => setInput(event.target.value)}
        placeholder="Search for phones, perfume, sofas…"
        autoComplete="off"
        autoFocus
        className={`${typography.bodyLargeRegular} h-14 w-full rounded-card border border-grey-300 px-4 outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100`}
      />
      <div aria-live="polite" className="mt-8">
        <SearchResults
          query={query}
          shouldSearch={shouldSearch}
          isFetching={isFetching}
          isError={isError}
          onRetry={refetch}
          data={currentData}
        />
      </div>
    </div>
  );
};

interface ResultsProps {
  query: string;
  shouldSearch: boolean;
  isFetching: boolean;
  isError: boolean;
  onRetry: () => void;
  data: ReturnType<typeof useSearchProductsQuery>['currentData'];
}

const SearchResults = ({
  query,
  shouldSearch,
  isFetching,
  isError,
  onRetry,
  data
}: ResultsProps) => {
  if (!shouldSearch) {
    return (
      <p className={`${typography.bodyMediumRegular} text-grey-500`}>
        Type at least {MIN_QUERY_LENGTH} characters to search.
      </p>
    );
  }
  if (isError) {
    return <ErrorState title="Search is unavailable" onRetry={onRetry} />;
  }
  if (isFetching || !data) {
    return <ProductGridSkeleton count={8} />;
  }
  if (data.products.length === 0) {
    return (
      <EmptyState title={`No results for “${query}”`}>
        Try a different word, or browse by category from the home page.
      </EmptyState>
    );
  }
  return (
    <>
      <p className={`${typography.bodySmallRegular} mb-6 text-grey-500`}>
        {data.total} {data.total === 1 ? 'result' : 'results'} for “{query}”
      </p>
      <ProductGrid products={data.products} />
    </>
  );
};

export const SearchSkeleton = () => {
  return (
    <>
      <div className="h-14 rounded-card border border-grey-300" />
      <div className="mt-8">
        <ProductGridSkeleton count={8} />
      </div>
    </>
  );
};

export default SearchView;
