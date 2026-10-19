import type { APIErrorData } from '@/types/error';

function errorData(error: unknown): Partial<APIErrorData> {
  if (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data !== null
  ) {
    return error.data as Partial<APIErrorData>;
  }
  return {};
}

export function getErrorMessage(error: unknown, fallback: string) {
  return errorData(error).message ?? fallback;
}

export function getFieldErrors(error: unknown) {
  return errorData(error).fieldErrors ?? {};
}
