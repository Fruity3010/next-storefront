import Link from 'next/link';
import { Container, Footer, Header } from '@/components/layout';
import { typography } from '@/styles/typography';

interface Props {
  children: React.ReactNode;
}

const ShopLayout = ({ children }: Props) => {
  return (
    <>
      <Header>
        <Link
          href="/search"
          className={`${typography.bodySmallMedium} hover:text-primary-600`}
        >
          Search
        </Link>
      </Header>
      <main className="flex-1">
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
};

export default ShopLayout;
