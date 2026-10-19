import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Container } from "@/components/ui/Container";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 py-section">
        <Container width="narrow">{children}</Container>
      </main>
      <Footer />
    </>
  );
}
