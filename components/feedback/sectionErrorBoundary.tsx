'use client';

import { catchError, type ErrorInfo } from 'next/error';
import ErrorState from './errorState';

interface Props {
  title: string;
}

const SectionError = ({ title }: Props, { retry }: ErrorInfo) => {
  return (
    <ErrorState
      title={`Couldn't load ${title.toLowerCase()}`}
      onRetry={retry}
    />
  );
};

export default catchError(SectionError);
