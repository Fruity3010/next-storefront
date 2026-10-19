import { AsyncSection } from '@/components/feedback';
import { CategoryList, CategoryListSkeleton } from '@/features/catalogue';
import { typography } from '@/styles/typography';

const HomePage = () => {
  return (
    <>
      <section className="py-section">
        <h1 className={`${typography.display02Bold} max-w-2xl`}>
          Everyday essentials, delivered.
        </h1>
        <p
          className={`${typography.bodyLargeRegular} mt-4 max-w-xl text-grey-500`}
        >
          Browse beauty, groceries, electronics and more across two dozen
          categories.
        </p>
      </section>
      <AsyncSection
        title="Shop by category"
        fallback={<CategoryListSkeleton />}
      >
        <CategoryList />
      </AsyncSection>
    </>
  );
};

export default HomePage;
