"use client";

import { catchError, type ErrorInfo } from "next/error";
import { ErrorState } from "./ErrorState";

function SectionError({ title }: { title: string }, { retry }: ErrorInfo) {
  return <ErrorState title={`Couldn't load ${title.toLowerCase()}`} onRetry={retry} />;
}

export const SectionErrorBoundary = catchError(SectionError);
