'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { typography } from '@/styles/typography';
import {
  catalogueHref,
  SORT_OPTIONS,
  type SortKey
} from './catalogueSearchParams';

interface Props {
  value: SortKey;
}

const SortSelect = ({ value }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = event.target.value as SortKey;
    startTransition(() => {
      router.push(catalogueHref(pathname, { sort, page: 1 }), {
        scroll: false
      });
    });
  };

  return (
    <label className={`${typography.bodySmallMedium} flex items-center gap-2`}>
      Sort by
      <select
        key={value}
        defaultValue={value}
        onChange={handleChange}
        aria-busy={isPending}
        className="h-9 rounded-card border border-grey-200 bg-white px-3 aria-busy:opacity-60"
      >
        {Object.entries(SORT_OPTIONS).map(([key, option]) => (
          <option key={key} value={key}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SortSelect;
