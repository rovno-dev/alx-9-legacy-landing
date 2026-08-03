import { Container } from "@/components/ui/container";
import { CloudIcon, DiamondIcon, PublicIcon } from "@/components/icons";

export default function VenueSection() {
  return (
    <section className="py-20 md:py-28 bg-(--bg)" id="venue">
      <Container>
        <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wider text-(--primary) mb-4">
          Локация
        </span>
        <h2 className="text-display-3 md:text-display-2 font-heading text-(--on-bg-high) mb-6">
          Платформа 9
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="aspect-[16/9] rounded-xl overflow-hidden border border-(--outline) bg-(--card) flex items-center justify-center">
            <img src="https://picsum.photos/seed/platform9/800/450" alt="Локация" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-4">
            <h4 className="font-heading text-xl font-bold">Как добраться</h4>
            <p className="font-sans text-(--on-bg-medium)">Станция метро Платформа 9, ул. Примерная, д. 1</p>
            <div className="space-y-2 text-sm font-sans text-(--on-bg-medium)">
              <div className="flex items-center gap-3"><CloudIcon className="size-4 text-(--on-bg-low)" /> Метро: Платформа 9 – выход в город</div>
              <div className="flex items-center gap-3"><DiamondIcon className="size-4 text-(--on-bg-low)" /> Парковка: рядом с платформой (бесплатно)</div>
              <div className="flex items-center gap-3"><PublicIcon className="size-4 text-(--on-bg-low)" /> Такси: городской тариф до станции</div>
            </div>
            <div className="pt-4 border-t border-(--outline)">
              <h5 className="text-sm font-heading font-semibold uppercase tracking-wider text-(--on-bg-low) mb-3">Рядом</h5>
              <ul className="space-y-1 text-sm font-sans text-(--on-bg-medium)">
                <li>Арт-пространство «Цифра»</li>
                <li>Кафе «Лаборатория»</li>
                <li>Станция метро Платформа 9</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
