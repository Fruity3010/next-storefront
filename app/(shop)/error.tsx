"use client";

import { ErrorState } from "@/components/ErrorState";

export default function ShopError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <div className="py-section">
      <ErrorState message="We couldn't load this page. Please try again." onRetry={retry} />
    </div>
  );
}
