import { Container } from "@/components/ui/container";

export default function SponsorsSection() {
  const groups = [
    { tier: "Платиновые", logos: ["Vercel", "Datadog", "Stripe"] },
    { tier: "Золотые", logos: ["Linear", "Notion", "Sentry", "Figma"] },
    { tier: "Серебряные", logos: ["ESLint", "Prisma", "PlanetScale"] },
    { tier: "Информационные", logos: ["TechCrunch", "CSS-Tricks", "Smashing Mag", "Frontend Masters"] },
  ];

  return (
    <section className="py-10 md:py-16 bg-(--card)" id="sponsors">
      <Container>
        <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wider text-(--primary) mb-4">Партнёры</span>
        <h2 className="text-display-3 md:text-display-2 font-heading text-(--on-bg-high) mb-4">Проект поддерживают</h2>
        <p className="text-body-2 font-sans text-(--on-bg-medium) max-w-2xl mb-6">Организации, которые делают это событие возможным.</p>
        {groups.map((group) => (
          <div key={group.tier} className="mb-8 last:mb-0">
            <h4 className="text-sm font-heading font-semibold uppercase tracking-wider text-(--on-bg-low) mb-4 border-b border-(--outline) pb-2">{group.tier}</h4>
            <div className="flex flex-wrap gap-4">
              {group.logos.map((logo) => (
                <span key={logo} className="h-10 px-6 rounded border border-(--outline) bg-(--bg) flex items-center font-heading text-sm text-(--on-bg-low)">{logo}</span>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
