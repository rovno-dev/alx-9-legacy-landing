import { Container } from "@/components/ui/container";

export default function AboutSection() {
  return (
    <section className="py-20 md:py-28 bg-(--bg)" id="about">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wider text-(--primary) mb-4">
              Концепция
            </span>
            <h2 className="text-display-3 md:text-display-2 font-heading text-(--on-bg-high) mb-6">
              Среда, где каждый становится соавтором
            </h2>
            <div className="space-y-4 font-sans text-(--on-bg-medium) leading-relaxed">
              <p>
                <strong>CUZOI ALX-9</strong> — это аудиовизуальная среда, в которой посетитель становится соавтором. С помощью сенсоров и алгоритмов реального времени пространство реагирует на движение, создавая уникальный цифровой ландшафт.
              </p>
              <p>
                Проект был реализован в 2030 году при поддержке фонда современного искусства.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-(--outline) shadow-md">
            <img src="https://picsum.photos/seed/cuzoi-concept/800/600" alt="Концепция инсталляции" className="w-full h-full object-cover" />
          </div>
        </div>
      </Container>
    </section>
  );
}
