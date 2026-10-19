'use client';

import { RouteError } from '@/components/feedback';

interface Props {
  error: unknown;
  retry: () => void;
}

const CategoryError = (props: Props) => {
  return <RouteError {...props} message="We couldn't load this category." />;
};

export default CategoryError;
