import Link from 'next/link';
import { buttonStyles } from '@/components/button';
import { Container, Footer, Header } from '@/components/layout';
import { typography } from '@/styles/typography';

const NotFound = () => {
  return (
    <>
      <Header />
      <main className="flex-1 py-section">
        <Container width="narrow" className="text-center">
          <p className={`${typography.bodySmallMedium} text-primary-600`}>
            404
          </p>
          <h1 className={`${typography.h3Semibold} mt-2`}>Page not found</h1>
          <p className={`${typography.bodyMediumRegular} mt-4 text-grey-500`}>
            The page or product you are looking for does not exist.
          </p>
          <Link href="/" className={`${buttonStyles()} mt-8`}>
            Back to the shop
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
