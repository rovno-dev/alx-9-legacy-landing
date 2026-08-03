import { Container } from "@/components/ui/container";

export default function AboutSection() {
  return (
    <section className="py-10 md:py-16 bg-(--bg)" id="about">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wider text-(--primary) mb-4">
              Концепция
            </span>
            <h2 className="text-display-3 md:text-display-2 font-heading text-(--on-bg-high) mb-6">
              Кибернетический организм
            </h2>
            <div className="space-y-4 font-sans text-(--on-bg-medium) leading-relaxed">
              <p>
                В основе ALX-9 лежит <strong>кибернетический организм</strong>, созданный на стыке биомиметики и машинного обучения. Посетитель не просто наблюдает — он взаимодействует с живой нейросетью, управляющей светом и звуком через движение и пульс.
              </p>
              <p>
                Это исследование границ между человеком и машиной, воплощённое в пространственной инсталляции.</p>
            </div>
          </div>
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-(--outline) shadow-md">
            <img
              src="/home-page/alx-card.png"
              alt="Кибернетическая архитектура ALX-9"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
