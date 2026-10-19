import { SITE_NAME } from "@/lib/site";
import { text } from "@/styles/typography";
import { Container } from "./ui/Container";

export function Footer() {
  return (
    <footer className="mt-section border-t border-border py-8">
      <Container>
        <p className={text.caption}>
          {SITE_NAME} is a demo storefront. Product data from DummyJSON.
        </p>
      </Container>
    </footer>
  );
}
