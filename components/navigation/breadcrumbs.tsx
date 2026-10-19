import Link from 'next/link';
import { JsonLd } from '@/components/seo';
import { typography } from '@/styles/typography';
import {
  breadcrumbJsonLd,
  type BreadcrumbItem
} from '@/utilities/structuredData';

interface Props {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: Props) => {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <JsonLd data={breadcrumbJsonLd(items)} />
      <ol
        className={`${typography.bodySmallRegular} flex flex-wrap items-center gap-2 text-grey-500`}
      >
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {isCurrent ? (
                <span aria-current="page" className="text-grey-900">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="hover:text-primary-600">
                    {item.name}
                  </Link>
                  <span aria-hidden>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
