import Link from 'next/link';
import { buttonStyles } from '@/components/button';
import { typography } from '@/styles/typography';

interface Props {
  page: number;
  totalPages: number;
  hrefForPage: (page: number) => string;
}

const Pagination = ({ page, totalPages, hrefForPage }: Props) => {
  if (totalPages <= 1) return null;

  const linkClassName = buttonStyles({ color: 'grey', outline: true });
  const disabledClassName = `${linkClassName} pointer-events-none opacity-40`;

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-between gap-4"
    >
      {page > 1 ? (
        <Link href={hrefForPage(page - 1)} className={linkClassName}>
          Previous
        </Link>
      ) : (
        <span aria-disabled className={disabledClassName}>
          Previous
        </span>
      )}
      <p className={`${typography.bodySmallRegular} text-grey-500`}>
        Page {page} of {totalPages}
      </p>
      {page < totalPages ? (
        <Link href={hrefForPage(page + 1)} className={linkClassName}>
          Next
        </Link>
      ) : (
        <span aria-disabled className={disabledClassName}>
          Next
        </span>
      )}
    </nav>
  );
};

export default Pagination;
