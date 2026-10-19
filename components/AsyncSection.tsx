import { Suspense } from "react";
import { text } from "@/styles/typography";
import { SectionErrorBoundary } from "./SectionErrorBoundary";

export function AsyncSection({
  title,
  fallback,
  children,
}: {
  title: string;
  fallback: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={title} className="py-section">
      <h2 className={`${text.h2} mb-6`}>{title}</h2>
      <SectionErrorBoundary title={title}>
        <Suspense fallback={fallback}>{children}</Suspense>
      </SectionErrorBoundary>
    </section>
  );
}
