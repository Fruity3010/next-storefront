import { AsyncSection } from "@/components/AsyncSection";
import { CategoryList, CategoryListSkeleton } from "@/features/catalogue/CategoryList";
import { text } from "@/styles/typography";

export default function HomePage() {
  return (
    <>
      <section className="py-section">
        <h1 className={`${text.display} max-w-2xl`}>Everyday essentials, delivered.</h1>
        <p className={`${text.body} mt-4 max-w-xl text-muted`}>
          Browse beauty, groceries, electronics and more across two dozen categories.
        </p>
      </section>
      <AsyncSection title="Shop by category" fallback={<CategoryListSkeleton />}>
        <CategoryList />
      </AsyncSection>
    </>
  );
}
