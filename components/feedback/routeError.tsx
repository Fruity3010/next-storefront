'use client';

import { useEffect } from 'react';
import ErrorState from './errorState';

interface Props {
  error: unknown;
  retry: () => void;
  message: string;
}

const RouteError = ({ error, retry, message }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="py-section">
      <ErrorState message={message} onRetry={retry} />
    </div>
  );
};

export default RouteError;
