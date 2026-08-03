import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

export default function TestimonialsSection() {
  const testimonials = [
    { quote: "Этот проект перевернул моё представление о современном искусстве. Погружение в VR было фантастическим.", name: "Екатерина Иванова", role: "Куратор выставок", year: "2030" },
    { quote: "Технологии здесь служат искусству, а не наоборот. Ощущение, что ты попадаешь в другой мир.", name: "Дмитрий Петров", role: "Инженер-программист", year: "2030" },
    { quote: "Эмоции непередаваемые. ALX-9 — это действительно встреча с чем-то новым. Спасибо команде!", name: "Анастасия Смирнова", role: "Арт-директор", year: "2030" },
  ];

  return (
    <section className="py-20 md:py-28 bg-(--bg)" id="testimonials">
      <Container>
        <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wider text-(--primary) mb-4">Отзывы</span>
        <h2 className="text-display-3 md:text-display-2 font-heading text-(--on-bg-high) mb-6">Что говорят посетители</h2>
        <p className="text-body-2 font-sans text-(--on-bg-medium) max-w-2xl mb-8">Реальные голоса из сообщества.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="p-6 border-(--outline)">
              <div className="flex gap-1 mb-4 text-(--warning)">{Array(5).fill(0).map((_, i) => <span key={i}>★</span>)}</div>
              <p className="font-sans text-(--on-bg-medium) italic mb-6">“{t.quote}”</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-(--bg) flex items-center justify-center text-sm font-heading font-bold">
                  <img src={`https://picsum.photos/seed/${t.name.replace(/\s/g, "")}/100/100`} alt={t.name} className="w-full h-full rounded-full object-cover" />
                </div>
                <div>
                  <div className="font-heading font-semibold text-sm">{t.name}</div>
                  <div className="text-xs font-sans text-(--on-bg-low)">{t.role}</div>
                  <div className="text-xs font-heading text-(--primary) mt-0.5">Посетил в {t.year}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
