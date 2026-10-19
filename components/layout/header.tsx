import Link from 'next/link';
import { typography } from '@/styles/typography';
import { SITE_NAME } from '@/utilities/environment';
import Container from './container';

interface Props {
  children?: React.ReactNode;
}

const Header = ({ children }: Props) => {
  return (
    <header className="border-b border-grey-200">
      <Container className="flex h-16 items-center gap-6">
        <Link
          href="/"
          className={`${typography.h6Semibold} mr-auto text-primary-600`}
        >
          {SITE_NAME}
        </Link>
        {children}
        <Link
          href="/cart"
          className={`${typography.bodySmallMedium} hover:text-primary-600`}
        >
          Cart
        </Link>
      </Container>
    </header>
  );
};

export default Header;
