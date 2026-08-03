"use client";

import { useState, useEffect, useMemo } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import Link from "next/link";
import {
  CheckCircleIcon,
  CloseSmallIcon,
  PublicIcon,
  ArticleIcon,
  DeployedCodeIcon,
  DiamondIcon,
  CloudIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowRightIcon
} from "@/components/icons";
import LogotypeIcon from "@/components/layout/logotype/logotype-icon";
import {
  TelegramLogotypeMonoIcon,
  VKLogotypeMonoIcon,
  DprofileLogotypeMonoIcon,
} from "@/components/icons";

// ============================================================
// КОНФЕТТИ ДЛЯ МОДАЛЬНОГО ОКНА
// ============================================================
function Confetti({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active) return;
  }, [active]);

  if (!active) return null;

  const pieces = Array.from({ length: 150 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: ['#ff0', '#0ff', '#f0f', '#0f0', '#00f', '#f00', '#ff8800', '#ff4488'][Math.floor(Math.random() * 8)],
    delay: Math.random() * 2,
    size: Math.random() * 8 + 4,
    rotate: Math.random() * 360,
    duration: 2 + Math.random() * 3,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {pieces.map((item) => (
        <div
          key={item.id}
          className="absolute top-0"
          style={{
            left: `${item.left}%`,
            backgroundColor: item.color,
            width: `${item.size}px`,
            height: `${item.size * 1.5}px`,
            animation: `confetti-fall ${item.duration}s linear ${item.delay}s forwards`,
            transform: `rotate(${item.rotate}deg)`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ============================================================
// МОДАЛЬНОЕ ОКНО ПОКУПКИ БИЛЕТА
// ============================================================
function TicketModal({ open, onClose, ticketName }: { open: boolean, onClose: () => void, ticketName: string | null }) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (open) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!open) return null;

  return (
    <>
      <Confetti active={showConfetti} />
      <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center relative shadow-2xl border-2 border-(--primary)">
          <button onClick={onClose} className="absolute top-4 right-4 text-(--on-bg-low) hover:text-(--on-bg-high) transition-colors">
            <CloseSmallIcon className="size-6" />
          </button>
          <div className="flex justify-center mb-4">
            <div className="size-16 rounded-full bg-(--primary)/10 flex items-center justify-center text-4xl animate-pulse">
              🚀
            </div>
          </div>
          <h3 className="font-heading text-2xl font-bold mb-2 text-(--on-bg-high)">Билет приобретён!</h3>
          <p className="font-sans text-(--on-bg-medium) text-sm mb-6">
            Вы успешно зарезервировали билет на <span className="font-semibold text-(--primary)">{ticketName}</span>.<br />
            Детали отправлены на вашу почту.
          </p>
          <Button variant="filled" className="w-full" onClick={onClose}>
            Отлично, спасибо!
          </Button>
        </Card>
      </div>
    </>
  );
}

// ============================================================
// ТАЙМЕР ОБРАТНОГО ОТСЧЁТА
// ============================================================
function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-4 mt-8 pt-8 border-t border-(--outline)">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="text-3xl font-heading font-bold tracking-tight text-(--on-bg-high) tabular-nums">
            {String(value).padStart(2, "0")}
          </div>
          <div className="text-xs uppercase tracking-wider text-(--on-bg-low) mt-1">
            {unit === "days" && "Дней"}
            {unit === "hours" && "Часов"}
            {unit === "minutes" && "Минут"}
            {unit === "seconds" && "Секунд"}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// АККОРДЕОН FAQ
// ============================================================
function FAQItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-(--outline) first:border-t">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full py-5 text-left font-heading text-base font-semibold text-(--on-bg-high) hover:text-(--primary) transition-colors"
      >
        {question}
        <span className="transition-transform">
          {open ? <CloseSmallIcon className="size-4" /> : <span className="text-2xl">+</span>}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 pb-5" : "max-h-0"
          }`}
      >
        <p className="text-sm font-sans text-(--on-bg-medium) leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

// ============================================================
// ГЛАВНАЯ СТРАНИЦА
// ============================================================
export default function HomePage() {
  const [activeScheduleTab, setActiveScheduleTab] = useState("1");
  const [eventFilter, setEventFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyTicket = (tierName: string) => {
    setSelectedTicket(tierName);
    setIsModalOpen(true);
  };

  const eventActivities = useMemo(
    () => [
      { title: "Встреча с Чужим будущего", description: "Уникальный интерактивный опыт в окружении кибернетического Чужого.", category: "experience", image: "https://picsum.photos/seed/alx9/400/500" },
      { title: "Демонстрация технологий", description: "Живые сенсоры и алгоритмы реального времени, управляющие светом и звуком.", category: "demo", image: "https://picsum.photos/seed/alx9-tech/400/500" },
      { title: "Иммерсивные VR-опыты", description: "Погружение в цифровой ландшафт через шлем виртуальной реальности.", category: "vr", image: "https://picsum.photos/seed/alx9-vr/400/500" },
      { title: "Арт-зона", description: "«Фантастика глазами науки» — экспозиция цифрового искусства и инженерии.", category: "art", image: "https://picsum.photos/seed/alx9-art/400/500" },
    ], []
  );

  const filteredActivities = eventFilter === "all" ? eventActivities : eventActivities.filter((a) => a.category === eventFilter);

  const scheduleData: Record<string, { time: string; label: string; title: string; location: string; tag: string }[]> = {
    '1': [
      { time: '19:00', label: 'Открытие', title: 'Встреча с авторами и презентация ALX-9', location: 'Главный зал', tag: 'Демонстрация' },
      { time: '20:00', label: 'Технологии', title: 'Живой показ сенсорных алгоритмов', location: 'Лаборатория', tag: 'Технологии' },
      { time: '21:30', label: 'Погружение', title: 'Иммерсивный VR-опыт в киберпространстве', location: 'VR-зона', tag: 'VR-опыт' },
    ],
    '2': [
      { time: '19:00', label: 'Арт-зона', title: 'Фантастика глазами науки: экскурсия', location: 'Выставочный зал', tag: 'Искусство' },
      { time: '20:00', label: 'Панель', title: 'Дискуссия о футуризме и цифровой культуре', location: 'Зал дискуссий', tag: 'Панель' },
      { time: '21:30', label: 'Вопросы', title: 'Сессия Q&A с создателями инсталляции', location: 'Лаборатория', tag: 'Q&A' },
    ],
    '3': [
      { time: '19:00', label: 'Финал', title: 'Заключительное шоу и интерактив', location: 'Главный зал', tag: 'Шоу' },
      { time: '20:30', label: 'Свобода', title: 'Свободное посещение всех зон', location: 'Весь комплекс', tag: 'Свободный' },
    ]
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[calc(100dvh-70px)] flex items-center py-8 md:py-16 overflow-hidden border-b border-(--outline)">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(51,109,255,0.08),transparent_70%)]" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_70%_80%,rgba(51,109,255,0.06),transparent_70%)]" />
        </div>

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-(--outline) bg-(--card) text-xs font-medium text-(--on-bg-low)">
                <Badge variant="glass-static" size="chip-small" className="font-heading">2030</Badge>
                <span className="font-sans">Выставочный проект</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight tracking-tight">
                CUZOI <span className="text-(--primary)">ALX-9</span>
              </h1>
              <p className="text-lg md:text-xl font-sans text-(--on-bg-medium) leading-relaxed max-w-lg">
                Интерактивная аудиовизуальная инсталляция на стыке искусства и технологий. Представлена на международной выставке современного искусства.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="filled" size="large" className="font-heading">
                  <Link href="#event">Узнать больше</Link>
                </Button>
                <Button asChild variant="outlined" size="large" className="font-heading">
                  <Link href="#tickets">Купить билет</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-(--outline) bg-(--card) font-sans text-sm">
                  <ArticleIcon className="size-4" />
                  28 февраля 2030
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-(--outline) bg-(--card) font-sans text-sm">
                  <PublicIcon className="size-4" />
                  Платформа 9
                </span>
              </div>
              <Countdown targetDate={new Date("February 28, 2030 19:00:00 GMT+2")} />
            </div>
            <div className="relative flex justify-center items-center">
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-(--outline) shadow-lg bg-(--card)">
                <img src="https://picsum.photos/seed/cuzoi-hero/800/600" alt="CUZOI ALX-9 визуализация" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== TRUST BAR (С НАСТОЯЩИМИ ЛОГОТИПАМИ) ===== */}
      <section className="py-12 border-y border-(--outline) bg-(--card)">
        <Container>
          <p className="text-center text-xs font-heading font-semibold uppercase tracking-wider text-(--on-bg-low) mb-6">
            Нам доверяют
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-70 hover:opacity-100 transition-opacity duration-500">
            {["vercel", "datadog", "cloudflare", "openai", "figma", "docker"].map((brand) => (
              <img key={brand} src={`https://cdn.simpleicons.org/${brand}/888888`} alt={brand} className="h-8 w-auto filter transition-all hover:brightness-150" />
            ))}
          </div>
        </Container>
      </section>

      {/* ===== КОНЦЕПЦИЯ ===== */}
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

      {/* ===== ЧТО ЖДЕТ НА МЕРОПРИЯТИИ ===== */}
      <section className="py-20 md:py-28 bg-(--card)" id="event">
        <Container>
          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wider text-(--primary) mb-4">
            {`{ ЧТО ЖДЕТ НА МЕРОПРИЯТИИ }`}
          </span>
          <h2 className="text-display-3 md:text-display-2 font-heading text-(--on-bg-high) mb-6">
            Погрузитесь в будущее
          </h2>
          <p className="text-body-2 font-sans text-(--on-bg-medium) max-w-2xl mb-8">
            Интерактивные зоны, знакомство с кибернетическим Чужим и иммерсивные опыты.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {["all", "experience", "demo", "vr", "art"].map((filter) => (
              <button
                key={filter}
                onClick={() => setEventFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-heading font-medium transition-colors ${eventFilter === filter ? "bg-(--primary) text-white" : "bg-(--bg) text-(--on-bg-low) hover:bg-(--state-hover)"
                  }`}
              >
                {filter === "all" && "Все"}
                {filter === "experience" && "Встреча"}
                {filter === "demo" && "Технологии"}
                {filter === "vr" && "VR-опыты"}
                {filter === "art" && "Арт-зона"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredActivities.map((activity, idx) => (
              <Card key={idx} className="p-0 overflow-hidden border-(--outline) hover:shadow-lg transition-shadow group">
                <div className="aspect-[4/5] relative">
                  <img src={activity.image} alt={activity.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                    <h4 className="text-white font-heading text-xl font-bold mb-1">{activity.title}</h4>
                    <p className="text-white/80 text-xs font-sans">{activity.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== РАСПИСАНИЕ (С РАСШИРЕННЫМИ ДНЯМИ) ===== */}
      <section className="py-20 md:py-28 bg-(--bg)" id="schedule">
        <Container>
          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wider text-(--primary) mb-4">
            Расписание
          </span>
          <h2 className="text-display-3 md:text-display-2 font-heading text-(--on-bg-high) mb-6">
            Три вечера, три уникальных опыта
          </h2>
          <p className="text-body-2 font-sans text-(--on-bg-medium) max-w-2xl mb-8">
            Полная программа инсталляции по дням.
          </p>

          <div className="flex gap-2 mb-8 border-b border-(--outline) pb-2 overflow-x-auto">
            {["1", "2", "3"].map((day) => (
              <button
                key={day}
                onClick={() => setActiveScheduleTab(day)}
                className={`px-4 py-2 text-sm font-heading font-semibold transition-colors whitespace-nowrap ${activeScheduleTab === day ? "text-(--primary) border-b-2 border-(--primary)" : "text-(--on-bg-low) hover:text-(--on-bg-high)"
                  }`}
              >
                День {day} · {["18 Фев", "19 Фев", "20 Фев"][Number(day) - 1]}
              </button>
            ))}
          </div>

          <div className="relative pl-12">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-(--outline)" />
            {scheduleData[activeScheduleTab]?.map((slot, idx) => (
              <div key={idx} className="mb-8 last:mb-0">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-sm font-heading font-bold text-(--primary) tabular-nums min-w-[72px]">{slot.time}</span>
                  <span className="text-xs font-heading uppercase tracking-wider text-(--on-bg-low)">{slot.label}</span>
                </div>
                <div className="p-4 bg-(--card) border border-(--outline) rounded-lg">
                  <h5 className="font-heading font-semibold">{slot.title}</h5>
                  <div className="text-sm font-sans text-(--on-bg-low) mt-1 flex flex-wrap gap-2">
                    <span className="flex items-center gap-1"><PublicIcon className="size-3" /> {slot.location}</span>
                    <Badge variant="glass-static" size="chip-small" className="font-heading">{slot.tag}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== БИЛЕТЫ (С МОДАЛКОЙ И КОНФЕТТИ) ===== */}
      <section className="py-20 md:py-28 bg-(--card)" id="tickets">
        <Container>
          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wider text-(--primary) mb-4">
            Билеты
          </span>
          <h2 className="text-display-3 md:text-display-2 font-heading text-(--on-bg-high) mb-6">
            Выберите свой формат
          </h2>
          <p className="text-body-2 font-sans text-(--on-bg-medium) max-w-2xl mb-8">
            Все цены в рублях.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Стандарт", price: "1 500 ₽", period: "/ вход", features: ["Вход на основное шоу", "Доступ к инсталляции", "Фото-зона", "Авторский гид"], cta: "Купить билет" },
              { name: "VIP", price: "3 500 ₽", period: "/ полный доступ", features: ["Приоритетный вход", "Доступ к VR-зоне", "Брендированный мерч", "Встреча с автором"], cta: "Купить билет", popular: true },
              { name: "Групповой", price: "1 000 ₽", period: "/ чел. (от 4 чел.)", features: ["Групповая экскурсия", "Приоритетный вход", "Скидка на мерч"], cta: "Заказать группу" },
            ].map((tier, idx) => (
              <Card key={idx} className={`p-6 border-2 relative flex flex-col h-full ${tier.popular ? "border-(--primary) shadow-lg" : "border-(--outline)"}`}>
                {tier.popular && (
                  <Badge variant="filled-static" size="chip-small" className="absolute -top-3 left-1/2 -translate-x-1/2 font-heading">
                    Популярный
                  </Badge>
                )}
                <h4 className="font-heading text-xl font-bold">{tier.name}</h4>
                <div className="text-4xl font-heading font-bold my-4">
                  {tier.price}
                  <span className="text-sm font-heading font-medium text-(--on-bg-low)">{tier.period}</span>
                </div>
                <ul className="space-y-2 mb-6 text-sm font-sans text-(--on-bg-medium) flex-1">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircleIcon className="size-4 text-(--success)" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant="filled" className="w-full mt-auto font-heading" onClick={() => handleBuyTicket(tier.name)}>
                  {tier.cta}
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== ЛОКАЦИЯ ===== */}
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

      {/* ===== ПАРТНЁРЫ ===== */}
      <section className="py-20 md:py-28 bg-(--card)" id="sponsors">
        <Container>
          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wider text-(--primary) mb-4">Партнёры</span>
          <h2 className="text-display-3 md:text-display-2 font-heading text-(--on-bg-high) mb-6">Проект поддерживают</h2>
          <p className="text-body-2 font-sans text-(--on-bg-medium) max-w-2xl mb-8">Организации, которые делают это событие возможным.</p>
          {[
            { tier: "Платиновые", logos: ["Vercel", "Datadog", "Stripe"] },
            { tier: "Золотые", logos: ["Linear", "Notion", "Sentry", "Figma"] },
            { tier: "Серебряные", logos: ["ESLint", "Prisma", "PlanetScale"] },
            { tier: "Информационные", logos: ["TechCrunch", "CSS-Tricks", "Smashing Mag", "Frontend Masters"] },
          ].map((group) => (
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

      {/* ===== ОТЗЫВЫ ===== */}
      <section className="py-20 md:py-28 bg-(--bg)" id="testimonials">
        <Container>
          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wider text-(--primary) mb-4">Отзывы</span>
          <h2 className="text-display-3 md:text-display-2 font-heading text-(--on-bg-high) mb-6">Что говорят посетители</h2>
          <p className="text-body-2 font-sans text-(--on-bg-medium) max-w-2xl mb-8">Реальные голоса из сообщества.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "Этот проект перевернул моё представление о современном искусстве. Погружение в VR было фантастическим.", name: "Екатерина Иванова", role: "Куратор выставок", year: "2030" },
              { quote: "Технологии здесь служат искусству, а не наоборот. Ощущение, что ты попадаешь в другой мир.", name: "Дмитрий Петров", role: "Инженер-программист", year: "2030" },
              { quote: "Эмоции непередаваемые. ALX-9 — это действительно встреча с чем-то новым. Спасибо команде!", name: "Анастасия Смирнова", role: "Арт-директор", year: "2030" },
            ].map((t, idx) => (
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

      {/* ===== FAQ ===== */}
      <section className="py-20 md:py-28 bg-(--card)" id="faq">
        <Container>
          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wider text-(--primary) mb-4">Часто задаваемые вопросы</span>
          <h2 className="text-display-3 md:text-display-2 font-heading text-(--on-bg-high) mb-6">Быстрые ответы на частые вопросы</h2>
          <p className="text-body-2 font-sans text-(--on-bg-medium) max-w-2xl mb-8">Что нужно знать перед посещением.</p>
          <div className="max-w-3xl mx-auto">
            <FAQItem question="Что входит в билет?" answer="Все билеты включают вход на инсталляцию, доступ к экспозиции и авторскому гиду. VIP-билеты дополнительно дают доступ к VR-зоне и эксклюзивный мерч." defaultOpen />
            <FAQItem question="Можно ли вернуть билет?" answer="Возврат возможен за 48 часов до начала мероприятия. Перенос на другое время обсуждается индивидуально." />
            <FAQItem question="Доступна ли локация для людей с ограниченными возможностями?" answer="Да, площадка полностью адаптирована: есть пандусы, лифты и специальные зоны для комфортного перемещения." />
            <FAQItem question="Есть ли дресс-код?" answer="Форма одежды свободная. Рекомендуем комфортную одежду, так как мероприятие включает активные VR-опыты." />
            <FAQItem question="Будет ли запись мероприятия?" answer="Да, мы планируем запись видео и фотографий. Ссылки на материалы будут отправлены всем посетителям после мероприятия." />
            <FAQItem question="Как связаться с организаторами?" answer="Напишите нам по электронной почте: hello@cuzoi.art или используйте форму обратной связи на сайте." />
          </div>
        </Container>
      </section>

      {/* ===== ПОДПИСКА / CTA ===== */}
      <section className="py-20 md:py-28 bg-(--bg) text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(51,109,255,0.06),transparent_70%)] pointer-events-none" />
        <Container className="relative z-10">
          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wider text-(--primary) mb-4">Будьте в курсе</span>
          <h2 className="text-display-3 md:text-display-2 font-heading text-(--on-bg-high) mb-6">Следите за новостями проекта</h2>
          <p className="text-body-2 font-sans text-(--on-bg-medium) max-w-2xl mx-auto mb-8">Подпишитесь, чтобы получать обновления о новых экспозициях, датах показа и эксклюзивных событиях.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert("Спасибо — вы подписаны!"); }}>
            <input type="email" placeholder="Ваш email" className="flex-1 rounded-lg border border-(--outline) bg-(--card) px-4 py-3 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-(--primary)" required />
            <Button type="submit" variant="filled" size="large" className="font-heading">Подписаться</Button>
          </form>
          <p className="text-xs font-sans text-(--on-bg-low) mt-4">Ваша почта в безопасности. Вы можете отписаться в любое время. <Link href="#" className="text-(--primary) underline">Политика конфиденциальности</Link>.</p>
        </Container>
      </section>
      {/* ===== МОДАЛЬНОЕ ОКНО ПОКУПКИ ===== */}
      <TicketModal open={isModalOpen} onClose={() => setIsModalOpen(false)} ticketName={selectedTicket} />
    </>
  );
}
