import { Pagination } from '@/components/navigation';
import { getCategoryProducts } from '@/lib/api';
import { typography } from '@/styles/typography';
import {
  catalogueHref,
  PAGE_SIZE,
  parseCatalogueParams,
  toProductListQuery
} from './catalogueSearchParams';
import ProductGrid, { ProductGridSkeleton } from './productGrid';
import SortSelect from './sortSelect';
import { Skeleton } from '@/components/feedback';

const toolbarClassName = 'mb-6 flex h-9 items-center justify-between gap-4';

interface Props {
  slug: string;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const CategoryResults = async ({ slug, searchParams }: Props) => {
  const params = parseCatalogueParams(await searchParams);
  const { products, total, skip } = await getCategoryProducts(
    slug,
    toProductListQuery(params)
  );
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const pathname = `/category/${slug}`;

  return (
    <>
      <div className={toolbarClassName}>
        <p className={`${typography.bodySmallRegular} text-grey-500`}>
          {products.length > 0
            ? `Showing ${skip + 1}–${skip + products.length} of ${total}`
            : `${total} products`}
        </p>
        <SortSelect value={params.sort} />
      </div>
      <ProductGrid
        products={products}
        eagerCount={4}
        emptyTitle="No products on this page"
      />
      <Pagination
        page={params.page}
        totalPages={totalPages}
        hrefForPage={page => catalogueHref(pathname, { ...params, page })}
      />
    </>
  );
};

export const CategoryResultsSkeleton = () => {
  return (
    <>
      <div className={toolbarClassName}>
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-9 w-56" />
      </div>
      <ProductGridSkeleton count={PAGE_SIZE} />
    </>
  );
};

export default CategoryResults;
