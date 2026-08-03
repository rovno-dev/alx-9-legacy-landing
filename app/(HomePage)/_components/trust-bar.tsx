import { Container } from "@/components/ui/container";

export default function TrustBar() {
  return (
    <section className="py-8 border-y border-(--outline) bg-(--card)">
      <Container>
        <p className="text-center text-xs font-heading font-semibold uppercase tracking-wider text-(--on-bg-low) mb-6">
          Нам доверяют
        </p>
        <div className="flex flex-wrap justify-center gap-8 opacity-70 hover:opacity-100 transition-opacity duration-500">
          {["vercel", "datadog", "cloudflare", "figma", "docker"].map((brand) => (
            <img key={brand} src={`https://cdn.simpleicons.org/${brand}/888888`} alt={brand} className="h-8 w-auto filter transition-all hover:brightness-150" />
          ))}
        </div>
      </Container>
    </section>
  );
}
