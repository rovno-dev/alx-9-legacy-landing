"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, CloseSmallIcon } from "@/components/icons";

function Confetti({ active }: { active: boolean }) {
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

export default function TicketsSection() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyTicket = (tierName: string) => {
    setSelectedTicket(tierName);
    setIsModalOpen(true);
  };

  const tiers = [
    { name: "Стандарт", price: "1 500 ₽", period: "/ вход", features: ["Вход на основное шоу", "Доступ к инсталляции", "Фото-зона", "Авторский гид"], cta: "Купить билет" },
    { name: "VIP", price: "3 500 ₽", period: "/ полный доступ", features: ["Приоритетный вход", "Доступ к VR-зоне", "Брендированный мерч", "Встреча с автором"], cta: "Купить билет", popular: true },
    { name: "Групповой", price: "1 000 ₽", period: "/ чел. (от 4 чел.)", features: ["Групповая экскурсия", "Приоритетный вход", "Скидка на мерч"], cta: "Заказать группу" },
  ];

  return (
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
          {tiers.map((tier, idx) => (
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
      <TicketModal open={isModalOpen} onClose={() => setIsModalOpen(false)} ticketName={selectedTicket} />
    </section>
  );
}
