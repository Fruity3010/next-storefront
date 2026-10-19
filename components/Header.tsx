import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { text } from "@/styles/typography";
import { Container } from "./ui/Container";

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="border-b border-border">
      <Container className="flex h-16 items-center gap-6">
        <Link href="/" className={`${text.h3} mr-auto text-primary`}>
          {SITE_NAME}
        </Link>
        {children}
        <Link href="/cart" className={`${text.label} hover:text-primary`}>
          Cart
        </Link>
      </Container>
    </header>
  );
}
