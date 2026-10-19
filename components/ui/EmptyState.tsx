import { text } from "@/styles/typography";

export function EmptyState({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-card border border-dashed border-border p-section text-center">
      <p className={text.h3}>{title}</p>
      {children && <div className={`${text.bodySm} mt-2 text-muted`}>{children}</div>}
    </div>
  );
}
