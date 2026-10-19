import { Container, Footer, Header } from '@/components/layout';

interface Props {
  children: React.ReactNode;
}

const CheckoutLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="flex-1 py-section">
        <Container width="narrow">{children}</Container>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutLayout;
