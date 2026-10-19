import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Breadcrumbs } from '@/components/navigation';
import CategoryResults, {
  CategoryResultsSkeleton
} from '@/features/catalogue/categoryResults';
import {
  catalogueHref,
  DEFAULT_SORT,
  parseCatalogueParams
} from '@/features/catalogue/catalogueSearchParams';
import { getCategories, getCategory } from '@/lib/api';
import { typography } from '@/styles/typography';

type Props = PageProps<'/category/[slug]'>;

async function loadCategory(params: Props['params']) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();
  return category;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map(category => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
  searchParams
}: Props): Promise<Metadata> {
  const category = await loadCategory(params);
  const { page } = parseCatalogueParams(await searchParams);
  const canonical = catalogueHref(`/category/${category.slug}`, {
    sort: DEFAULT_SORT,
    page
  });
  const title = page > 1 ? `${category.name} – Page ${page}` : category.name;
  const description = `Shop ${category.name.toLowerCase()} at great prices with fast delivery.`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical }
  };
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  const category = await loadCategory(params);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: category.name, href: `/category/${category.slug}` }
        ]}
      />
      <h1 className={`${typography.h3Semibold} mb-8`}>{category.name}</h1>
      <Suspense fallback={<CategoryResultsSkeleton />}>
        <CategoryResults slug={category.slug} searchParams={searchParams} />
      </Suspense>
    </>
  );
};

export default CategoryPage;
