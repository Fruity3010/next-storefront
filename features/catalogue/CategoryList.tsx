import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { getCategories } from "@/lib/api";
import { text } from "@/styles/typography";

const tile = "flex h-20 items-center justify-center rounded-card p-4";
const grid = "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4";

export async function CategoryList() {
  const categories = await getCategories();

  if (categories.length === 0) {
    return <EmptyState title="No categories yet" />;
  }

  return (
    <ul className={grid}>
      {categories.map((category) => (
        <li key={category.slug}>
          <Link
            href={`/category/${category.slug}`}
            className={`${tile} ${text.label} bg-surface text-center transition-colors hover:bg-border`}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function CategoryListSkeleton({ count = 24 }: { count?: number }) {
  return (
    <div className={grid}>
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} className={tile} />
      ))}
    </div>
  );
}
