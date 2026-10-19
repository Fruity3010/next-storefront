'use client';

import { RouteError } from '@/components/feedback';

interface Props {
  error: unknown;
  retry: () => void;
}

const SearchError = (props: Props) => {
  return <RouteError {...props} message="We couldn't load search." />;
};

export default SearchError;
