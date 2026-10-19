import { typography } from '@/styles/typography';
import { SITE_NAME } from '@/utilities/environment';
import Container from './container';

const Footer = () => {
  return (
    <footer className="mt-section border-t border-grey-200 py-8">
      <Container>
        <p className={`${typography.captionSmall} text-grey-500`}>
          {SITE_NAME} is a demo storefront. Product data from DummyJSON.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
