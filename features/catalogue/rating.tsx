import { typography } from '@/styles/typography';

interface Props {
  value: number;
  count?: number;
}

const Rating = ({ value, count }: Props) => {
  const rounded = value.toFixed(1);
  return (
    <span
      className={`${typography.captionSmall} inline-flex items-center gap-1 text-grey-600`}
      aria-label={`Rated ${rounded} out of 5`}
    >
      <span aria-hidden className="text-warning-500">
        ★
      </span>
      {rounded}
      {count !== undefined && <span className="text-grey-400">({count})</span>}
    </span>
  );
};

export default Rating;
