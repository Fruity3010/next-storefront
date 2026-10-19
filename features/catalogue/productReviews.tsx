import { EmptyState } from '@/components/feedback';
import { typography } from '@/styles/typography';
import type { ReviewApiData } from '@/types/product';
import Rating from './rating';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeZone: 'UTC'
});

interface Props {
  reviews: ReviewApiData[];
}

const ProductReviews = ({ reviews }: Props) => {
  return (
    <section aria-label="Reviews" className="py-section">
      <h2 className={`${typography.h4Semibold} mb-6`}>Reviews</h2>
      {reviews.length === 0 ? (
        <EmptyState title="No reviews yet" />
      ) : (
        <ul className="grid gap-4 md:grid-cols-3">
          {reviews.map(review => (
            <li
              key={`${review.reviewerName}-${review.date}-${review.comment}`}
              className="rounded-card border border-grey-200 p-5"
            >
              <Rating value={review.rating} />
              <p className={`${typography.bodyMediumRegular} mt-2`}>
                {review.comment}
              </p>
              <p className={`${typography.captionSmall} mt-3 text-grey-500`}>
                {review.reviewerName} ·{' '}
                {dateFormatter.format(new Date(review.date))}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProductReviews;
