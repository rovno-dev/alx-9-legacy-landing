import { Container } from "@/components/ui/container";
import { FAQItem } from "./shared";

export default function FAQSection() {
  return (
    <section className="py-10 md:py-16 bg-(--card)" id="faq">
      <Container>
        <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wider text-(--primary) mb-4">Часто задаваемые вопросы</span>
        <h2 className="text-display-3 md:text-display-2 font-heading text-(--on-bg-high) mb-4">Быстрые ответы на частые вопросы</h2>
        <p className="text-body-2 font-sans text-(--on-bg-medium) max-w-2xl mb-6">Что нужно знать перед посещением.</p>
        <div className="">
          <FAQItem question="Что входит в билет?" answer="Все билеты включают вход на инсталляцию, доступ к экспозиции и авторскому гиду. VIP-билеты дополнительно дают доступ к VR-зоне и эксклюзивный мерч." defaultOpen />
          <FAQItem question="Можно ли вернуть билет?" answer="Возврат возможен за 48 часов до начала мероприятия. Перенос на другое время обсуждается индивидуально." />
          <FAQItem question="Доступна ли локация для людей с ограниченными возможностями?" answer="Да, площадка полностью адаптирована: есть пандусы, лифты и специальные зоны для комфортного перемещения." />
          <FAQItem question="Есть ли дресс-код?" answer="Форма одежды свободная. Рекомендуем комфортную одежду, так как мероприятие включает активные VR-опыты." />
          <FAQItem question="Будет ли запись мероприятия?" answer="Да, мы планируем запись видео и фотографий. Ссылки на материалы будут отправлены всем посетителям после мероприятия." />
          <FAQItem question="Как связаться с организаторами?" answer="Напишите нам по электронной почте: hello@alx9.fakeproj.com или используйте форму обратной связи на сайте." />
        </div>
      </Container>
    </section>
  );
}
