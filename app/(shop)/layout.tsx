import { Container, Footer, Header } from '@/components/layout';

interface Props {
  children: React.ReactNode;
}

const ShopLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
};

export default ShopLayout;
