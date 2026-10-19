import { Button } from '@/components/button';
import { typography } from '@/styles/typography';

interface Props {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({
  title = 'Something went wrong',
  message,
  onRetry
}: Props) => {
  return (
    <div
      role="alert"
      className="rounded-card bg-error-50 p-section text-center"
    >
      <p className={`${typography.h6Semibold} text-error-700`}>{title}</p>
      {message && (
        <p className={`${typography.bodySmallRegular} mt-2 text-grey-500`}>
          {message}
        </p>
      )}
      {onRetry && (
        <Button color="grey" outline onClick={onRetry} className="mt-4">
          Try again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
