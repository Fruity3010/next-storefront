import { text } from "@/styles/typography";
import { Button } from "./ui/Button";

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div role="alert" className="rounded-card bg-danger-surface p-section text-center">
      <p className={`${text.h3} text-danger`}>{title}</p>
      {message && <p className={`${text.bodySm} mt-2 text-muted`}>{message}</p>}
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} className="mt-4">
          Try again
        </Button>
      )}
    </div>
  );
}
