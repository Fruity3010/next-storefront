import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Container } from "@/components/ui/Container";
import { text } from "@/styles/typography";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
        <Link href="/search" className={`${text.label} hover:text-primary`}>
          Search
        </Link>
      </Header>
      <main className="flex-1">
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
}
