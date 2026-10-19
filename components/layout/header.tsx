import Link from 'next/link';
import CartLink from '@/features/cart/cartLink';
import { typography } from '@/styles/typography';
import { SITE_NAME } from '@/utilities/environment';
import Container from './container';

interface Props {
  showSearch?: boolean;
}

const Header = ({ showSearch = true }: Props) => {
  return (
    <header className="border-b border-grey-200">
      <Container className="flex h-16 items-center gap-6 pr-8">
        <Link
          href="/"
          className={`${typography.h6Semibold} mr-auto text-primary-600`}
        >
          {SITE_NAME}
        </Link>
        {showSearch && (
          <Link
            href="/search"
            className={`${typography.bodySmallMedium} hover:text-primary-600`}
          >
            Search
          </Link>
        )}
        <CartLink />
      </Container>
    </header>
  );
};

export default Header;
